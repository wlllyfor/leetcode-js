import { RecoilRoot } from "@/store/recoil";
import type { Metadata } from "next";
import React, { ReactNode, Suspense } from "react";
import "./globals.css";
import Loading from "@/components/molecules/common/loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description:
    "バイヤーセントラルは、株式会社イーウーパスポートが提供する、中国とタイからの仕入れ、日本からの海外発送、そして在庫管理を効率的に管理できるグローバルなプラットフォームです。",
  colorScheme: "light",
};

type LayoutType = {
  children: ReactNode;
};

const RootLayout = ({ children }: LayoutType) => {
  return (
    <>
      <html lang="ja">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <div className="font-base">
            <RecoilRoot>
              <Suspense fallback={<Loading />}>
                <ToastContainer closeOnClick theme="colored" />
                {children}
              </Suspense>
            </RecoilRoot>
          </div>
        </body>
      </html>
    </>
  );
};
export default RootLayout;
