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

// src/controllers/ProductController.ts
var ProductController_exports = {};
__export(ProductController_exports, {
  default: () => ProductController
});
module.exports = __toCommonJS(ProductController_exports);

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
