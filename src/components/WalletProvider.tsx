"use client";

import React, { useMemo } from "react";
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter, NightlyWalletAdapter } from "@solana/wallet-adapter-wallets";
import { COOKIE_CHAIN_RPC } from "@/lib/cookie-chain";

// Solana Wallet Adapter UI styles
import "@solana/wallet-adapter-react-ui/styles.css";

export function Web3WalletProvider({ children }: { children: React.ReactNode }) {
  // Cookie Chain RPC Connection Endpoint
  const endpoint = useMemo(() => COOKIE_CHAIN_RPC, []);

  // Supported Wallets (Nightly Wallet is explicitly required for Cookie Chain bounty!)
  const wallets = useMemo(
    () => [
      new NightlyWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
