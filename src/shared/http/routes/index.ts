import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Home aqui');
});

export default routes;
