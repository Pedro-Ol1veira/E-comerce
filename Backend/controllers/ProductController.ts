import { Request, Response } from "express";
import { productModel } from "../models/Product";

export default class ProductController {
  static addProduct(req: Request, res: Response) {
    const { name, price, amount } = req.body;
    const photos = req.file;

    res.status(200).json(req.body);
  }
}
