import { createSlice } from "@reduxjs/toolkit";
import { getTime } from "../helpers/orderHelper";

const initialState = {
  orders: JSON.parse(localStorage.getItem("orders")) || [],
  userInfo: {},
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderItem: (state, action) => {
      const deliveryTime = getTime();
      const orderItem = {
        id: action.payload.id,
        order: [...action.payload.cartItems],
        totalPrice: action.payload.totalPrice,
        deliveryTime,
        isPriority: false,
      };
      state.orders = [...state.orders, orderItem];
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    setInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    changePriority: (state, action) => {
      state.orders = state.orders.map((order) =>
        order.id === action.payload.id
          ? {
              ...order,
              isPriority: !order.isPriority,
              totalPrice: action.payload.totalPrice,
              priorityCharge: action.payload.priorityCharge,
            }
          : order
      );
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { orderItem, setInfo, changePriority } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
