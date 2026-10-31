import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pocket money pot",
  description: "A little dashboard for pocket money, planned earnings, and savings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
