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

// src/routes/UserRoutes.ts
var UserRoutes_exports = {};
__export(UserRoutes_exports, {
  default: () => UserRoutes_default
});
module.exports = __toCommonJS(UserRoutes_exports);
var import_express = require("express");

// src/controllers/UserController.ts
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

// src/middlewares/validations/handleValidation.ts
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

// src/middlewares/validations/userValidations.ts
var import_express_validator2 = require("express-validator");
var cpfRegex = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g;
var phoneRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
var createUserValidation = () => {
  return [
    (0, import_express_validator2.body)("name").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O nome deve ter entre 4 e 15 letras").isAlpha().withMessage("O nome n\xE3o pode conter numeros"),
    (0, import_express_validator2.body)("lastName").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O nome deve ter entre 4 e 15 letras").isAlpha().withMessage("O nome n\xE3o pode conter numeros"),
    (0, import_express_validator2.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator2.body)("cpf").isString().withMessage("O CPF \xE9 obrigatorio").custom((value) => {
      if (value.match(cpfRegex)) {
        throw new Error("O cpf \xE9 invalido");
      }
      return true;
    }),
    (0, import_express_validator2.body)("phone").isString().withMessage("O telefone \xE9 obrigatorio").isLength({ min: 11 }).withMessage("O telefone \xE9 invalido").isNumeric().withMessage("O numero de telefone n\xE3o pode conter letras").custom((value) => {
      if (value.match(phoneRegex)) {
        throw new Error("O telefone \xE9 invalido");
      }
      return true;
    }),
    (0, import_express_validator2.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres"),
    (0, import_express_validator2.body)("confirmPassword").isString().withMessage("A confirma\xE7\xE3o de senha \xE9 obrigatoria").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("A senha e a confirma\xE7\xE3o de senha deve ser iguais");
      }
      return true;
    })
  ];
};
var loginUserValidation = () => {
  return [
    (0, import_express_validator2.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator2.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres")
  ];
};

// src/middlewares/authorizations/authGuard.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
require("dotenv").config();
var jwtSecret3 = process.env.JWT_SECRET;
var authGuard = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader == null ? void 0 : authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ errors: [{ authorization: "Acesso Negado!" }] });
    return;
  }
  try {
    const verify = import_jsonwebtoken3.default.verify(token, jwtSecret3 || "");
    next();
  } catch (error) {
    res.status(401).json({ errors: [{ authorization: "Token Invalido!" }] });
  }
};
var authGuard_default = authGuard;

// src/routes/UserRoutes.ts
var router = (0, import_express.Router)();
router.post(
  "/register",
  createUserValidation(),
  validate,
  UserController.register
);
router.post("/login", loginUserValidation(), validate, UserController.login);
router.get("/profile", authGuard_default, UserController.profile);
router.get("/myorders", authGuard_default, UserController.myOrders);
var UserRoutes_default = router;
