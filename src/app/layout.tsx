import type { Metadata } from "next";
import "@styles/css/globals.css";
import ReduxProvider from "@/api/providers/ReduxProvider";
import ReactQueryProvider from "@/api/providers/ReactQueryProvider";
import StyledComponentsRegistry from "@/styles/registry";

export const metadata: Metadata = {
  title: "다이어리 꾸밀 때, 마이앤마이",
  description: "다이어리 꾸미기",
  icons: { icon: "/favicon.ico" },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <html lang="ko">
          <body>
            <ReduxProvider>
              <ReactQueryProvider>
                <StyledComponentsRegistry>
                    {children}
                </StyledComponentsRegistry>
              </ReactQueryProvider>
          </ReduxProvider>
          </body>
        </html>
  );
}