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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/helpers/externalAPI's.ts
var externalAPI_s_exports = {};
__export(externalAPI_s_exports, {
  calculateShippingAPI: () => calculateShippingAPI,
  paymentMethodsAPI: () => paymentMethodsAPI
});
module.exports = __toCommonJS(externalAPI_s_exports);
require("dotenv").config();
var MelhorEnvioToken = process.env.MELHOR_ENVIO_TOKEN;
var calculateShippingAPI = (cep, weightSum) => __async(void 0, null, function* () {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${MelhorEnvioToken}`,
      "User-Agent": "Aplica\xE7\xE3o (email para contato t\xE9cnico)"
    },
    body: JSON.stringify({
      from: { postal_code: "01002001" },
      to: { postal_code: cep },
      package: { height: 4, width: 12, length: 17, weight: weightSum }
    })
  };
  const shippingOptions = yield fetch(
    "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
    options
  ).then((shipping) => shipping.json()).catch((err) => console.error(err));
  return shippingOptions;
});
var mercadopagoToken = process.env.MERCADOPAGO_TOKEN;
var paymentMethodsAPI = () => __async(void 0, null, function* () {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${mercadopagoToken}`
    }
  };
  const shippingOptions = yield fetch(
    "https://api.mercadopago.com/v1/payment_methods",
    options
  ).then((shipping) => shipping.json()).catch((err) => console.error(err));
  return shippingOptions;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calculateShippingAPI,
  paymentMethodsAPI
});
