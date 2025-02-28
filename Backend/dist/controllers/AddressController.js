"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/controllers/AddressController.ts
var AddressController_exports = {};
__export(AddressController_exports, {
  default: () => AddressController
});
module.exports = __toCommonJS(AddressController_exports);

// src/models/Address.ts
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

// src/helpers/getTokenInfo.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
require("dotenv").config();
var jwtSecret = process.env.JWT_SECRET;
var getTokenInfo = (req) => __async(void 0, null, function* () {
  const authHeader = req.headers["authorization"];
  const token = authHeader == null ? void 0 : authHeader.split(" ")[1];
  const decoded = import_jsonwebtoken.default.verify(token || "", jwtSecret || "");
  return decoded;
});
var getTokenInfo_default = getTokenInfo;

// src/controllers/AddressController.ts
var AddressController = class {
  static register(req, res) {
    return __async(this, null, function* () {
      const {
        bairro,
        cep,
        estado,
        localidade,
        logradouro,
        regiao,
        uf,
        complemento
      } = req.body;
      const tokenInfo = yield getTokenInfo_default(req);
      const userId = tokenInfo.id;
      const newAddress = yield addressModel.create({
        bairro,
        cep,
        estado,
        localidade,
        logradouro,
        regiao,
        uf,
        complemento,
        userId
      });
      res.status(201).json(newAddress);
    });
  }
  static getAllAddresses(req, res) {
    return __async(this, null, function* () {
      const tokenInfo = yield getTokenInfo_default(req);
      const userId = tokenInfo.id;
      const addresses = yield addressModel.find({ userId });
      res.status(200).json(addresses);
    });
  }
};
