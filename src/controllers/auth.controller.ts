import { Request, Response } from 'express';
import User from '../models/User.model';
import { AuthRequest } from '../types';
import { signToken } from '../services/token.service';

// POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            res.status(400).json({ success: false, message: 'Email already in use' });
            return;
        }

        const user = await User.create({ name, email, password });
        const token = signToken(user._id.toString(), user.userId, user.email);

        res.status(201).json({
            success: true,
            token,
            data: { userId: user._id, name: user.name, email: user.email },
        });
    } catch (err: any) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const token = signToken(user._id.toString(), user.userId, user.email);

        res.json({
            success: true,
            token,
            data: { userId: user._id, name: user.name, email: user.email },
        });
    } catch (err: any) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// GET /api/auth/me
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.id).select('-password');
        res.json({ success: true, data: user });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};