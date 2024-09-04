import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../utils/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const fetchFavorite = createAsyncThunk("fav/fetchFavorite", async () => {
  const querySnapshot = await getDocs(collection(db, "favorites"));
  const favItems = [];
  querySnapshot.forEach((doc) => {
    favItems.push({
      id: doc.id,
      city: doc.data().city,
      temperature: doc.data().temperature,
      humidity: doc.data().humidity,
      windspeed: doc.data().windSpeed,
      description: doc.data().description,
      createdAt: doc.data().createdAt,
    });
  });
  return favItems;
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchFavorite.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addFav, deleteFav } = favSlice.actions;
export default favSlice.reducer;
