import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import CustomerController from '../controllers/CustomerController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const customerRouter = Router();

customerRouter.get('/', isAuthenticated, CustomerController.index);

customerRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  CustomerController.create,
);

customerRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  CustomerController.update,
);

customerRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CustomerController.delete,
);

customerRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CustomerController.listById,
);

export default customerRouter;
