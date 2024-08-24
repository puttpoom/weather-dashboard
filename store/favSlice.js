import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
  name: "fav",
  initialState: [],
  reducers: {
    addFav: (state, action) => {
      return [...state, action.payload];
    },
    deleteFav: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addFav, deleteFav } = favSlice.actions;
export default favSlice.reducer;
