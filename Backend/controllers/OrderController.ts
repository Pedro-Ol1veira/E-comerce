import { Request, Response } from "express";
import { orderModel } from "../models/Order";
import { addressModel } from "../models/Address";
import { productModel } from "../models/Product";
import getTokenInfo from "../helpers/getTokenInfo";
import { calculateShippingAPI } from "../helpers/calculateShippingAPI";

export default class OrderController {
  static async calculateShipping(req: Request, res: Response) {
    const { order, cep } = req.body;

    let weightSum: number = 0;

    for (let i = 0; i < order.length; i++) {
      const product = await productModel.findById(order[i].id);
      if (product) {
        weightSum += product!.weight * order[i].amount;
      } else {
        res
          .status(422)
          .json({ errors: [{ message: "Produto não encontrado" }] });
        return;
      }
    }

    const shippingOptions = await calculateShippingAPI(cep, weightSum);
    res.status(200).json(shippingOptions);

  }

  static async makeOrder(req: Request, res: Response) {
    const { order, addressId, shippingId } = req.body;
    const tokenInfo = await getTokenInfo(req);
    let weightSum: number = 0;

    for (let i = 0; i < order.length; i++) {
      const product = await productModel.findById(order[i].id);
      if (product) {
        weightSum += product!.weight * order[i].amount;
      } else {
        res
          .status(422)
          .json({ errors: [{ message: "Produto não encontrado" }] });
        return;
      }
    }



    try {
      const address = await addressModel.findById(addressId);
      if (!address) {
        res
          .status(404)
          .json({ errors: [{ message: "O endereço não foi encontrado" }] });
        return;
      } else if (address.userId != tokenInfo.id) {
        res.status(404).json({ errors: [{ message: "Não foi encontrado esse endereço na sua lista de endereços" }] });
        return;
      }

      const shippingOptions = await calculateShippingAPI(address.cep, weightSum);

      const shipping = shippingOptions.find(({id}: any) => shippingId == id);
      if(!shipping) {
        res.status(404).json({errors: [{message: "Id do frete invalido"}]})
        return;
      } 
      
      res.status(200).json([order, addressId, shippingId, shipping]);
    } catch (error) {
      console.log(error);
    }

  }
}
