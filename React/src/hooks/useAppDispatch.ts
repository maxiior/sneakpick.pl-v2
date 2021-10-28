import { TypedUseSelectorHook, useDispatch } from "react-redux";
import type { AppDispatch } from "store";

export const useAppDispatch: TypedUseSelectorHook<AppDispatch> = useDispatch;
