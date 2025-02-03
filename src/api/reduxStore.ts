"use client"

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import spaceReducer from "@/features/spaceSlice";
import userReducer from "@/features/user/userSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// ✅ SSR 환경 대응: 서버에서는 dummyStorage 사용
const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
});

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

// Redux Persist 설정
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["space", "user"], // 유지할 상태 설정
};

// Reducer 설정 (Persist 적용)
const rootReducer = combineReducers({
  space: spaceReducer, // ❌ 개별적으로 persistReducer 적용 X
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// 클라이언트에서만 store, persistor 생성
export let store: AppStore | undefined;
export let persistor: ReturnType<typeof persistStore> | undefined;

if (typeof window !== "undefined") {
  store = makeStore();
  persistor = persistStore(store);
}

