import { model, Schema } from "mongoose";

const addressSchema = new Schema(
  {
    bairro: { type: String, required: true },
    cep: { type: String, required: true },
    estado: { type: String, required: true },
    localidade: { type: String, required: true },
    logradouro: { type: String, required: true },
    regiao: { type: String, required: true },
    uf: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const addressModel = model("Addresses", addressSchema);
