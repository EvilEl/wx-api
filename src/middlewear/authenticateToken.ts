import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from "../enums/http-status";

function authenticateToken(req: Request<unknown>, res: Response, next: NextFunction) {
  console.log('req, res, next', req);
  const authorization = req.headers['authorization']
  if (!authorization) {
    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Ошибка аутификации' })
  }
  console.log('authorization', authorization);
  next()
}


export default authenticateToken
