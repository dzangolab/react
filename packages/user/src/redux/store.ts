import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "@/redux/reducer/AuthSlice";

const reducer = {
  auth: AuthReducer,
};

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type UserRootState = ReturnType<typeof store.getState>;
export type UserAppDispatch = typeof store.dispatch;
