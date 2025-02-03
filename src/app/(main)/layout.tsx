import type { Metadata } from "next";
import "@styles/css/globals.css";
import style from '@styles/css/layout.module.css'
import ReduxProvider from "@/api/providers/ReduxProvider";
import ReactQueryProvider from "@/api/providers/ReactQueryProvider";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import StyledComponentsRegistry from "@/styles/registry";

export const metadata: Metadata = {
  title: "다이어리 꾸밀 때, 마이앤마이",
  description: "다이어리 꾸미기",
  icons: "/favicon.ico",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.mainLayout}>
      <Header/>
      <CategoryBar/>
      {children}
    </div>
  );
}
