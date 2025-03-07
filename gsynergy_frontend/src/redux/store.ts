import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slices/storeSlice";
import skuReducer from "./slices/skuSlice"; 
// import planningReducer from './slices/planningSlice';
import gmReducer from "./slices/gmSlice";
export const store = configureStore({
  reducer: {
    store: storeReducer,
    sku: skuReducer, 
    gmData: gmReducer,
    // planning: planningReducer,
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
