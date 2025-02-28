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

// src/routes/ProductRoutes.ts
var ProductRoutes_exports = {};
__export(ProductRoutes_exports, {
  default: () => ProductRoutes_default
});
module.exports = __toCommonJS(ProductRoutes_exports);
var import_express = require("express");

// src/middlewares/authorizations/admGuard.ts
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

// src/models/Product.ts
var import_mongoose = require("mongoose");
var productSchema = new import_mongoose.Schema(
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
var productModel = (0, import_mongoose.model)("Products", productSchema);

// src/controllers/ProductController.ts
var import_mongoose2 = require("mongoose");
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
      if (!import_mongoose2.Types.ObjectId.isValid(id)) {
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
      if (!import_mongoose2.Types.ObjectId.isValid(id)) {
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

// src/middlewares/validations/productValidation.ts
var import_express_validator2 = require("express-validator");
var checkIfIsNumber = new RegExp(/^\d+$/);
var addingProductValidation = () => {
  return [
    (0, import_express_validator2.body)("name").isString().withMessage("O nome \xE9 obrigatorio").isLength({ min: 1 }).withMessage("O nome do produto deve ter no minimo 1 caractere"),
    (0, import_express_validator2.body)("weight").isNumeric().withMessage("O peso do produto \xE9 obrigatorio"),
    (0, import_express_validator2.body)("price").isNumeric().withMessage("O pre\xE7o precisa ser um numero"),
    (0, import_express_validator2.body)("amount").isNumeric().withMessage("A quantidade em estoque precisa ser um numero")
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
var router = (0, import_express.Router)();
router.get("/", ProductController.getAllProducts);
router.post(
  "/add",
  admGuard_default,
  imageUpload_default.array("photos"),
  imageErrorHandler_default,
  addingProductValidation(),
  validate,
  ProductController.addProduct
);
router.delete("/delete/:id", admGuard_default, ProductController.deleteProduct);
router.patch(
  "/update/:id",
  admGuard_default,
  imageUpload_default.array("photos"),
  imageErrorHandler_default,
  addingProductValidation(),
  validate,
  ProductController.updateProduct
);
var ProductRoutes_default = router;
