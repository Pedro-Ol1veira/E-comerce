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

// src/routes/AddressRoutes.ts
var AddressRoutes_exports = {};
__export(AddressRoutes_exports, {
  default: () => AddressRoutes_default
});
module.exports = __toCommonJS(AddressRoutes_exports);
var import_express = require("express");

// src/middlewares/authorizations/authGuard.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
require("dotenv").config();
var jwtSecret = process.env.JWT_SECRET;
var authGuard = (req, res, next) => {
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
var authGuard_default = authGuard;

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
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
require("dotenv").config();
var jwtSecret2 = process.env.JWT_SECRET;
var getTokenInfo = (req) => __async(void 0, null, function* () {
  const authHeader = req.headers["authorization"];
  const token = authHeader == null ? void 0 : authHeader.split(" ")[1];
  const decoded = import_jsonwebtoken2.default.verify(token || "", jwtSecret2 || "");
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

// src/middlewares/validations/addressValidation.ts
var import_express_validator = require("express-validator");
var checkIfIsNumber = new RegExp(/^\d+$/);
var createAddressValidation = () => {
  return [
    (0, import_express_validator.body)("bairro").isString().withMessage("O Bairro \xE9 obrigatorio").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O bairro n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("cep").isString().withMessage("O CEP \xE9 obrigatorio").isNumeric().withMessage("CEP invalido!").isLength({ min: 8, max: 8 }),
    (0, import_express_validator.body)("estado").isString().withMessage("O estado \xE9 obrigatorio").isLength({ min: 5 }).withMessage("O estado deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O estado n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("localidade").isString().withMessage("A Localidade \xE9 obrigatoria").isLength({ min: 5 }).withMessage("A localidade deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("A localidade n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("logradouro").isString().withMessage("O logradouro \xE9 obrigatorio").isLength({ min: 5 }).withMessage("O logradouro deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O logradouro n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("regiao").isString().withMessage("A regi\xE3o \xE9 obrigatoria").isLength({ min: 5 }).withMessage("A regiao deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("A regi\xE3o n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("uf").isString().withMessage("O UF \xE9 obrigatorio").isLength({ min: 2, max: 2 }).withMessage("UF invalido").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O UF n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator.body)("complemento").isString().withMessage("O complemento \xE9 obrigatorio").isLength({ min: 5 }).withMessage("O complemento deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O complemento n\xE3o pode conter apenas numeros");
      }
      return true;
    })
  ];
};

// src/middlewares/validations/handleValidation.ts
var import_express_validator2 = require("express-validator");
var validate = (req, res, next) => {
  const errors = (0, import_express_validator2.validationResult)(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errosExtracted = [];
  errors.array().map((error) => errosExtracted.push({ [error.type]: error.msg }));
  res.status(422).json({
    errors: errosExtracted
  });
};

// src/routes/AddressRoutes.ts
var router = (0, import_express.Router)();
router.post(
  "/register",
  createAddressValidation(),
  validate,
  authGuard_default,
  AddressController.register
);
router.get("/getAll", authGuard_default, AddressController.getAllAddresses);
var AddressRoutes_default = router;
