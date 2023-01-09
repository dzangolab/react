import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducer/authslice";

const reducer = {
  auth: authReducer,
};

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
