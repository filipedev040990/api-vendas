import productRouter from '@modules/products/routes/products.routes';
import autenticationRouter from '@modules/users/routes/autentication.routes';
import userRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/autenticate', autenticationRouter);

export default routes;
