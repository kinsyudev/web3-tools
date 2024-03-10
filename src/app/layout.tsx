import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { BackgroundBeams } from "~/components/ui/background-beams";
import Header from "~/components/header";
import { Toaster } from "~/components/ui/toaster";
import banner from "~/media/ktools.png";
import { siteConfig } from "~/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "kTools",
  description: "A collection of web3 tools to make your life easier.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    url: siteConfig.url,
    type: "website",
    images: {
      url: banner.src,
      type: "image/png",
      width: banner.width,
      height: banner.height,
      alt: siteConfig.shortName,
    },
    siteName: siteConfig.name,
    title: siteConfig.shortName,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kinsyudev",
    description: siteConfig.description,
    title: siteConfig.shortName,
    images: {
      url: banner.src,
      alt: siteConfig.shortName,
      width: banner.width,
      height: banner.height,
    },
    site: siteConfig.url,
  },
  creator: "@kinsyudev",
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <div className="z-10 grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] items-center justify-start gap-4 px-4 py-8 text-black">
          <Header />
          {children}
        </div>
        <BackgroundBeams />
        <Toaster />
      </body>
    </html>
  );
}
