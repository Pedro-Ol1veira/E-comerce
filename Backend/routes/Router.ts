import { Router, Request, Response } from "express";
import UserRoutes from "./UserRoutes";
import AddressRoutes from "./AddressRoutes";
import AdminRoutes from "./AdminRoutes";
import ProductRoutes from "./ProductRoutes";

const router = Router();

router.use("/user", UserRoutes);
router.use("/address", AddressRoutes);
router.use("/admin", AdminRoutes);
router.use("/product", ProductRoutes);

export default router;
