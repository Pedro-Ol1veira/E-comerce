import { body } from "express-validator";

export const createAdminValidation = () => {
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
      .withMessage("O sobrenome é obrigatorio")
      .isLength({ min: 4, max: 15 })
      .withMessage("O sobrenome deve ter entre 4 e 15 letras")
      .isAlpha()
      .withMessage("O sobrenome não pode conter numeros"),
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
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatoria")
      .custom((value: string, { req }) => {
        if (value != req.body.password) {
          throw new Error("A senha e a confirmação de senha deve ser iguais");
        }
        return true;
      }),
    body("isSuperUser")
      .isBoolean()
      .withMessage("O campo so pode ser preechido com verdadeiro ou falso")

  ];
};

export const loginAdminValidation = () => {
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
