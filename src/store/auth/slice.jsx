import { createSlice } from "@reduxjs/toolkit";
import { handleLogin, handleLogout, handleRegister } from "./handlers";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    message: "",
    token: null,
    isLogin: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.token = action.payload.access_token;
        state.isLogin = true;
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.user = null;
        state.isLogin = false;
        state.token = null;
      });
  },
});
export default authSlice.reducer;
