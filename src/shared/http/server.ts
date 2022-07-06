import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination';
import rateLimiter from '@shared/http/middlewares/rateLimiter';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

app.use(
  (error: Error, resquest: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.log(error)
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, console.log(`Server started on port ${SERVER_PORT}`));
