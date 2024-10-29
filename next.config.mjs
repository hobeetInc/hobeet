import withPWA from "next-pwa";
import withPWA from "next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "snijffzocojzjfoiqjyt.supabase.co",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**"
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        port: "",
        pathname: "/dn/**"
      }
    ]
  }
};

// PWA 설정
const buildConfig = withPWA({
  dest: "public",
  mode: "production",
  disable: process.env.NODE_ENV === "development"
})(nextConfig);

export default buildConfig;
