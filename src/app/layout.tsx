import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers/queryProvider";
import { AuthProvider } from "./store/AuthContext";

import Footer from "./Footer";
import Header from "./Header";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "에그프렌즈",
  description: "취미를 같이해요 🥚",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/asset/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full`} suppressHydrationWarning>
      <body className="font-pretendard h-full">
        <AuthProvider>
          <Providers>
            <div className="flex flex-col h-full bg-white">
              <Header className="fixed top-0 w-full flex-shrink-0" />
              <main className="flex-1 overflow-y-auto mt-[60px] mb-[60px]">{children}</main>
              <Footer className="fixed bottom-0 w-full flex-shrink-0" />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
