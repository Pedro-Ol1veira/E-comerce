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

// src/middlewares/authorizations/admGuard.ts
var admGuard_exports = {};
__export(admGuard_exports, {
  default: () => admGuard_default
});
module.exports = __toCommonJS(admGuard_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
require("dotenv").config();
var jwtSecret = process.env.JWT_SECRET_ADMIN;
var admGuard = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader == null ? void 0 : authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ errors: [{ authorization: "Acesso Negado!" }] });
    return;
  }
  try {
    const verify = import_jsonwebtoken.default.verify(token, jwtSecret || "");
    next();
  } catch (error) {
    res.status(401).json({ errors: [{ authorization: "Token Invalido!" }] });
  }
};
var admGuard_default = admGuard;
