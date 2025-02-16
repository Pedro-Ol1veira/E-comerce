import { Request, Response } from "express";
import { orderModel } from "../models/Order";
import { addressModel } from "../models/Address";
import { productModel } from "../models/Product";
import getTokenInfo from "../helpers/getTokenInfo";
require("dotenv").config();

export default class OrderController {
  static async calculateShipping(req: Request, res: Response) {
    const data = req.body;

    let weightSum: number = 0;

    for (let i = 0; i < data.order.length; i++) {
      const product = await productModel.findById(data.order[i].id);
      if(product) {
        weightSum += (product!.weight * data.order[i].amount);
      } else {
        res.status(422).json({errors: [{message: "Produto não encontrado"}]})
        return;
      }
    }

    const MelhorEnvioToken = process.env.MELHOR_ENVIO_TOKEN;

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${MelhorEnvioToken}`,
        "User-Agent": "Aplicação (email para contato técnico)",
      },
      body: JSON.stringify({
        from: { postal_code: "01002001" },
        to: { postal_code: data.cep },
        package: { height: 4, width: 12, length: 17, weight: weightSum },
      }),
    };

    fetch(
      "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
      options
    )
      .then((frete) => frete.json())
      .then((frete) => res.status(200).json([data, frete]))
      .catch((err) => console.error(err)); 
  }
}
