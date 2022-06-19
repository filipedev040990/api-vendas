import { Router } from 'express';
import SessionController from '../controllers/AutenticationController';
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
  SessionController.create,
);

export default sessionRouter;
