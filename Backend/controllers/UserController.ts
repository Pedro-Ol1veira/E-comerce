import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/User";
import getTokenInfo from "../helpers/getTokenInfo";
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id: string) => {
  return jwt.sign(
    {
      id,
    },
    jwtSecret ?? "",
    {
      expiresIn: "7d",
    }
  );
};

export default class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, lastName, email, cpf, phone, password } = req.body;
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
        phone,
        password: passwordHash,
      });

      const token = generateToken(newUser.id);

      res.status(200).json({ newUser, token });
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email: email });

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

      const token = generateToken(user.id);

      res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
    }
  }

  static async profile(req: Request, res: Response) {
    try {
      const tokenInfo = await getTokenInfo(req);
      const userId = tokenInfo.id;
      console.log(userId);

      const userProfile = await userModel
        .findById(userId)
        .select("-password");
      
      res.status(200).json(userProfile);
    } catch (error) {
      console.log(error);
    }
  }
}
