import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers/queryProvider";
import { AuthProvider } from "@/store/AuthContext";
import { Footer, Header } from "@/components/layout";
import { Metadata } from "next";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
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
  },
   viewport: {
     width: 'device-width',
     initialScale: 1,
     maximumScale: 1
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
              <Header>{children}</Header>
              <Footer />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
