import { Request, Response } from "express";
import { productModel } from "../models/Product";

export default class ProductController {
  static async addProduct(req: Request, res: Response) {
    const { name, weight, price, amount } = req.body;
    const photos = req.files as Express.Multer.File[];
    if (photos?.length === 0) {
      res
        .status(422)
        .json({ errors: [{ field: "As fotos são obrigatorias" }] });
      return;
    }

    interface INewProduct {
      name: string;
      weight: number;
      price: number;
      amount: number;
      photos: string[];
    }

    const newProduct: INewProduct = {
      name,
      weight,
      price,
      amount,
      photos: [],
    };

    photos?.map((photo) => {
      newProduct.photos.push(photo.filename);
    });

    await productModel.create(newProduct);
    
    res.status(200).json(newProduct);
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productModel.find();
      res.status(200).json(products);
    } catch (error) {
      console.log(error)      
    }
    
  }
}
