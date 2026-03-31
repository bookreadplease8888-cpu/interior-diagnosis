import "./globals.css";

export const metadata = {
  title: "インテリア診断",
  description: "あなたに合う部屋スタイルを診断",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
