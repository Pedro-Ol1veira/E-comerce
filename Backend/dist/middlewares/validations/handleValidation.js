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

// src/middlewares/validations/handleValidation.ts
var handleValidation_exports = {};
__export(handleValidation_exports, {
  validate: () => validate
});
module.exports = __toCommonJS(handleValidation_exports);
var import_express_validator = require("express-validator");
var validate = (req, res, next) => {
  const errors = (0, import_express_validator.validationResult)(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errosExtracted = [];
  errors.array().map((error) => errosExtracted.push({ [error.type]: error.msg }));
  res.status(422).json({
    errors: errosExtracted
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validate
});
