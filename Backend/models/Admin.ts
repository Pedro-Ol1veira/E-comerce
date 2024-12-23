import { model, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isSuperUser: {type: Boolean, required: true}
  },
  {
    timestamps: true,
  }
);

export const adminModel = model("Admins", adminSchema);
