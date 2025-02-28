import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ errors: [{ authorization: "Acesso Negado!" }] });
    return;
  }

  try {
    const verify = jwt.verify(token, jwtSecret || '');
    next();
  } catch (error) {
    res.status(401).json({ errors: [{ authorization: "Token Invalido!" }] });
  }
};

export default authGuard;