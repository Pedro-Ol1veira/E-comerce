import { model, Schema, Types } from "mongoose";

export interface IOrder {
  order: object[];
  addressId: Types.ObjectId;
  shippingType: object,
  isShiped: boolean;
  userId: Types.ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    order: { type: [Object], required: true },
    addressId: { type: Schema.Types.ObjectId, required: true },
    shippingType: {type: Object, required: true},
    isShiped: {type: Boolean, required: true},
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

export const orderModel = model("Orders", orderSchema);
