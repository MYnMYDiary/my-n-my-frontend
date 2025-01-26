import postReducer from '@/features/posts/postSlice';
import spaceReducer from '@/features/spaceSlice';
// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      post: postReducer,
      spaces: spaceReducer
    },
    devTools: process.env.NODE_ENV !== "production", // 개발 환경에서만 활성화
  });
};

// 클라이언트에서만 Store를 생성하도록 설정
export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
