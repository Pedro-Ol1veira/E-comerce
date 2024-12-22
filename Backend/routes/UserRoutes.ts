import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validations/handleValidation";
import { createUserValidation } from "../middlewares/validations/createUserValidation";

const router = Router();

router.post(
  "/create",
  createUserValidation(),
  validate,
  UserController.register
);

export default router;
