"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store as initialStore, persistor as initialPersistor } from "./reduxStore";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState(initialStore);
  const [persistor, setPersistor] = useState(initialPersistor);

  useEffect(() => {
    setStore(initialStore);
    setPersistor(initialPersistor);
  }, []);

  // store 또는 persistor가 정의되지 않은 경우 null 반환 (서버 사이드 방어)
  if (!store || !persistor) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
