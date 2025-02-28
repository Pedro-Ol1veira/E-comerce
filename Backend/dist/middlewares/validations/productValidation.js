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

// src/middlewares/validations/productValidation.ts
var productValidation_exports = {};
__export(productValidation_exports, {
  addingProductValidation: () => addingProductValidation
});
module.exports = __toCommonJS(productValidation_exports);
var import_express_validator = require("express-validator");
var checkIfIsNumber = new RegExp(/^\d+$/);
var addingProductValidation = () => {
  return [
    (0, import_express_validator.body)("name").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 1 }).withMessage("O nome do produto deve ter no minimo 1 caractere"),
    (0, import_express_validator.body)("weight").isNumeric().withMessage("O peso do produto \xE9 obrigatorio"),
    (0, import_express_validator.body)("price").isNumeric().withMessage("O pre\xE7o precisa ser um numero"),
    (0, import_express_validator.body)("amount").isNumeric().withMessage("A quantidade em estoque precisa ser um numero")
  ];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addingProductValidation
});
