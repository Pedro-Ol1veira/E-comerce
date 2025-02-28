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

// src/routes/Router.ts
var Router_exports = {};
__export(Router_exports, {
  default: () => Router_default
});
module.exports = __toCommonJS(Router_exports);
var import_express6 = require("express");

// src/routes/UserRoutes.ts
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

// src/routes/AddressRoutes.ts
var import_express2 = require("express");

// src/models/Address.ts
var import_mongoose3 = require("mongoose");
var addressSchema = new import_mongoose3.Schema(
  {
    bairro: { type: String, required: true },
    cep: { type: String, required: true },
    estado: { type: String, required: true },
    localidade: { type: String, required: true },
    logradouro: { type: String, required: true },
    regiao: { type: String, required: true },
    uf: { type: String, required: true },
    complemento: { type: String, required: true },
    userId: { type: import_mongoose3.Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
);
var addressModel = (0, import_mongoose3.model)("Addresses", addressSchema);

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
var import_express_validator3 = require("express-validator");
var checkIfIsNumber = new RegExp(/^\d+$/);
var createAddressValidation = () => {
  return [
    (0, import_express_validator3.body)("bairro").isString().withMessage("O Bairro \xE9 obrigatorio").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O bairro n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator3.body)("cep").isString().withMessage("O CEP \xE9 obrigatorio").isNumeric().withMessage("CEP invalido!").isLength({ min: 8, max: 8 }),
    (0, import_express_validator3.body)("estado").isString().withMessage("O estado \xE9 obrigatorio").isLength({ min: 5 }).withMessage("O estado deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O estado n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator3.body)("localidade").isString().withMessage("A Localidade \xE9 obrigatoria").isLength({ min: 5 }).withMessage("A localidade deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("A localidade n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator3.body)("logradouro").isString().withMessage("O logradouro \xE9 obrigatorio").isLength({ min: 5 }).withMessage("O logradouro deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O logradouro n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator3.body)("regiao").isString().withMessage("A regi\xE3o \xE9 obrigatoria").isLength({ min: 5 }).withMessage("A regiao deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("A regi\xE3o n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator3.body)("uf").isString().withMessage("O UF \xE9 obrigatorio").isLength({ min: 2, max: 2 }).withMessage("UF invalido").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O UF n\xE3o pode conter apenas numeros");
      }
      return true;
    }),
    (0, import_express_validator3.body)("complemento").isString().withMessage("O complemento \xE9 obrigatorio").isLength({ min: 5 }).withMessage("O complemento deve ter no minimo 5 letras").custom((value) => {
      if (checkIfIsNumber.test(value)) {
        throw new Error("O complemento n\xE3o pode conter apenas numeros");
      }
      return true;
    })
  ];
};

// src/routes/AddressRoutes.ts
var router2 = (0, import_express2.Router)();
router2.post(
  "/register",
  createAddressValidation(),
  validate,
  authGuard_default,
  AddressController.register
);
router2.get("/getAll", authGuard_default, AddressController.getAllAddresses);
var AddressRoutes_default = router2;

// src/routes/AdminRoutes.ts
var import_express3 = require("express");

// src/controllers/AdminController.ts
var import_bcrypt2 = __toESM(require("bcrypt"));
var import_jsonwebtoken4 = __toESM(require("jsonwebtoken"));

// src/models/Admin.ts
var import_mongoose4 = require("mongoose");
var adminSchema = new import_mongoose4.Schema(
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
var adminModel = (0, import_mongoose4.model)("Admins", adminSchema);

// src/controllers/AdminController.ts
require("dotenv").config();
var jwtSecret4 = process.env.JWT_SECRET_ADMIN;
var generateToken2 = (id, isSuperUser) => {
  return import_jsonwebtoken4.default.sign(
    {
      id,
      isSuperUser
    },
    jwtSecret4 != null ? jwtSecret4 : "",
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
        const salt = yield import_bcrypt2.default.genSalt();
        const passwordHash = yield import_bcrypt2.default.hash(password, salt);
        const newUser = yield adminModel.create({
          name,
          lastName,
          email,
          password: passwordHash,
          isSuperUser
        });
        const token = generateToken2(newUser.id, newUser.isSuperUser);
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
        const verifyPass = yield import_bcrypt2.default.compare(password, user.password);
        if (!verifyPass) {
          res.status(422).json({ errors: [{ loginFail: "E-mail ou Senha invalidos" }] });
          return;
        }
        const token = generateToken2(user.id, user.isSuperUser);
        res.status(200).json({ user, token });
      } catch (error) {
        console.log(error);
      }
    });
  }
};

