import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "神的菜单｜早餐转盘",
  description: "转动早餐转盘，让神的菜单替你决定今天吃什么。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
