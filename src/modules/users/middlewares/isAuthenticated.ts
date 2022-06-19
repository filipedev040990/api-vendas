import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const headers = req.headers.authorization;

  if (!headers) {
    throw new AppError('JWT Token is missing');
  }

  const token = headers.split(' ')[1];

  try {
    verify(token, authConfig.jwt.secret as string);

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }

  return next();
}
