import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUserDTO } from '../common/models/user.model';
import { EStatusCode } from '../common/constants/status-code.constant';
import env from '../env';

export function authMiddleware(
  req: Request & { user: IUserDTO },
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization');
  if (!token) {
    return res
      .status(EStatusCode.INVALID_INPUT)
      .json({ message: 'Token not provided.' });
  }
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY!) as IUserDTO;
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(EStatusCode.UNAUTHORIZED)
      .json({ message: 'Invalid token.' });
  }
}
