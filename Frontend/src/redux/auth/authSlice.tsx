//gerencia o state

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

interface IInitialState {
  user: object | null;
  admin: boolean;
  error: boolean | string;
  success: boolean;
  loading: boolean;
}

const initialState: IInitialState = {
  user: null,
  admin: false,
  error: false,
  success: false,
  loading: false,
};

interface userLoginCredencials {
  email: string;
  password: string;
}

interface userRegisterCredential {
  name: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const login = createAsyncThunk<any, userLoginCredencials>(
  "auth/login",
  async (user, thunkAPI) => {
    const data = await authService.login(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(Object.values(data.errors[0]));
    }

    return data;
  }
);

export const adminLogin = createAsyncThunk<any, userLoginCredencials>(
  "auth/adminLogin",
  async (admin, thunkAPI) => {
    const data = await authService.adminLogin(admin);
    if(data.errors) {
      return thunkAPI.rejectWithValue(Object.values(data.errors[0]));
    }

    return data;
  }
)

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const register = createAsyncThunk<any, userRegisterCredential>(
  "auth/register",
  async (newUser, thunkAPI) => {
    const data = await authService.register(newUser);

    if(data.errors) {
      return thunkAPI.rejectWithValue(Object.values(data.errors[0]));
    }


    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.admin = false;
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(login.rejected, (state: IInitialState, action: any) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
        state.admin =  false;
        state.success = false;
      })
      .addCase(login.fulfilled, (state: IInitialState, action) => {
        state.error = false;
        state.loading = false;
        state.user = action.payload.user;
        state.admin = false;
        state.success = true;
      })
      .addCase(adminLogin.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(adminLogin.rejected, (state: IInitialState, action: any) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
        state.admin =  false;
        state.success = false;
      })
      .addCase(adminLogin.fulfilled, (state: IInitialState, action:any) => {
        state.error = false;
        state.admin = true;
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(logout.fulfilled, (state: IInitialState) => {
        state.error = false;
        state.loading = false;
        state.user = null;
        state.admin = false;
        state.success = true;
      })
      .addCase(register.pending, (state: IInitialState) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(register.rejected, (state: IInitialState, action: any) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state: IInitialState, action: any) => {
        state.user = action.payload.newUser;
        state.admin = false;
        state.loading = false;
        state.success = true;
        state.error = false;
      });
  },
});

export default authSlice.reducer;
