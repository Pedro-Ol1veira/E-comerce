import { Router, Request, Response } from "express";
import UserRoutes from "./UserRoutes";
import AddressRoutes from "./AddressRoutes";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Rota funcionando em TS !" });
});

router.use("/user", UserRoutes);
router.use("/address", AddressRoutes);

export default router;
