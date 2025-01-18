import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    weight: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    photos: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

export const productModel = model("Products", productSchema);
