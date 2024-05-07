import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../../services/order";

const handleCreateOrder = createAsyncThunk("order", async (values) => {
  const response = await createOrder(values);
  return response.data;
});
export { handleCreateOrder };
