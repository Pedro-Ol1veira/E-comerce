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

// src/routes/OrderRoutes.ts
var OrderRoutes_exports = {};
__export(OrderRoutes_exports, {
  default: () => OrderRoutes_default
});
module.exports = __toCommonJS(OrderRoutes_exports);
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

// src/models/Order.ts
var import_mongoose = require("mongoose");
var orderSchema = new import_mongoose.Schema(
  {
    order: { type: [Object], required: true },
    addressId: { type: import_mongoose.Schema.Types.ObjectId, required: true },
    shippingType: { type: Object, required: true },
    isShiped: { type: Boolean, required: true },
    userId: { type: import_mongoose.Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
);
var orderModel = (0, import_mongoose.model)("Orders", orderSchema);

// src/models/Address.ts
var import_mongoose2 = require("mongoose");
var addressSchema = new import_mongoose2.Schema(
  {
    bairro: { type: String, required: true },
    cep: { type: String, required: true },
    estado: { type: String, required: true },
    localidade: { type: String, required: true },
    logradouro: { type: String, required: true },
    regiao: { type: String, required: true },
    uf: { type: String, required: true },
    complemento: { type: String, required: true },
    userId: { type: import_mongoose2.Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
);
var addressModel = (0, import_mongoose2.model)("Addresses", addressSchema);

// src/models/Product.ts
var import_mongoose3 = require("mongoose");
var productSchema = new import_mongoose3.Schema(
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
var productModel = (0, import_mongoose3.model)("Products", productSchema);

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
var import_express_validator = require("express-validator");
var import_mongoose4 = require("mongoose");
var checkIfIsNumber = new RegExp(/^\d+$/);
var shippingValidation = () => {
  return [
    (0, import_express_validator.body)("order").isArray({ min: 1 }).withMessage("O pedido \xE9 obrigatorio e deve ter no minimo 1 item").custom((value) => {
      value.map((item) => {
        if (!item.id || !import_mongoose4.Types.ObjectId.isValid(item.id)) {
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
    (0, import_express_validator.body)("cep").isPostalCode("BR").withMessage("CEP invalido")
  ];
};
var makeOrderValidation = () => {
  return [
    (0, import_express_validator.body)("order").isArray({ min: 1 }).withMessage("O pedido deve ter no minimo 1 produto").custom((value) => {
      value.map((item) => {
        if (!item.id || !import_mongoose4.Types.ObjectId.isValid(item.id)) {
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
    (0, import_express_validator.body)("addressId").isMongoId().withMessage("ID do endere\xE7o invalido"),
    (0, import_express_validator.body)("shippingId").isNumeric().withMessage("O id do frede deve ser um numero").custom((value) => {
      if (value <= 0) {
        throw new Error("O id do frete deve ser maior que 0");
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

// src/routes/OrderRoutes.ts
var router = (0, import_express.Router)();
router.post("/shipping", shippingValidation(), validate, authGuard_default, OrderController.calculateShipping);
router.post("/makeorder", makeOrderValidation(), validate, authGuard_default, OrderController.makeOrder);
router.get("/payments_methods", OrderController.paymentMethods);
var OrderRoutes_default = router;
