import type { Metadata } from "next";
import "@styles/css/globals.css";
import layoutStyle from '@styles/css/layout.module.css'
import Header from "@/components/diary/Header";
import StyledComponentsRegistry from "@/styles/registry";

export const metadata: Metadata = {
  title: "다이어리 꾸밀 때, 마이앤마이",
  description: "다이어리 꾸미기",
  icons: "/favicon.ico",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={layoutStyle.diaryLayout}>
      <Header/>
      {children}
    </div>
  );
}
