import type { Metadata } from "next";
import "./globals.css";
import { Web3WalletProvider } from "@/components/WalletProvider";

export const metadata: Metadata = {
  title: "CookieAI Hub — Next-Gen cApp on Cookie Chain (SVM)",
  description:
    "AI Agent powered dApp built on Cookie Chain featuring Nightly Wallet support, sub-second finality, cookie-mcp integration, Cookieswap AMM, and real-time RPC analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-white min-h-screen">
        <Web3WalletProvider>{children}</Web3WalletProvider>
      </body>
    </html>
  );
}
