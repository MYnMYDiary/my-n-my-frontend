'use client';

// redux/hooks.ts
import { AppDispatch, RootState } from "@/api/reduxStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


// ✅ 타입이 지정된 Redux Hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
