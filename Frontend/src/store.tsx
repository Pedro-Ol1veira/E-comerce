import {configureStore} from '@reduxjs/toolkit';
import authReducer from './redux/auth/authSlice';
import productReducer from './redux/product/productSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

