import { body } from "express-validator";

const cpfRegex = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g;

export const createUserValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatorio")
      .isLength({ min: 4, max: 15 })
      .withMessage("O nome deve ter entre 4 e 15 letras")
      .isAlpha()
      .withMessage("O nome não pode conter numeros"),
    body("lastName")
      .isString()
      .withMessage("O nome é obrigatorio")
      .isLength({ min: 4, max: 15 })
      .withMessage("O nome deve ter entre 4 e 15 letras")
      .isAlpha()
      .withMessage("O nome não pode conter numeros"),
    body("email")
      .isString()
      .withMessage("O email é obrigatorio")
      .isEmail()
      .withMessage("E-mail invalido"),
    body("cpf")
      .isString()
      .withMessage("O CPF é obrigatorio")
      .custom((value: string) => {
        if (value.match(cpfRegex)) {
          throw new Error("O cpf é invalido");
        }
        return true;
      }),
    body("password")
      .isString()
      .withMessage("A senha é obrigatoria")
      .isLength({ min: 8 })
      .withMessage("A senha deve conter no minimo 8 caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatoria")
      .custom((value: string, { req }) => {
        if (value != req.body.password) {
          throw new Error("A senha e a confirmação de senha deve ser iguais");
        }
        return true;
      }),
  ];
};

export const loginUserValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O email é obrigatorio")
      .isEmail()
      .withMessage("E-mail invalido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatoria")
      .isLength({ min: 8 })
      .withMessage("A senha deve conter no minimo 8 caracteres"),
  ];
};
