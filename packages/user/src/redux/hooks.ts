import { useDispatch, useSelector } from "react-redux";

import type { UserRootState, UserAppDispatch } from "./store";
import type { TypedUseSelectorHook } from "react-redux";

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useUserAppDispatch = () => useDispatch<UserAppDispatch>();
export const useUserAppSelector: TypedUseSelectorHook<UserRootState> =
  useSelector;
