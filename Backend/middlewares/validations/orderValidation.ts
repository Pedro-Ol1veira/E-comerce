import { body } from "express-validator";
import { Types } from "mongoose";
const checkIfIsNumber = new RegExp(/^\d+$/);

interface IorderItem {
  id: string,
  amount: number
}

export const orderValidation = () => {
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
    body("cep")
      .isPostalCode("BR")
      .withMessage("CEP invalido"),
  ]; 
};
