import { Request, Response, Errback, NextFunction } from "express";

const errorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
      next();
    }
    
    res.status(422).json({ errors: [{field: "Envie apenas arquivos png ou jpg"}]});
    return;

};

export default errorHandler;