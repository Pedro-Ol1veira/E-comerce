import { body } from "express-validator";

const checkIfIsNumber = new RegExp(/^\d+$/);

export const addingProductValidation = () => {
  return [
    body("name")
      .isString()
      .isLength({ min: 1 })
      .withMessage("O nome do produto é Obrigatorio"),
    body("weight")
      .isNumeric()
      .withMessage("O peso do produto é obrigatorio"),
    body("price").isNumeric().withMessage("O preço precisa ser um numero"),
    body("amount")
      .isNumeric()
      .withMessage("A quantidade em estoque precisa ser um numero"),
  ];
};
