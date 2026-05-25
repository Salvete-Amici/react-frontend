import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
import { errorReducer } from "./errorReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  auth: { user: user },
  carts: { cart: cartItems },
  payment: { paymentMethod: null },
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    carts: cartReducer,
    auth: authReducer,
    payment: paymentMethodReducer,
  },
  preloadedState: initialState,
});

export default store;