// src/middlewares/validations/adminValidations.ts
var import_express_validator4 = require("express-validator");
var createAdminValidation = () => {
  return [
    (0, import_express_validator4.body)("name").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O nome deve ter entre 4 e 15 letras").isAlpha().withMessage("O nome n\xE3o pode conter numeros"),
    (0, import_express_validator4.body)("lastName").isString().withMessage("O sobrenome \xE9 obrigatorio").isLength({ min: 4, max: 15 }).withMessage("O sobrenome deve ter entre 4 e 15 letras").isAlpha().withMessage("O sobrenome n\xE3o pode conter numeros"),
    (0, import_express_validator4.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator4.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres"),
    (0, import_express_validator4.body)("confirmPassword").isString().withMessage("A confirma\xE7\xE3o de senha \xE9 obrigatoria").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("A senha e a confirma\xE7\xE3o de senha deve ser iguais");
      }
      return true;
    }),
    (0, import_express_validator4.body)("isSuperUser").isBoolean().withMessage("O campo so pode ser preechido com verdadeiro ou falso")
  ];
};
var loginAdminValidation = () => {
  return [
    (0, import_express_validator4.body)("email").isString().withMessage("O email \xE9 obrigatorio").isEmail().withMessage("E-mail invalido"),
    (0, import_express_validator4.body)("password").isString().withMessage("A senha \xE9 obrigatoria").isLength({ min: 8 }).withMessage("A senha deve conter no minimo 8 caracteres")
  ];
};

// src/routes/AdminRoutes.ts
var router3 = (0, import_express3.Router)();
router3.post(
  "/register",
  createAdminValidation(),
  validate,
  AdminController.register
);
router3.post("/login", loginAdminValidation(), validate, AdminController.login);
var AdminRoutes_default = router3;

// src/routes/ProductRoutes.ts
var import_express4 = require("express");

// src/middlewares/authorizations/admGuard.ts
var import_jsonwebtoken5 = __toESM(require("jsonwebtoken"));
require("dotenv").config();
var jwtSecret5 = process.env.JWT_SECRET_ADMIN;
var admGuard = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader == null ? void 0 : authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ errors: [{ authorization: "Acesso Negado!" }] });
    return;
  }
  try {
    const verify = import_jsonwebtoken5.default.verify(token, jwtSecret5 || "");
    next();
  } catch (error) {
    res.status(401).json({ errors: [{ authorization: "Token Invalido!" }] });
  }
};
var admGuard_default = admGuard;

// src/models/Product.ts
var import_mongoose5 = require("mongoose");
var productSchema = new import_mongoose5.Schema(
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
var productModel = (0, import_mongoose5.model)("Products", productSchema);

// src/controllers/ProductController.ts
var import_mongoose6 = require("mongoose");
var ProductController = class {
  static addProduct(req, res) {
    return __async(this, null, function* () {
      const { name, weight, price, amount } = req.body;
      const photos = req.files;
      if ((photos == null ? void 0 : photos.length) === 0) {
        res.status(422).json({ errors: [{ field: "As fotos s\xE3o obrigatorias" }] });
        return;
      }
      const newProduct = {
        name,
        weight,
        price,
        amount,
        photos: []
      };
      photos == null ? void 0 : photos.map((photo) => {
        newProduct.photos.push(photo.filename);
      });
      yield productModel.create(newProduct);
      res.status(200).json(newProduct);
    });
  }
  static getAllProducts(req, res) {
    return __async(this, null, function* () {
      try {
        const products = yield productModel.find();
        res.status(200).json(products);
      } catch (error) {
        console.log(error);
      }
    });
  }
  static deleteProduct(req, res) {
    return __async(this, null, function* () {
      const id = req.params.id;
      if (!import_mongoose6.Types.ObjectId.isValid(id)) {
        res.status(404).json({ errors: { field: "ID invalido" } });
        return;
      }
      try {
        const productDeleted = yield productModel.findByIdAndDelete(id);
        if (!productDeleted) {
          res.status(404).json({ erorrs: { message: "Produto n\xE3o encontrado !" } });
          return;
        }
        res.status(200).json(productDeleted);
      } catch (error) {
        console.log(error);
      }
    });
  }
  static updateProduct(req, res) {
    return __async(this, null, function* () {
      const { name, weight, price, amount } = req.body;
      const images = req.files;
      const id = req.params.id;
      if (!import_mongoose6.Types.ObjectId.isValid(id)) {
        res.status(422).json({ errors: [{ message: "ID invalido" }] });
        return;
      }
      const updatedData = {
        name,
        weight,
        price,
        amount
      };
      if ((images == null ? void 0 : images.length) > 0) {
        updatedData.photos = [];
        images.map((image) => {
          var _a;
          (_a = updatedData.photos) == null ? void 0 : _a.push(image.filename);
        });
      }
      try {
        const productUpdated = yield productModel.findByIdAndUpdate(
          id,
          updatedData
        );
        if (!productUpdated) {
          res.status(404).json({ errors: [{ message: "Produto n\xE3o encontrado" }] });
          return;
        }
        res.status(200).json(updatedData);
      } catch (error) {
      }
    });
  }
};

// src/helpers/imageUpload.ts
var import_multer = __toESM(require("multer"));
var import_uuid = require("uuid");
var imageStore = import_multer.default.diskStorage({
  destination: "public/images/products",
  filename: (req, file, cb) => {
    const photoId = (0, import_uuid.v4)();
    cb(null, photoId);
  }
});
var imageUpload = (0, import_multer.default)({
  storage: imageStore,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Envie apenas arquivos jpg ou png"));
    }
    cb(null, true);
  }
});
var imageUpload_default = imageUpload;

