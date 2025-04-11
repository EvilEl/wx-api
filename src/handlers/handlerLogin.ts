import { Request, Response } from 'express';
import serviceLogin from '../service/serviceLogin'
import { LoginUser } from '../models/User'
import { HttpStatus } from '../enums/http-status';

async function login(req: Request<{}, {}, LoginUser>, res: Response) {
  const { login, password } = req.body;
  try {
    const user = await serviceLogin.login({ login, password });
    res.status(HttpStatus.OK).send(user)
  } catch (err) {
    console.log(err);
  }
}


export default { login }
