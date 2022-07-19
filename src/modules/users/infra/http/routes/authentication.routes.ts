import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionRouter = Router();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  AuthenticationController.create,
);

export default sessionRouter;
