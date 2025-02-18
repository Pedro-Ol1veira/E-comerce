import { Router, Request, Response } from "express";
import authGuard from "../middlewares/authorizations/authGuard";
import OrderController from "../controllers/OrderController";
import { makeOrderValidation, shippingValidation } from "../middlewares/validations/orderValidation";
import { validate } from "../middlewares/validations/handleValidation";


const router = Router();

router.post("/shipping", shippingValidation(), validate, authGuard, OrderController.calculateShipping);
router.post("/makeorder", makeOrderValidation(), validate, authGuard, OrderController.makeOrder);

export default router;
