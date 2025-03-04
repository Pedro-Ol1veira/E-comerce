//gerencia o state

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  error: false,
  success: false,
  loading: false,
};

interface userCredencials {
  email: string;
  password: string;
}

export const login = createAsyncThunk<any, userCredencials>(
  "auth/login",
  async (user, thunkAPI) => {
    const data = await authService.login(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0].loginFail);
    }

    console.log(data);
    return data;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    await authService.logout();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
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
      .addCase(login.rejected, (state: any, action) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
        state.user = null;
        state.success = true;
      })
  },
});

export default authSlice.reducer;
