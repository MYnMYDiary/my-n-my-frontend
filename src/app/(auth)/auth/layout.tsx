import type { Metadata } from "next";
import "@styles/css/globals.css";
import layoutStyle from '@styles/css/layout.module.css'
import ReduxProvider from "@/api/providers/ReduxProvider";
import ReactQueryProvider from "@/api/providers/ReactQueryProvider";


export const metadata: Metadata = {
  title: "다이어리 꾸밀 때, 마이앤마이",
  description: "다이어리 꾸미기",
  icons: "/favicon.ico",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={layoutStyle.authLayout}>
      {children}
    </div>
  );
}
