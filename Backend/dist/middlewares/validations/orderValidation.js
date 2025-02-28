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

// src/middlewares/validations/orderValidation.ts
var orderValidation_exports = {};
__export(orderValidation_exports, {
  makeOrderValidation: () => makeOrderValidation,
  shippingValidation: () => shippingValidation
});
module.exports = __toCommonJS(orderValidation_exports);
var import_express_validator = require("express-validator");
var import_mongoose = require("mongoose");
var checkIfIsNumber = new RegExp(/^\d+$/);
var shippingValidation = () => {
  return [
    (0, import_express_validator.body)("order").isArray({ min: 1 }).withMessage("O pedido \xE9 obrigatorio e deve ter no minimo 1 item").custom((value) => {
      value.map((item) => {
        if (!item.id || !import_mongoose.Types.ObjectId.isValid(item.id)) {
          throw new Error(
            "O pedido deve conter o id de todos os produtos do carrinho"
          );
        }
        if (!item.amount) {
          throw new Error(
            "O pedido deve conter a quantidade de cada item do carrinho"
          );
        } else if (item.amount <= 0) {
          throw new Error("Quantidade invalida");
        }
      });
      return true;
    }),
    (0, import_express_validator.body)("cep").isPostalCode("BR").withMessage("CEP invalido")
  ];
};
var makeOrderValidation = () => {
  return [
    (0, import_express_validator.body)("order").isArray({ min: 1 }).withMessage("O pedido deve ter no minimo 1 produto").custom((value) => {
      value.map((item) => {
        if (!item.id || !import_mongoose.Types.ObjectId.isValid(item.id)) {
          throw new Error(
            "O pedido deve conter o id de todos os produtos do carrinho"
          );
        }
        if (!item.amount) {
          throw new Error(
            "O pedido deve conter a quantidade de cada item do carrinho"
          );
        } else if (item.amount <= 0) {
          throw new Error("Quantidade invalida");
        }
      });
      return true;
    }),
    (0, import_express_validator.body)("addressId").isMongoId().withMessage("ID do endere\xE7o invalido"),
    (0, import_express_validator.body)("shippingId").isNumeric().withMessage("O id do frede deve ser um numero").custom((value) => {
      if (value <= 0) {
        throw new Error("O id do frete deve ser maior que 0");
      }
      return true;
    })
  ];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeOrderValidation,
  shippingValidation
});
