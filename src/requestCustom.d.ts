import { Request } from 'express';

export interface RequestCustom extends Request {
  user?: { id: number; username: string; role: string };
}
