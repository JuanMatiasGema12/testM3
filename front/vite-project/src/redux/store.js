import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userReducer";

const store = configureStore({
  reducer: userSlice,
});

export default store;
