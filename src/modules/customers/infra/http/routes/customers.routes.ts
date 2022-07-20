import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import CustomerController from '../controllers/CustomerController';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get('/', isAuthenticated, customerController.index);

customerRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.create,
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
  customerController.update,
);

customerRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.delete,
);

customerRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.listById,
);

export default customerRouter;
