import jwt from "jsonwebtoken";
import { Request } from "express";
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const getTokenInfo = async (req: Request) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  const decoded = jwt.verify(token || "", jwtSecret || "") as any;
  return decoded;
};

export default getTokenInfo;