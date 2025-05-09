import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/wagmiProvider";
import getConfig from "next/config";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Onchain Riddle",
  description: "Riddle Game",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zama`}
      >
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
