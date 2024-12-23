import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminModel } from "../models/Admin";
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id: string, isSuperUser: boolean) => {
  return jwt.sign(
    {
      id,
      isSuperUser,
    },
    jwtSecret ?? "",
    {
      expiresIn: "7d",
    }
  );
};

export class AdminController {
  static async register(req: Request, res: Response) {
    try {
      const { name, lastName, email, password, isSuperUser } = req.body;
      const checkEmail = await adminModel.findOne({ email: email });
      if (checkEmail) {
        res
          .status(422)
          .json({ errors: [{ userExists: "O email já está em uso" }] });
        return;
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await adminModel.create({
        name,
        lastName,
        email,
        password: passwordHash,
        isSuperUser,
      });

      const token = generateToken(newUser.id, newUser.isSuperUser);

      res.status(200).json({ newUser, token });
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await adminModel.findOne({ email: email });

      if (!user) {
        res
          .status(422)
          .json({ errors: [{ loginFail: "E-mail ou Senha invalidos" }] });
        return;
      }

      const verifyPass = await bcrypt.compare(password, user.password);

      if (!verifyPass) {
        res
          .status(422)
          .json({ errors: [{ loginFail: "E-mail ou Senha invalidos" }] });
        return;
      }

      const token = generateToken(user.id, user.isSuperUser);

      res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
    }
  }
}
