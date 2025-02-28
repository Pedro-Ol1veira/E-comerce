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

// src/middlewares/validations/addressValidation.ts
var addressValidation_exports = {};
__export(addressValidation_exports, {
  createAddressValidation: () => createAddressValidation
});
module.exports = __toCommonJS(addressValidation_exports);
var import_express_validator = require("express-validator");
var checkIfIsNumber = new RegExp(/^\d+$/);
var createAddressValidation = () => {
  return [
    (0, import_express_validator.body)("bairro").isString().withMessage("O Bairro \xE9 obrigatorio").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O bairro n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("cep").isString().withMessage("O CEP \xE9 obrigatorio").isNumeric().withMessage("CEP invalido!").isLength({ min: 8, max: 8 }),
    (0, import_express_validator.body)("estado").isString().withMessage("O estado \xE9 obrigatorio").isLength({ min: 5 }).withMessage("O estado deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O estado n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("localidade").isString().withMessage("A Localidade \xE9 obrigatoria").isLength({ min: 5 }).withMessage("A localidade deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("A localidade n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("logradouro").isString().withMessage("O logradouro \xE9 obrigatorio").isLength({ min: 5 }).withMessage("O logradouro deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O logradouro n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("regiao").isString().withMessage("A regi\xE3o \xE9 obrigatoria").isLength({ min: 5 }).withMessage("A regiao deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("A regi\xE3o n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("uf").isString().withMessage("O UF \xE9 obrigatorio").isLength({ min: 2, max: 2 }).withMessage("UF invalido").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O UF n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("complemento").isString().withMessage("O complemento \xE9 obrigatorio").isLength({ min: 5 }).withMessage("O complemento deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O complemento n\xE3o pode conter apenas numeros");
      }
      return true;
    })
  ];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAddressValidation
});
