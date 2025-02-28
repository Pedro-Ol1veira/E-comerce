import { model, Schema } from "mongoose";

interface IUser {
  name: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const userModel = model("Users", userSchema);
