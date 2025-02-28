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

// src/models/Product.ts
var Product_exports = {};
__export(Product_exports, {
  productModel: () => productModel
});
module.exports = __toCommonJS(Product_exports);
var import_mongoose = require("mongoose");
var productSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    photos: { type: [String], required: true }
  },
  {
    timestamps: true
  }
);
var productModel = (0, import_mongoose.model)("Products", productSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productModel
});
