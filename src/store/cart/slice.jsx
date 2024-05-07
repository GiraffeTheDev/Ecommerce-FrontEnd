import { createSlice } from "@reduxjs/toolkit";
import { handleAddCart, handleGetCart, handleRemoveCart } from "./handler";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "is fetching",
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleAddCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleAddCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.items.push(action.payload.data);
      })
      .addCase(handleGetCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleGetCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(handleRemoveCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleRemoveCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
      });
  },
});
export default cartSlice.reducer;
