import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errosExtracted: object[] = [];
  errors
    .array()
    .map((error) => errosExtracted.push({ [error.type]: error.msg }));

  res.status(422).json({
    errors: errosExtracted,
  });
};
