import { model, Schema } from "mongoose";

interface IAdmin {
  name: string;
  lastName: string;
  email: string;
  password: string;
  isSuperUser: boolean;
}

const adminSchema = new Schema<IAdmin>(
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
