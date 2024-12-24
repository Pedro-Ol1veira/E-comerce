import { Router } from "express";
import admGuard from "../middlewares/admGuard";
import ProductController from "../controllers/ProductController";
import imageUpload from "../helpers/imageUpload";
import { validate } from "../middlewares/validations/handleValidation";
import { addingProductValidation } from "../middlewares/validations/productValidation";

const router = Router();

router.post(
  "/add",
  admGuard,
  imageUpload.array("photos"),
  addingProductValidation(),
  validate,
  ProductController.addProduct
);

export default router;
