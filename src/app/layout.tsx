import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers/queryProvider";
import { AuthProvider } from "./store/AuthContext";

import Footer from "./Footer";
import Header from "./Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
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
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Providers>
            <div className="fixed flex flex-col w-[390px] h-[844px] bg-white">
              <Header className="w-full h-[48px] flex-shrink-0" />
              <main className="flex-1 overflow-y-auto h-[739px]">{children}</main>
              <Footer className="w-full flex-shrink-0" />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
