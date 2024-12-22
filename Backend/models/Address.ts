import { model, Schema } from "mongoose";

const addressSchema = new Schema(
  {
    bairro: {type: String},
    cep: {type: String},
    estado: {type: String},
    localidade: {type: String},
    logradouro: {type: String},
    regiao: {type: String},
    uf: {type: String},
  },
  {
    timestamps: true,
  }
);

export const addressModel = model("Addresses", addressSchema);
