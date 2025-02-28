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

// src/controllers/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  default: () => UserController
});
module.exports = __toCommonJS(UserController_exports);
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));

// src/models/User.ts
var import_mongoose = require("mongoose");
var userSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);
var userModel = (0, import_mongoose.model)("Users", userSchema);

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

// src/models/Order.ts
var import_mongoose2 = require("mongoose");
var orderSchema = new import_mongoose2.Schema(
  {
    order: { type: [Object], required: true },
    addressId: { type: import_mongoose2.Schema.Types.ObjectId, required: true },
    shippingType: { type: Object, required: true },
    isShiped: { type: Boolean, required: true },
    userId: { type: import_mongoose2.Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
);
var orderModel = (0, import_mongoose2.model)("Orders", orderSchema);

// src/controllers/UserController.ts
require("dotenv").config();
var jwtSecret2 = process.env.JWT_SECRET;
var generateToken = (id) => {
  return import_jsonwebtoken2.default.sign(
    {
      id
    },
    jwtSecret2 != null ? jwtSecret2 : "",
    {
      expiresIn: "7d"
    }
  );
};
var UserController = class {
  static register(req, res) {
    return __async(this, null, function* () {
      try {
        const { name, lastName, email, cpf, phone, password } = req.body;
        const checkEmail = yield userModel.findOne({ email });
        const checkCpf = yield userModel.findOne({ cpf });
        if (checkEmail) {
          res.status(422).json({ errors: [{ userExists: "O email j\xE1 est\xE1 em uso" }] });
          return;
        } else if (checkCpf) {
          res.status(422).json({ errors: [{ userExists: "O CPF j\xE1 est\xE1 em uso" }] });
          return;
        }
        const salt = yield import_bcrypt.default.genSalt();
        const passwordHash = yield import_bcrypt.default.hash(password, salt);
        const newUser = yield userModel.create({
          name,
          lastName,
          email,
          cpf,
          phone,
          password: passwordHash
        });
        const token = generateToken(newUser.id);
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
        const user = yield userModel.findOne({ email });
        if (!user) {
          res.status(422).json({ errors: [{ loginFail: "E-mail ou Senha invalidos" }] });
          return;
        }
        const verifyPass = yield import_bcrypt.default.compare(password, user.password);
        if (!verifyPass) {
          res.status(422).json({ errors: [{ loginFail: "E-mail ou Senha invalidos" }] });
          return;
        }
        const token = generateToken(user.id);
        res.status(200).json({ user, token });
      } catch (error) {
        console.log(error);
      }
    });
  }
  static profile(req, res) {
    return __async(this, null, function* () {
      try {
        const tokenInfo = yield getTokenInfo_default(req);
        const userId = tokenInfo.id;
        const userProfile = yield userModel.findById(userId).select("-password");
        res.status(200).json(userProfile);
      } catch (error) {
        console.log(error);
      }
    });
  }
  static myOrders(req, res) {
    return __async(this, null, function* () {
      const tokenInfo = yield getTokenInfo_default(req);
      const userId = tokenInfo.id;
      try {
        const myOrders = yield orderModel.find({ userId });
        res.status(200).json(myOrders);
      } catch (error) {
        console.log(error);
      }
    });
  }
};
