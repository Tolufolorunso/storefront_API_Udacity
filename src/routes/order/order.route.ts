import express from 'express';
import { createOrder, getAllOrders } from './order.controller';
import authenticationMiddleware from '../../middleware/auth';

const orderRoute = express.Router();

orderRoute.post('/', authenticationMiddleware, createOrder);
orderRoute.get('/', getAllOrders);
// orderRoute.get('/', getAllOrders);
// orderRoute.get('/:orderId', getOneOrder);
// orderRoute.delete('/:orderId', authenticationMiddleware, deleteOrder);

export default orderRoute;
