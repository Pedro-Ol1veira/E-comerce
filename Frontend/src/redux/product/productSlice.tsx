import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

interface IProduct {
  _id: string;
  name: string;
  weight: number;
  price: number;
  amount: number;
  photos: string[];
}

interface IInitialState {
  products: IProduct[];
}


const initialState: IInitialState = {
  products: [],
};

export const getProducts = createAsyncThunk<IProduct[]>(
  "product/getProducts",
  async (): Promise<IProduct[]> => {
    const data = await productService.getProducts();
    console.log(data)
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
