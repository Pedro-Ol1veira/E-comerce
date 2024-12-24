import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
import { validate } from "../middlewares/validations/handleValidation";
import {
  createUserValidation,
  loginUserValidation,
} from "../middlewares/validations/userValidations";
import authGuard from "../middlewares/authGuard";

const router = Router();

router.post(
  "/register",
  createUserValidation(),
  validate,
  UserController.register
);

router.post("/login", loginUserValidation(), validate, UserController.login);
router.get('/profile', authGuard, UserController.profile)

export default router;
