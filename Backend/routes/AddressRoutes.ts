import { Router } from "express";
import authGuard from "../middlewares/authGuard";
import  AddressController  from "../controllers/AddressController";
import { createAddressValidation } from "../middlewares/validations/addressValidation";
import { validate } from "../middlewares/validations/handleValidation";
const router = Router();

router.post(
  "/register",
  createAddressValidation(),
  validate,
  authGuard,
  AddressController.register
);

router.get("/getAll", authGuard, AddressController.getAllAddresses);
export default router;
