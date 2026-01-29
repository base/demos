"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { lightTheme } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { base } from "thirdweb/chains";
import { client } from "@/lib/client";

// Dynamic import ConnectButton to avoid SSR hydration issues
const ConnectButton = dynamic(
  () => import("thirdweb/react").then((mod) => mod.ConnectButton),
  { ssr: false }
);

// Configure wallets
const emailWallet = inAppWallet({
  auth: {
    options: ["email"],
  },
});

const baseAccountWallet = createWallet("org.base.account");

// Wallets array for the connect modal
const wallets = [emailWallet, baseAccountWallet];

// Recommended wallets shown at top level
const recommendedWallets = [baseAccountWallet];

// Custom theme for the connect button and modals
const customTheme = lightTheme({
  colors: {
    modalBg: "#FFFFFF",
    primaryText: "#110F2A",
    secondaryText: "#64748b",
    accentText: "#0052FF",
    primaryButtonBg: "#0052FF",
    primaryButtonText: "#FFFFFF",
    connectedButtonBg: "#FFFFFF",
    connectedButtonBgHover: "#F8FAFC",
    borderColor: "#E2E8F0",
    separatorLine: "#E2E8F0",
    skeletonBg: "#E2E8F0",
    selectedTextBg: "#EFF6FF",
    selectedTextColor: "#0052FF",
    secondaryButtonBg: "#F1F5F9",
    secondaryButtonHoverBg: "#E2E8F0",
    secondaryButtonText: "#110F2A",
    secondaryIconColor: "#64748b",
    secondaryIconHoverBg: "#F1F5F9",
    secondaryIconHoverColor: "#110F2A",
    tertiaryBg: "#F8FAFC",
    tooltipBg: "#110F2A",
    tooltipText: "#FFFFFF",
    inputAutofillBg: "#F8FAFC",
    scrollbarBg: "#E2E8F0",
    danger: "#EF4444",
    success: "#22C55E",
  },
});

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background */}
      <Image
        src="/BG.svg"
        alt="Background"
        fill
        style={{ objectFit: "cover", zIndex: 0 }}
        priority
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Badge */}
        <div className="flex h-10 items-center justify-center rounded-full border border-white/30 px-6 text-lg text-white backdrop-blur-sm">
          <Image
            src="/base-logo-white.svg"
            alt="Base"
            width={60}
            height={15}
            className="mr-2"
          />
          <span className="text-white/50 mx-3">×</span>
          <Image
            src="/thirdweb-logo-white.svg"
            alt="Thirdweb"
            width={100}
            height={16}
          />
        </div>

        {/* Title */}
        <h1 className="text-center mt-6 text-white text-5xl md:text-7xl font-medium leading-tight">
          Build on Base
        </h1>

        {/* Subtitle */}
        <p className="text-center text-white/80 text-lg md:text-xl mt-6 max-w-xl">
          Get started building on Base with Thirdweb&apos;s authentication and native Base Account support
        </p>

        {/* Connect Button */}
        <div className="mt-10">
          <ConnectButton
            client={client}
            wallets={wallets}
            recommendedWallets={recommendedWallets}
            chain={base}
            showAllWallets={false}
            theme={customTheme}
            connectButton={{
              label: "Sign In",
              style: {
                backgroundColor: "white",
                color: "#110F2A",
                padding: "16px 48px",
                borderRadius: "9999px",
                fontSize: "18px",
                fontWeight: "500",
                minWidth: "200px",
                border: "none",
                cursor: "pointer",
              },
            }}
            connectModal={{
              title: "Sign In",
              size: "compact",
            }}
            detailsButton={{
              style: {
                backgroundColor: "white",
                color: "#110F2A",
                padding: "12px 24px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontWeight: "500",
                border: "none",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
