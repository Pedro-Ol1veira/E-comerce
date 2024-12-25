import { Request, Response } from "express";
import { productModel } from "../models/Product";

export default class ProductController {
  static addProduct(req: Request, res: Response) {
    const { name, price, amount } = req.body;
    const photos = req.files as Express.Multer.File[];
    if (photos?.length === 0) {
      res
        .status(422)
        .json({ errors: [{ field: "As fotos são obrigatorias" }] });
      return;
    }

    const newProduct = {
      name,
      price,
      amount,
      photos: [],
    };

    photos?.map((photo) => {
      newProduct.photos.push(photo.filename);
    });

    productModel.create(newProduct);
    
    res.status(200).json(newProduct);
  }
}
