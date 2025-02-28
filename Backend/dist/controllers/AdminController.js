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

// src/controllers/AdminController.ts
var AdminController_exports = {};
__export(AdminController_exports, {
  default: () => AdminController
});
module.exports = __toCommonJS(AdminController_exports);
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/models/Admin.ts
var import_mongoose = require("mongoose");
var adminSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isSuperUser: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);
var adminModel = (0, import_mongoose.model)("Admins", adminSchema);

// src/controllers/AdminController.ts
require("dotenv").config();
var jwtSecret = process.env.JWT_SECRET_ADMIN;
var generateToken = (id, isSuperUser) => {
  return import_jsonwebtoken.default.sign(
    {
      id,
      isSuperUser
    },
    jwtSecret != null ? jwtSecret : "",
    {
      expiresIn: "7d"
    }
  );
};
var AdminController = class {
  static register(req, res) {
    return __async(this, null, function* () {
      try {
        const { name, lastName, email, password, isSuperUser } = req.body;
        const checkEmail = yield adminModel.findOne({ email });
        if (checkEmail) {
          res.status(422).json({ errors: [{ userExists: "O email j\xE1 est\xE1 em uso" }] });
          return;
        }
        const salt = yield import_bcrypt.default.genSalt();
        const passwordHash = yield import_bcrypt.default.hash(password, salt);
        const newUser = yield adminModel.create({
          name,
          lastName,
          email,
          password: passwordHash,
          isSuperUser
        });
        const token = generateToken(newUser.id, newUser.isSuperUser);
        res.status(200).json({ newUser, token });
      } catch (error) {
        console.log(error);
      }
    });
  }
  static login(req, res) {
    return __async(this, null, function* () {
      try {
        const { email, password } = req.body;
        const user = yield adminModel.findOne({ email });
        if (!user) {
          res.status(422).json({ errors: [{ loginFail: "E-mail ou Senha invalidos" }] });
          return;
        }
        const verifyPass = yield import_bcrypt.default.compare(password, user.password);
        if (!verifyPass) {
          res.status(422).json({ errors: [{ loginFail: "E-mail ou Senha invalidos" }] });
          return;
        }
        const token = generateToken(user.id, user.isSuperUser);
        res.status(200).json({ user, token });
      } catch (error) {
        console.log(error);
      }
    });
  }
};
