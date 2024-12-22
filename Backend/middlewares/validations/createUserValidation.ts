import { body } from "express-validator";

export const createUserValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatorio")
      .isLength({ min: 4, max: 15 })
      .withMessage("O nome deve ter entre 4 e 15 letras")
      .isAlpha().withMessage("O nome não pode conter numeros"),
  ];
};
