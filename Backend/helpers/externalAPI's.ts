require("dotenv").config();

// Frete

const MelhorEnvioToken = process.env.MELHOR_ENVIO_TOKEN;

export const calculateShippingAPI = async (cep: string, weightSum: number) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${MelhorEnvioToken}`,
      "User-Agent": "Aplicação (email para contato técnico)",
    },
    body: JSON.stringify({
      from: { postal_code: "01002001" },
      to: { postal_code: cep },
      package: { height: 4, width: 12, length: 17, weight: weightSum },
    }),
  };

  const shippingOptions = await fetch(
    "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
    options
  )
    .then((shipping) => shipping.json())
    .catch((err) => console.error(err));

  return shippingOptions;
};

// Mercadopago

const mercadopagoToken = process.env.MERCADOPAGO_TOKEN;


// Acho que essa requisição ficará apenas no front-end
export const paymentMethodsAPI = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${mercadopagoToken}`,
    },
  };

  const shippingOptions = await fetch(
    "https://api.mercadopago.com/v1/payment_methods",
    options
  )
    .then((shipping) => shipping.json())
    .catch((err) => console.error(err));

  return shippingOptions;
};

