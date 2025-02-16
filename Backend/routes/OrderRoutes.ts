import { Router, Request, Response } from "express";
import authGuard from "../middlewares/authorizations/authGuard";
import OrderController from "../controllers/OrderController";
import { orderValidation } from "../middlewares/validations/orderValidation";
import { validate } from "../middlewares/validations/handleValidation";


const router = Router();

router.post("/shipping", orderValidation(), validate, authGuard, OrderController.calculateShipping);

export default router;
