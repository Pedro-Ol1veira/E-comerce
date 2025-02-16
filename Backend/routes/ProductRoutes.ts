import { Router } from "express";
import admGuard from "../middlewares/authorizations/admGuard";
import ProductController from "../controllers/ProductController";
import imageUpload from "../helpers/imageUpload";
import { validate } from "../middlewares/validations/handleValidation";
import { addingProductValidation } from "../middlewares/validations/productValidation";
import imageErrorHandler from "../helpers/imageErrorHandler";
const router = Router();

router.get("/", ProductController.getAllProducts);

router.post(
  "/add",
  admGuard,
  imageUpload.array("photos"),
  imageErrorHandler,
  addingProductValidation(),
  validate,
  ProductController.addProduct
);

router.delete("/delete/:id", admGuard, ProductController.deleteProduct);

export default router;
