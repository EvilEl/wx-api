import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
      const token = jwt.sign({ login: user.login }, jwtKey, { expiresIn: '1h' });
      res.status(HttpStatus.OK).send({ token, login })
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

export default { login }
