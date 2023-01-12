import Client from '../database';
import bcrypt from 'bcryptjs';
import { CustomError } from '../middleware/globalErrorHandler';

export interface AUTH {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  id?: number;
}

export class User {
  async register(user: AUTH): Promise<AUTH> {
    try {
      const { username, firstname, lastname, password } = user;
      const userExistsSql = `SELECT username FROM users WHERE username = $1`;
      const sql = 'INSERT INTO users (username,firstname,lastname,password) VALUES($1, $2, $3, $4) RETURNING *';
      const connection = await Client.connect();
      const data = await connection.query(userExistsSql, [username]);
      if (data.rows.length >= 1) {
        throw new CustomError(400, `Username is in use`);
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const { rows } = await connection.query(sql, [username, firstname, lastname, hashedPassword]);
      return rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      }
      throw new CustomError(400, 'something went wrong');
    }
  }

  async login(username: string): Promise<AUTH | null> {
    try {
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [username]);
      return rows[0];
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new CustomError(400, error.message);
      } else {
        throw new CustomError(400, 'Something went wrong');
      }
    }
  }
}
