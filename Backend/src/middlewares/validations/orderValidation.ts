import { body } from "express-validator";
import { Types } from "mongoose";
const checkIfIsNumber = new RegExp(/^\d+$/);

interface IorderItem {
  id: string;
  amount: number;
}

export const shippingValidation = () => {
  return [
    body("order")
      .isArray({ min: 1 })
      .withMessage("O pedido é obrigatorio e deve ter no minimo 1 item")
      .custom((value) => {
        value.map((item: IorderItem) => {
          if (!item.id || !Types.ObjectId.isValid(item.id)) {
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
    body("cep").isPostalCode("BR").withMessage("CEP invalido"),
  ];
};

export const makeOrderValidation = () => {
  return [
    body("order")
      .isArray({ min: 1 })
      .withMessage("O pedido deve ter no minimo 1 produto")
      .custom((value) => {
        value.map((item: IorderItem) => {
          if (!item.id || !Types.ObjectId.isValid(item.id)) {
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
    body("addressId").isMongoId().withMessage("ID do endereço invalido"),
    body("shippingId")
      .isNumeric()
      .withMessage("O id do frede deve ser um numero")
      .custom((value) => {
        if (value <= 0) {
          throw new Error("O id do frete deve ser maior que 0");
        }
        return true;
      }),
  ];
};
