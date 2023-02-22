import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const showDevtools = process.env.NODE_ENV !== "production";

const reducer = {};

export const store = configureStore({
  reducer,
  devTools: showDevtools,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
