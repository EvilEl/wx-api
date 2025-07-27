import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import serviceLogin from '../service/serviceLogin'
import { LoginUser } from '../models/User'
import { HttpStatus } from '../enums/http-status';

async function login(req: Request<object, object, LoginUser>, res: Response) {
  const { login, password } = req.body;
  try {
    const user = await serviceLogin.getUser(login);
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Неверное имя пользователя или пароль' });
    } else {
      const jwtKey = process.env.JWT_SECRET_KEY ?? ''
      const jwtRefreshKey = process.env.JWT_REFRESH_SECRET_KEY ?? ''

      const accessToken = jwt.sign({ login: user.login }, jwtKey, { expiresIn: '30m' });
      const refreshToken = jwt.sign({ login: user.login }, jwtRefreshKey, { expiresIn: '30d' });
      await serviceLogin.saveRefreshToken(login, refreshToken);
      res.status(HttpStatus.OK).send({ accessToken, refreshToken, login })
    }
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'User not found') {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Неверное имя пользователя или пароль' });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Произошла ошибка при авторизации' });
      }
    }
  }
}

async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
     res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Refresh token обязателен' });
  }

  try {
    const jwtRefreshKey = process.env.JWT_REFRESH_SECRET_KEY ?? '';
    const decoded = jwt.verify(refreshToken, jwtRefreshKey) as { login: string };
    const user = await serviceLogin.getUser(decoded.login);

    if (!user || user.refreshToken !== refreshToken) {
      if (user) {
        await serviceLogin.saveRefreshToken(user.login, null);
      }
       res.status(HttpStatus.FORBIDDEN).json({ message: 'Некорректный refresh token' });
    }

    const jwtKey = process.env.JWT_SECRET_KEY ?? '';
    const newAccessToken = jwt.sign({ login: user.login }, jwtKey, { expiresIn: '30m' });
    const newRefreshToken = jwt.sign({ login: user.login }, jwtRefreshKey, { expiresIn: '30d' });

    await serviceLogin.saveRefreshToken(user.login, newRefreshToken);

    res.status(HttpStatus.OK).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(HttpStatus.FORBIDDEN).json({ message: 'Refresh token expired' });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(HttpStatus.FORBIDDEN).json({ message: 'Invalid refresh token' });
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
}

export default { login, refresh }
