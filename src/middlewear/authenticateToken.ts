import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from "../enums/http-status";
import jwt from 'jsonwebtoken'

// export interface AuthenticatedRequest extends Request {
//   user?: { login: string };
// }

function authenticateToken(req: Request<any>, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Ошибка аутификации' })
  } else {
    const secretKey = process.env.JWT_SECRET_KEY ?? ''
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        res.status(HttpStatus.FORBIDDEN).json({ message: 'Недействительный токен' });
      } else {
        // req.user = user as { login: string };
        next()
      }
    })
  }
}


export default authenticateToken
