import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from "../enums/http-status";

//TODO create custom type -> Any
function authenticateToken(req: Request<any>, res: Response, next: NextFunction) {
  console.log('req, res, next', req);
  const authorization = req.headers['authorization']
  if (!authorization) {
    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Ошибка аутификации' })
  } else {
    next()
  }
}


export default authenticateToken
