"use client";

import { useAuthStore } from "./store/authStore";

export default function Home() {
  const { user_name } = useAuthStore();
  return <div>홈 입니다.{user_name}</div>;
}
