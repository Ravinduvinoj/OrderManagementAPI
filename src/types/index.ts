import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    userId: number;
    email: string;
  };
}