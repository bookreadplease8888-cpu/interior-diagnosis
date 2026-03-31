import type { Metadata } from "next";
import "@/app/globals.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "あなたの部屋タイプ診断｜おすすめインテリア＆家具も提案",
  description: "10問であなたに合う部屋タイプを診断。北欧・ホテルライク・韓国風などのインテリアと、予算内で揃うおすすめ家具を提案します。",
  openGraph: {
    title: "あなたの部屋タイプ診断｜おすすめインテリア＆家具も提案",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "部屋タイプ診断" }],
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "あなたの部屋タイプ診断｜おすすめインテリア＆家具も提案",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
