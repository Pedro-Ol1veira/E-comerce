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

// src/routes/AdminRoutes.ts
var AdminRoutes_exports = {};
__export(AdminRoutes_exports, {
  default: () => AdminRoutes_default
});
module.exports = __toCommonJS(AdminRoutes_exports);
var import_express = require("express");

// src/controllers/AdminController.ts
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

// src/middlewares/validations/adminValidations.ts
var import_express_validator2 = require("express-validator");
var createAdminValidation = () => {
  return [
    (0, import_express_validator2.body)("name").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O nome deve ter entre 4 e 15 letras").isAlpha().withMessage("O nome n\xE3o pode conter numeros"),
    (0, import_express_validator2.body)("lastName").isString().withMessage("O sobrenome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O sobrenome deve ter entre 4 e 15 letras").isAlpha().withMessage("O sobrenome n\xE3o pode conter numeros"),
    (0, import_express_validator2.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator2.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres"),
    (0, import_express_validator2.body)("confirmPassword").isString().withMessage("A confirma\xE7\xE3o de senha \xE9 obrigatoria").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("A senha e a confirma\xE7\xE3o de senha deve ser iguais");
      }
      return true;
    }),
    (0, import_express_validator2.body)("isSuperUser").isBoolean().withMessage("O campo so pode ser preechido com verdadeiro ou falso")
  ];
};
var loginAdminValidation = () => {
  return [
    (0, import_express_validator2.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator2.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres")
  ];
};

// src/routes/AdminRoutes.ts
var router = (0, import_express.Router)();
router.post(
  "/register",
  createAdminValidation(),
  validate,
  AdminController.register
);
router.post("/login", loginAdminValidation(), validate, AdminController.login);
var AdminRoutes_default = router;
