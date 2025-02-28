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

// src/middlewares/validations/adminValidations.ts
var adminValidations_exports = {};
__export(adminValidations_exports, {
  createAdminValidation: () => createAdminValidation,
  loginAdminValidation: () => loginAdminValidation
});
module.exports = __toCommonJS(adminValidations_exports);
var import_express_validator = require("express-validator");
var createAdminValidation = () => {
  return [
    (0, import_express_validator.body)("name").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O nome deve ter entre 4 e 15 letras").isAlpha().withMessage("O nome n\xE3o pode conter numeros"),
    (0, import_express_validator.body)("lastName").isString().withMessage("O sobrenome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O sobrenome deve ter entre 4 e 15 letras").isAlpha().withMessage("O sobrenome n\xE3o pode conter numeros"),
    (0, import_express_validator.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres"),
    (0, import_express_validator.body)("confirmPassword").isString().withMessage("A confirma\xE7\xE3o de senha \xE9 obrigatoria").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("A senha e a confirma\xE7\xE3o de senha deve ser iguais");
      }
      return true;
    }),
    (0, import_express_validator.body)("isSuperUser").isBoolean().withMessage("O campo so pode ser preechido com verdadeiro ou falso")
  ];
};
var loginAdminValidation = () => {
  return [
    (0, import_express_validator.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres")
  ];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAdminValidation,
  loginAdminValidation
});
