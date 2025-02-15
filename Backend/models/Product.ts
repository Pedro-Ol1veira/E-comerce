import { Model, model, Schema, Types } from "mongoose";

interface IProduct {
  name: string;
  weight: number;
  price: number;
  amount: number;
  photos: Types.ArraySubdocument;

}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    photos: { type: Types.ArraySubdocument, required: true },
  },
  {
    timestamps: true,
  }
);

export const productModel = model("Products", productSchema);
