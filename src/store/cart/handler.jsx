import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCart, getCart, removeCart, updateCart } from "../../services/cart";

const handleAddCart = createAsyncThunk("addCart", async (values) => {
  const response = await addCart(values);
  return response.data;
});
const handleGetCart = createAsyncThunk("getCart", async (userId) => {
  const response = await getCart(userId);
  return response.data.data;
});
const handleRemoveCart = createAsyncThunk("removeCart", async (id) => {
  const response = await removeCart(id);
  return response.data.message;
});
const handleUpdateCart = createAsyncThunk("updateCart", async (values) => {
  const response = await updateCart(values);
  return response.data;
});
export { handleAddCart, handleGetCart, handleRemoveCart, handleUpdateCart };
