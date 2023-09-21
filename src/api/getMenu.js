import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const menuPoint = "https://react-fast-pizza-api.onrender.com/api/menu";

export const getMenu = createAsyncThunk(
  "/getMenu",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(menuPoint);
      return data.data;
    } catch (error) {
      if (error.response.data.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue(error);
    }
  }
);
