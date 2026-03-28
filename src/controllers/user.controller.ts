import { Request, Response } from 'express';
import User from '../models/User.model';

// GET /api/users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ userId: 1 });
    res.json({ success: true, data: users });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/users/:userId
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ userId: Number(req.params.userId) }).select('-password');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/users/:userId
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: Number(req.params.userId) },
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/users/:userId
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOneAndDelete({ userId: Number(req.params.userId) });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.json({ success: true, message: `User ${req.params.userId} deleted` });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};