import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./favSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    fav: favReducer,
    theme: themeReducer,
  },
});