// src/middlewares/validations/productValidation.ts
var import_express_validator5 = require("express-validator");
var checkIfIsNumber2 = new RegExp(/^\d+$/);
var addingProductValidation = () => {
  return [
    (0, import_express_validator5.body)("name").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 1 }).withMessage("O nome do produto deve ter no minimo 1 caractere"),
    (0, import_express_validator5.body)("weight").isNumeric().withMessage("O peso do produto \xE9 obrigatorio"),
    (0, import_express_validator5.body)("price").isNumeric().withMessage("O pre\xE7o precisa ser um numero"),
    (0, import_express_validator5.body)("amount").isNumeric().withMessage("A quantidade em estoque precisa ser um numero")
  ];
};

// src/helpers/imageErrorHandler.ts
var errorHandler = (err, req, res, next) => {
  if (!err) {
    next();
  }
  res.status(422).json({ errors: [{ field: "Envie apenas arquivos png ou jpg" }] });
  return;
};
var imageErrorHandler_default = errorHandler;

// src/routes/ProductRoutes.ts
var router4 = (0, import_express4.Router)();
router4.get("/", ProductController.getAllProducts);
router4.post(
  "/add",
  admGuard_default,
  imageUpload_default.array("photos"),
  imageErrorHandler_default,
  addingProductValidation(),
  validate,
  ProductController.addProduct
);
router4.delete("/delete/:id", admGuard_default, ProductController.deleteProduct);
router4.patch(
  "/update/:id",
  admGuard_default,
  imageUpload_default.array("photos"),
  imageErrorHandler_default,
  addingProductValidation(),
  validate,
  ProductController.updateProduct
);
var ProductRoutes_default = router4;

// src/routes/OrderRoutes.ts
var import_express5 = require("express");

// src/helpers/externalAPI's.ts
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

