import type { Metadata } from "next";
import "@/styles/globals.css";
import layoutStyle from '@/styles/layout.module.css'
import ReduxProvider from "@/api/providers/ReduxProvider";
import ReactQueryProvider from "@/api/providers/ReactQueryProvider";
import Header from "@/components/diary/Header";

export const metadata: Metadata = {
  title: "다이어리 꾸밀 때, 마이앤마이",
  description: "다이어리 꾸미기",
  icons: "/favicon.ico",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>
          <ReactQueryProvider>
            <div className={layoutStyle.diaryLayout}>
              <Header/>
              {children}
            </div>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
