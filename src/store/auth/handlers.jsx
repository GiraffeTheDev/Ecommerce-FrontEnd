import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { login, logout, register } from "../../services/auth";
export const handleRegister = createAsyncThunk(
  "registerAuth",
  async (value) => {
    const response = await register(value);
    if (response) {
      toast(response.data.message);
    }
    return response.data;
  }
);
export const handleLogin = createAsyncThunk("loginAuth", async (value) => {
  const response = await login(value);
  if (response) {
    toast(response.data.message);
  }
  return response.data;
});
export const handleLogout = createAsyncThunk("logoutAuth", async () => {
  const response = await logout();
  if (response) {
    toast(response.data.message);
  }
});
