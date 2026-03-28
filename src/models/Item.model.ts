import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

const ItemSchema = new Schema<IItem>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        stock: { type: Number, required: true, min: 0, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IItem>('Item', ItemSchema);