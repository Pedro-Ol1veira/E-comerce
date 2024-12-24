import { Request, Response } from "express";
import { addressModel } from "../models/Address";
import getTokenInfo from "../helpers/getTokenInfo";

export class AddressController {
  static async register(req: Request, res: Response) {
    const {
      bairro,
      cep,
      estado,
      localidade,
      logradouro,
      regiao,
      uf,
      complemento,
    } = req.body;

    const tokenInfo = await getTokenInfo(req);
    const userId = tokenInfo.id;

    const newAddress = await addressModel.create({
      bairro,
      cep,
      estado,
      localidade,
      logradouro,
      regiao,
      uf,
      complemento,
      userId,
    });

    res.status(201).json(newAddress);
  }

  static async getAllAddresses(req: Request, res: Response) {
    const tokenInfo = await getTokenInfo(req);
    const userId = tokenInfo.id;

    const addresses = await addressModel.find({ userId: userId });
    res.status(200).json(addresses);
  }
}
