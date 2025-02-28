import { Router, Request, Response } from "express";
import AdminController from "../controllers/AdminController";
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

export default router;
