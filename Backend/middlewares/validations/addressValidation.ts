import { body } from "express-validator";

const checkIfIsNumber = new RegExp(/^\d+$/);

export const createAddressValidation = () => {
  return [
    body("bairro")
      .isString()
      .withMessage("O Bairro é obrigatorio")
      .custom((value) => {
        if (checkIfIsNumber.test(value)) {
          throw new Error("O bairro não pode conter apenas numeros");
        }
        return true;
      }),
    body("cep")
      .isString()
      .withMessage("O CEP é obrigatorio")
      .isNumeric()
      .withMessage("CEP invalido!")
      .isLength({ min: 8, max: 8 }),
    body("estado")
      .isString()
      .withMessage("O estado é obrigatorio")
      .isLength({ min: 5 })
      .withMessage("O estado deve ter no minimo 5 letras")
      .custom((value) => {
        if (checkIfIsNumber.test(value)) {
          throw new Error("O estado não pode conter apenas numeros");
        }
        return true;
      }),
    body("localidade")
      .isString()
      .withMessage("A Localidade é obrigatoria")
      .isLength({ min: 5 })
      .withMessage("A localidade deve ter no minimo 5 letras")
      .custom((value) => {
        if (checkIfIsNumber.test(value)) {
          throw new Error("A localidade não pode conter apenas numeros");
        }
        return true;
      }),
    body("logradouro")
      .isString()
      .withMessage("O logradouro é obrigatorio")
      .isLength({ min: 5 })
      .withMessage("O logradouro deve ter no minimo 5 letras")
      .custom((value) => {
        if (checkIfIsNumber.test(value)) {
          throw new Error("O logradouro não pode conter apenas numeros");
        }
        return true;
      }),
    body("regiao")
      .isString()
      .withMessage("A região é obrigatoria")
      .isLength({ min: 5 })
      .withMessage("A regiao deve ter no minimo 5 letras")
      .custom((value) => {
        if (checkIfIsNumber.test(value)) {
          throw new Error("A região não pode conter apenas numeros");
        }
        return true;
      }),
    body("uf")
      .isString()
      .withMessage("O UF é obrigatorio")
      .isLength({ min: 2, max: 2 })
      .withMessage("UF invalido")
      .custom((value) => {
        if (checkIfIsNumber.test(value)) {
          throw new Error("O UF não pode conter apenas numeros");
        }
        return true;
      }),
  ];
};
