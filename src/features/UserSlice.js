import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;

export const userReducer = userSlice.reducer;
