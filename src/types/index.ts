import { Request } from 'express';
import { Document, Types } from 'mongoose';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    userId: number;
    email: string;
  };
}

export type OrderStatus = 'pending' | 'processing' | 'delivered' | 'completed' | 'cancelled';

export interface IOrderItem {
  item:         Types.ObjectId;  // ref → Item
  quantity:     number;
  priceAtOrder: number;          // price snapshot at order time
}

export interface IOrder extends Document {
  shop:        Types.ObjectId;   // ref → User (role: shop)
  items:       IOrderItem[];
  totalAmount: number;
  status:      OrderStatus;
  note?:       string;
  createdAt:   Date;
  updatedAt:   Date;
}

// Add fcmToken to your existing IUser
export interface IUser extends Document {
  name:      string;
  email:     string;
  password:  string;
  role:      'shop' | 'warehouse' | 'admin';
  fcmToken?: string;             // stored when warehouse app registers
  createdAt: Date;
  updatedAt: Date;
}