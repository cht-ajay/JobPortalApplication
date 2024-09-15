// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Import combined rootReducer

// Create the store with rootReducer
const store = configureStore({
  reducer: rootReducer, // Use the rootReducer here
});

export default store;
