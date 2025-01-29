// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       post: postReducer,
//       spaces: spaceReducer,
//       user: userReducer
//     },
//     devTools: process.env.NODE_ENV !== "production", // 개발 환경에서만 활성화
//   });
// };

// // 클라이언트에서만 Store를 생성하도록 설정
// export const store = makeStore();

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];

import spaceReducer from '@/features/spaceSlice';
import userReducer from '@/features/user/userSlice';

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage를 사용

// Redux Persist 설정 (공통)
const spacePersistConfig = {
  key: 'spaces',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
};

// Root Reducer 설정 (Persist 적용)
const rootReducer = combineReducers({
  spaces: persistReducer(spacePersistConfig, spaceReducer),
  user: persistReducer(userPersistConfig, userReducer),
  //posts: postReducer, // 게시물 처럼 계속 유지될 필요가 없는 경우 그냥 추가
});

// Store 생성 함수
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // 개발 환경에서만 Redux DevTools 활성화
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'], // Redux Persist 관련 액션 제외
        },
      }),
  });
};

// 클라이언트에서만 Store를 생성하도록 설정
export const store = makeStore();
export const persistor = persistStore(store); // Redux-Persist Store 생성

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
