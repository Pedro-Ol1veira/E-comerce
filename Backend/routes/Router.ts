import { Router, Request, Response } from "express";
import UserRoutes from "./UserRoutes";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Rota funcionando em TS !" });
});

router.use("/user", UserRoutes);

export default router;