// src/controllers/OrderController.ts
var OrderController = class {
  static calculateShipping(req, res) {
    return __async(this, null, function* () {
      const { order, cep } = req.body;
      let weightSum = 0;
      for (let i = 0; i < order.length; i++) {
        const product = yield productModel.findById(order[i].id);
        if (product) {
          weightSum += product.weight * order[i].amount;
        } else {
          res.status(422).json({ errors: [{ message: "Produto n\xE3o encontrado" }] });
          return;
        }
      }
      const shippingOptions = yield calculateShippingAPI(cep, weightSum);
      res.status(200).json(shippingOptions);
    });
  }
  static paymentMethods(req, res) {
    return __async(this, null, function* () {
      const paymentMethods = yield paymentMethodsAPI();
      res.status(200).json(paymentMethods);
    });
  }
  static makeOrder(req, res) {
    return __async(this, null, function* () {
      const { order, addressId, shippingId } = req.body;
      const tokenInfo = yield getTokenInfo_default(req);
      const userId = tokenInfo.id;
      let weightSum = 0;
      let totalPrice = 0;
      for (let i = 0; i < order.length; i++) {
        const product = yield productModel.findById(order[i].id);
        if (product) {
          if (product.amount == 0) {
            res.status(422).json({ errors: [{ message: "Produto indisponivel" }] });
            return;
          }
          weightSum += product.weight * order[i].amount;
          totalPrice += product.price * order[i].amount;
        } else {
          res.status(422).json({ errors: [{ message: "Produto n\xE3o encontrado" }] });
          return;
        }
      }
      try {
        const address = yield addressModel.findById(addressId);
        if (!address) {
          res.status(404).json({ errors: [{ message: "O endere\xE7o n\xE3o foi encontrado" }] });
          return;
        } else if (address.userId != tokenInfo.id) {
          res.status(404).json({
            errors: [
              {
                message: "N\xE3o foi encontrado esse endere\xE7o na sua lista de endere\xE7os"
              }
            ]
          });
          return;
        }
        const shippingOptions = yield calculateShippingAPI(
          address.cep,
          weightSum
        );
        const shipping = shippingOptions.find(({ id }) => shippingId == id);
        if (!shipping) {
          res.status(404).json({ errors: [{ message: "Id do frete invalido" }] });
          return;
        }
        const newOrder = {
          order,
          addressId,
          shippingType: shipping,
          isShiped: false,
          userId
        };
        yield orderModel.create(newOrder);
        res.status(200).json(newOrder);
      } catch (error) {
        console.log(error);
      }
    });
  }
};

// src/middlewares/validations/orderValidation.ts
var import_express_validator6 = require("express-validator");
var import_mongoose7 = require("mongoose");
var checkIfIsNumber3 = new RegExp(/^\d+$/);
var shippingValidation = () => {
  return [
    (0, import_express_validator6.body)("order").isArray({ min: 1 }).withMessage("O pedido \xE9 obrigatorio e deve ter no minimo 1 item").custom((value) => {
      value.map((item) => {
        if (!item.id || !import_mongoose7.Types.ObjectId.isValid(item.id)) {
          throw new Error(
            "O pedido deve conter o id de todos os produtos do carrinho"
          );
        }
        if (!item.amount) {
          throw new Error(
            "O pedido deve conter a quantidade de cada item do carrinho"
          );
        } else if (item.amount <= 0) {
          throw new Error("Quantidade invalida");
        }
      });
      return true;
    }),
    (0, import_express_validator6.body)("cep").isPostalCode("BR").withMessage("CEP invalido")
  ];
};
var makeOrderValidation = () => {
  return [
    (0, import_express_validator6.body)("order").isArray({ min: 1 }).withMessage("O pedido deve ter no minimo 1 produto").custom((value) => {
      value.map((item) => {
        if (!item.id || !import_mongoose7.Types.ObjectId.isValid(item.id)) {
          throw new Error(
            "O pedido deve conter o id de todos os produtos do carrinho"
          );
        }
        if (!item.amount) {
          throw new Error(
            "O pedido deve conter a quantidade de cada item do carrinho"
          );
        } else if (item.amount <= 0) {
          throw new Error("Quantidade invalida");
        }
      });
      return true;
    }),
    (0, import_express_validator6.body)("addressId").isMongoId().withMessage("ID do endere\xE7o invalido"),
    (0, import_express_validator6.body)("shippingId").isNumeric().withMessage("O id do frede deve ser um numero").custom((value) => {
      if (value <= 0) {
        throw new Error("O id do frete deve ser maior que 0");
      }
      return true;
    })
  ];
};

// src/routes/OrderRoutes.ts
var router5 = (0, import_express5.Router)();
router5.post("/shipping", shippingValidation(), validate, authGuard_default, OrderController.calculateShipping);
router5.post("/makeorder", makeOrderValidation(), validate, authGuard_default, OrderController.makeOrder);
router5.get("/payments_methods", OrderController.paymentMethods);
var OrderRoutes_default = router5;

// src/routes/Router.ts
var router6 = (0, import_express6.Router)();
router6.use("/user", UserRoutes_default);
router6.use("/address", AddressRoutes_default);
router6.use("/admin", AdminRoutes_default);
router6.use("/product", ProductRoutes_default);
router6.use("/order", OrderRoutes_default);
var Router_default = router6;
