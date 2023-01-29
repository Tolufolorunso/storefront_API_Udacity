/* eslint-disable no-useless-catch */
import Client from '../database';
import { BadRequest, CustomError } from '../middleware/globalErrorHandler';

export interface PRODUCT {
  name: string;
  price: string;
  category: string;
  description?: string;
  stock?: number;
  imageUrl?: string;
  id?: number;
}

export class Product {
  async create(product: PRODUCT): Promise<PRODUCT> {
    try {
      const { name, price, category, description, imageUrl, stock } = product;
      const sql =
        'INSERT INTO products (name,price,category, description, imageUrl, stock) VALUES($1, $2, $3, $4,$5,$6) RETURNING *';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [name, price, category, description, imageUrl, stock]);
      console.log(rows);
      connection.release();
      return rows[0];
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }
  async index(): Promise<PRODUCT[]> {
    try {
      const sql = 'SELECT * FROM products';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql);
      connection.release();
      return rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(error.message);
      }
      throw new CustomError('something went wrong');
    }
  }

  async show(id: number): Promise<PRODUCT> {
    try {
      const sql = 'SELECT * FROM products WHERE id = $1';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (error) {
      throw new CustomError(`Product with id '${id}' cannot be fetched from database: ${error}`);
    }
  }

  async showCategory(category: string): Promise<Promise<PRODUCT[]>> {
    try {
      const sql = 'SELECT * FROM products WHERE category = $1';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [category]);
      connection.release();
      return rows;
    } catch (error) {
      throw new CustomError(`Database error: ${error}`);
    }
  }

  async delete(id: number): Promise<PRODUCT> {
    try {
      const sql = 'DELETE FROM products WHERE id = $1';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (error) {
      throw new CustomError(`Database error: ${error}`);
    }
  }
}
