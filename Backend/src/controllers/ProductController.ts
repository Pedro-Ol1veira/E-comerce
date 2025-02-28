import { Request, Response } from "express";
import { productModel, IProduct } from "../models/Product";
import { Types } from "mongoose";

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

    const newProduct: IProduct = {
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
      console.log(error);
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
      res.status(404).json({ errors: { field: "ID invalido" } });
      return;
    }

    try {
      const productDeleted = await productModel.findByIdAndDelete(id);
      if (!productDeleted) {
        res
          .status(404)
          .json({ erorrs: { message: "Produto não encontrado !" } });
        return;
      }

      res.status(200).json(productDeleted);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProduct(req: Request, res: Response) {
    const { name, weight, price, amount } = req.body;
    const images = req.files as Express.Multer.File[];
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
      res.status(422).json({ errors: [{ message: "ID invalido" }] });
      return;
    }

    interface updateProduct {
      name: string;
      weight: string;
      price: number;
      amount: number;
      photos?: string[];
    }

    const updatedData: updateProduct = {
      name,
      weight,
      price,
      amount,
    };

    if (images?.length > 0) {
      updatedData.photos = [];
      images.map((image) => {
        updatedData.photos?.push(image.filename);
      });
    }

    try {
      const productUpdated = await productModel.findByIdAndUpdate(
        id,
        updatedData
      );
      if (!productUpdated) {
        res
          .status(404)
          .json({ errors: [{ message: "Produto não encontrado" }] });
        return;
      }
      res.status(200).json(updatedData);
    } catch (error) {}
  }
}
