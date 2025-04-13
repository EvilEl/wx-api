import { Request, Response } from 'express';
import serviceLogin from '../service/serviceLogin'
import { LoginUser } from '../models/User'
import { HttpStatus } from '../enums/http-status';
import bcrypt from 'bcrypt'

async function login(req: Request<{}, {}, LoginUser>, res: Response) {
  const { login, password } = req.body;
  try {
    const user = await serviceLogin.getUser(login);
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log('login res compare', isValidPassword);
    res.status(HttpStatus.OK).send({})
  } catch (err) {
    console.log(err);
  }
}


export default { login }
