import Client from '../database';
import { CustomError } from '../middleware/globalErrorHandler';

export interface OrderInterface {
  products: OrderProduct[];
  userId: number;
  status: boolean;
}

export interface OrderExtend extends OrderInterface {
  id: number;
}

export interface OrderProduct {
  productId: number;
  quantity: number;
}

class Order {
  async create(order: OrderInterface): Promise<OrderExtend> {
    const { products, userId, status } = order;
    try {
      const orderSql = `INSERT INTO users (user_id,status) VALUES($1, $2) RETURNING *`;
      const connection = await Client.connect();
      const data = await connection.query(orderSql, [userId, status]);
      const { productId } = data.rows[0];
      connection.release();
      return data.rows[0];
    } catch (error) {
      throw new Error(`Order not added ${userId}. ${error}`);
    }
  }
}

export default new Order();
