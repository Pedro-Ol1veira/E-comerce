import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    cpf: { type: String },
    password: { type: String },
    adresses: { type: Array },
  },
  {
    timestamps: true,
  }
);

export const userModel = model("Users", userSchema);