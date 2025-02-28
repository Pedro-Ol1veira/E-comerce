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

// src/models/Address.ts
var Address_exports = {};
__export(Address_exports, {
  addressModel: () => addressModel
});
module.exports = __toCommonJS(Address_exports);
var import_mongoose = require("mongoose");
var addressSchema = new import_mongoose.Schema(
  {
    bairro: { type: String, required: true },
    cep: { type: String, required: true },
    estado: { type: String, required: true },
    localidade: { type: String, required: true },
    logradouro: { type: String, required: true },
    regiao: { type: String, required: true },
    uf: { type: String, required: true },
    complemento: { type: String, required: true },
    userId: { type: import_mongoose.Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
);
var addressModel = (0, import_mongoose.model)("Addresses", addressSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addressModel
});
