import { Router } from "express";
import AdminController from "../controllers/AdminController";
import admGuard from "../middlewares/authorizations/admGuard";
import { validate } from "../middlewares/validations/handleValidation";
import {
  createAdminValidation,
  loginAdminValidation,
} from "../middlewares/validations/adminValidations";

const router = Router();

router.post(
  "/register",
  createAdminValidation(),
  validate,
  AdminController.register
);

router.post("/login", loginAdminValidation(), validate, AdminController.login);
router.get("/orders", admGuard, AdminController.allOrders);

export default router;
