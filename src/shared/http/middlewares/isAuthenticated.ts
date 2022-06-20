import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface tokenPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

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
    const decodedToken = verify(
      token,
      authConfig.jwt.secret as string,
    ) as tokenPayload;

    req.user = {
      id: decodedToken.id,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }

  return next();
}
