import { Request, Response } from "express";
import { userModel } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, lastName, email, cpf, password } = req.body;
      const checkEmail = await userModel.findOne({ email: email });
      const checkCpf = await userModel.findOne({ cpf: cpf });
      if (checkEmail) {
        res
          .status(422)
          .json({ errors: [{ userExists: "O email já está em uso" }] });
        return;
      } else if (checkCpf) {
        res
          .status(422)
          .json({ errors: [{ userExists: "O CPF já está em uso" }] });
        return;
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await userModel.create({
        name,
        lastName,
        email,
        cpf,
        password: passwordHash,
      });

      res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
    }
  }
}
