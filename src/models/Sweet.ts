import mongoose, { Document, Schema } from "mongoose";

export interface ISweet extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  createdAt: Date;
  stock: number;
}

const sweetSchema = new Schema<ISweet>(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: false, default: "general" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 }, // inventory count
    description: { type: String, required: false, default: "" },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ISweet>("Sweet", sweetSchema);

