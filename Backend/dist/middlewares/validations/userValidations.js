"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middlewares/validations/userValidations.ts
var userValidations_exports = {};
__export(userValidations_exports, {
  createUserValidation: () => createUserValidation,
  loginUserValidation: () => loginUserValidation
});
module.exports = __toCommonJS(userValidations_exports);
var import_express_validator = require("express-validator");
var cpfRegex = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g;
var phoneRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
var createUserValidation = () => {
  return [
    (0, import_express_validator.body)("name").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O nome deve ter entre 4 e 15 letras").isAlpha().withMessage("O nome n\xE3o pode conter numeros"),
    (0, import_express_validator.body)("lastName").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O nome deve ter entre 4 e 15 letras").isAlpha().withMessage("O nome n\xE3o pode conter numeros"),
    (0, import_express_validator.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator.body)("cpf").isString().withMessage("O CPF \xE9 obrigatorio").custom((value) => {
      if (value.match(cpfRegex)) {
        throw new Error("O cpf \xE9 invalido");
      }
      return true;
    }),
    (0, import_express_validator.body)("phone").isString().withMessage("O telefone \xE9 obrigatorio").isLength({ min: 11 }).withMessage("O telefone \xE9 invalido").isNumeric().withMessage("O numero de telefone n\xE3o pode conter letras").custom((value) => {
      if (value.match(phoneRegex)) {
        throw new Error("O telefone \xE9 invalido");
      }
      return true;
    }),
    (0, import_express_validator.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres"),
    (0, import_express_validator.body)("confirmPassword").isString().withMessage("A confirma\xE7\xE3o de senha \xE9 obrigatoria").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("A senha e a confirma\xE7\xE3o de senha deve ser iguais");
      }
      return true;
    })
  ];
};
var loginUserValidation = () => {
  return [
    (0, import_express_validator.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres")
  ];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUserValidation,
  loginUserValidation
});
