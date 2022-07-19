import { Router } from 'express';
import UserController from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAuthenticated from '../../../shared/infra/http/middlewares/isAuthenticated';
import UpdateAvatarUserController from '../controllers/UpdateAvatarUserController';

const userRouter = Router();

const upload = multer(uploadConfig);

userRouter.get('/', isAuthenticated, UserController.index);

userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  UpdateAvatarUserController.execute,
);

userRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  UserController.showById,
);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.create,
);

userRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      old_password: Joi.string().required(),
    },
  }),
  UserController.update,
);

userRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  UserController.delete,
);

export default userRouter;
