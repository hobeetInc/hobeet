"use client";

import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers/queryProvider";
import { AuthProvider } from "./store/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import { usePathname } from "next/navigation";
import ScreenSizeInitializer from "@/components/uiComponents/ResponsiveDesign/ScreenSizeInitializer";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noHeaderFooterRoutes = [
    "/signin",
    "/register",
    /^\/chat\/regularChat\/.*$/,
    "/club",
    "/club/one-time",
    "/club/regular-time",
    /^\/chat\/onetimeChat\/.*$/,
    /^\/club\/one-time-club-sub\/.*$/,
    /^\/club\/regular-club-sub\/.*$/,
    /^\/signupSecond\/.*$/,
    "/mypage/profileUpdate",
    "/mypage/inquiry",
    "/kakaopay/paymentConfirm",
    "/kakaopay/success",
    /^\/approvemembers\/.*$/
  ];
  const noHeaderRoutes = [/^\/category\/.*$/];
  const showHeaderFooter = !noHeaderFooterRoutes.some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );
  const showHeader = !noHeaderRoutes.some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );
  return (
    <html lang="ko" className={`${pretendard.variable} h-full`} suppressHydrationWarning>
      <body className="font-pretendard h-full">
        <ScreenSizeInitializer />
        <AuthProvider>
          <Providers>
            <div className="flex flex-col h-full bg-white">
              {showHeaderFooter && showHeader && <Header className="fixed top-0 w-full flex-shrink-0" />}
              <main
                className={`flex-1 overflow-y-auto scrollbar-hide ${
                  showHeaderFooter ? (showHeader ? "mt-[60px] mb-[60px]" : "mb-[60px]") : showHeader ? "" : ""
                }`}
              >
                {children}
              </main>
              {showHeaderFooter && <Footer className="fixed bottom-0 w-full mt-3  flex-shrink-0" />}
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
