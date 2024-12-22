import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    password: { type: String, required: true },
    adresses: { type: Array },
  },
  {
    timestamps: true,
  }
);

export const userModel = model("Users", userSchema);
