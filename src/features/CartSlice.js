import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, incQuantity, decQuantity } from "../helpers/itemHelpers";

const initialState = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeItem: (state, action) => {
      state.cartItems = deleteItem(state.cartItems, action.payload.id);
    },
    increaseQuantity: (state, action) => {
      state.cartItems = incQuantity(state.cartItems, action.payload.id);
    },
    decreaseQuantity: (state, action) => {
      state.cartItems = decQuantity(state.cartItems, action.payload.id);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const getQuantity = (state) =>
  state.cart.cartItems.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );
export const getTotalPrice = (state) =>
  state.cart.cartItems.reduce(
    (accumulator, item) => accumulator + item.quantity * item.price,
    0
  );
export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
