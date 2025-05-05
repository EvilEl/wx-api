import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from "../enums/http-status";
import jwt from 'jsonwebtoken'

//TODO create custom type -> Any
function authenticateToken(req: Request<any>, res: Response, next: NextFunction) {
  console.log('req, res, next', req);
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Ошибка аутификации' })
  } else {
    const secretKey = process.env.JWT_SECRET_KEY ?? ''
    jwt.verify(token, secretKey, (err, user) => {
      console.log('verify', err);
      console.log('verify', user);
      if (err) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Недействительный токен' });
      } else {
        next()
      }


    })
  }
}


export default authenticateToken
