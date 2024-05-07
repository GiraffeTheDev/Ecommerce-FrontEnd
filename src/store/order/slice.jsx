import { createSlice } from "@reduxjs/toolkit";
import { handleCreateOrder } from "./handler";

const cartSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
    status: "is fetching",
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleCreateOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.status = "success";
      });
  },
});
export default cartSlice.reducer;
