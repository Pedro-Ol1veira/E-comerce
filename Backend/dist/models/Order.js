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

// src/models/Order.ts
var Order_exports = {};
__export(Order_exports, {
  orderModel: () => orderModel
});
module.exports = __toCommonJS(Order_exports);
var import_mongoose = require("mongoose");
var orderSchema = new import_mongoose.Schema(
  {
    order: { type: [Object], required: true },
    addressId: { type: import_mongoose.Schema.Types.ObjectId, required: true },
    shippingType: { type: Object, required: true },
    isShiped: { type: Boolean, required: true },
    userId: { type: import_mongoose.Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
);
var orderModel = (0, import_mongoose.model)("Orders", orderSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  orderModel
});
