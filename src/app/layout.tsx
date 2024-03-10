import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "kTools",
  description: "A collection of web3 tools to make your life easier.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}
