import express, { Request, Response } from 'express';
import authRoute from './auth/auth.route';
import productRoute from './products/product.route';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('ok');
});

routes.use('/auth', authRoute);
routes.use('/products', productRoute);

export default routes;
