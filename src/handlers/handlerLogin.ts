import { Request, Response } from 'express';
import serviceLogin from '../service/serviceLogin'
import { LoginUser } from '../models/User'
import { HttpStatus } from '../enums/http-status';
import bcrypt from 'bcrypt'

async function login(req: Request<object, object, LoginUser>, res: Response) {
  const { login, password } = req.body;
  try {
    const user = await serviceLogin.getUser(login);
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      res.status(HttpStatus.UNAUTHORIZED).json({ password: 'Не правмильный' })
    }
    res.status(HttpStatus.OK).send()
  } catch (err) {
    if (err instanceof Error) {
      res.json({ err: err.message })
    }
  }
}

export default { login }
