const apiUrl = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  try {
    const res = await fetch(apiUrl + "product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const productService = {
  getProducts,
};

export default productService;
