import { Request, Response } from "express";
import { userModel } from "../models/User";

export class UserController {
    static async register(req: Request, res: Response) {
        try {
            const data = req.body;
            res.status(200).json(data);
        } catch (error) {
            
        }
    }
}