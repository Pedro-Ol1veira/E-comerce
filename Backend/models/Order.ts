import { model, Schema, Types } from "mongoose";

interface IOrder {
  order: object[];
  address: Object;
  isShiped: boolean;
  userId: Types.ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    order: { type: [Object], required: true },
    address: { type: Object, required: true },
    isShiped: {type: Boolean, required: true},
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

export const orderModel = model("Orders", orderSchema);
