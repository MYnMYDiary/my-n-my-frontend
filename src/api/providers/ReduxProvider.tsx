"use client"; // App Router 사용 시 필요

import { Provider } from "react-redux";
import { store } from "../reduxStore";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
