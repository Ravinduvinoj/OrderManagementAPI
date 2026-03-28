import { Request, Response } from 'express';
import Item from '../models/Item.model';

// GET /api/Items
export const getAllItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/Item/:id
export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Item not found' });
      return;
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/Item
export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, stock } = req.body;
    const item = await Item.create({ name, description, price, stock });
    res.status(201).json({ success: true, data: item });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/Item/:id
export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      res.status(404).json({ success: false, message: 'Item not found' });
      return;
    }
    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/Item/:id
export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Item not found' });
      return;
    }
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};