import { createSlice } from "@reduxjs/toolkit";
import { getMenu } from "../api/getMenu";

const initialState = {
  items: [],
  success: false,
  error: null,
  loading: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMenu.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.items = payload;
      })
      .addCase(getMenu.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      });
  },
});

export const menuReducer = menuSlice.reducer;
