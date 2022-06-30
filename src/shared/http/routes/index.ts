import customerRouter from '@modules/customers/routes/customers.routes';
import productRouter from '@modules/products/routes/products.routes';
import authenticationRouter from '@modules/users/routes/authentication.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import userRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/authentication', authenticationRouter);
routes.use('/password', passwordRouter);
routes.use('/customers', customerRouter);

export default routes;
