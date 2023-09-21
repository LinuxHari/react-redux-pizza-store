import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/UserSlice";
import { menuReducer } from "../features/MenuSlice";
import { cartReducer } from "../features/CartSlice";
import { orderReducer } from "../features/OrderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
