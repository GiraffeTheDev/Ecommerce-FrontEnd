import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authSlice from "./auth/slice";
import cartSlice from "./cart/slice";
const authPersistConfig = {
  key: "auth",
  storage,
};
const cartPersistConfig = {
  key: "cart",
  storage,
};
export const reducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  cart: persistReducer(cartPersistConfig, cartSlice),
  // Add other reducers here
});
