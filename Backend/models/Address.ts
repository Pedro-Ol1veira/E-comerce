import { model, Schema, Types } from "mongoose";

interface IAddress {
  bairro: string;
  cep: string;
  estado: string;
  localidade: string;
  logradouro: string;
  regiao: string;
  uf: string;
  complemento: string;
  userId: Types.ObjectId;
}

const addressSchema = new Schema<IAddress>(
  {
    bairro: { type: String, required: true },
    cep: { type: String, required: true },
    estado: { type: String, required: true },
    localidade: { type: String, required: true },
    logradouro: { type: String, required: true },
    regiao: { type: String, required: true },
    uf: { type: String, required: true },
    complemento: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

export const addressModel = model("Addresses", addressSchema);
