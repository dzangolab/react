import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./store";
import type { TypedUseSelectorHook } from "react-redux";

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
