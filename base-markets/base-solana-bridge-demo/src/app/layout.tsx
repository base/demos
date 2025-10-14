import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SolanaWalletProvider } from "../components/WalletProvider";
import { NotificationManager } from "../components/NotificationToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "sol2base - Solana to Base Bridge",
  description: "Bridge SOL from Solana Devnet to Base Sepolia using the official Base/Solana bridge. Hacker-themed UI with real cross-chain functionality.",
  icons: {
    icon: '/bridge-icon.svg',
    shortcut: '/bridge-icon.svg',
    apple: '/bridge-icon.svg',
  },
  openGraph: {
    title: "sol2base - Solana to Base Bridge",
    description: "Bridge SOL from Solana Devnet to Base Sepolia",
    url: "https://sol2base.xyz",
    siteName: "sol2base",
    images: [
      {
        url: "/assets/sol2base.png",
        width: 800,
        height: 600,
        alt: "sol2base Bridge"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "sol2base - Solana to Base Bridge",
    description: "Bridge SOL from Solana Devnet to Base Sepolia",
    images: ["/assets/sol2base.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationManager>
          <SolanaWalletProvider>
            {children}
          </SolanaWalletProvider>
        </NotificationManager>
      </body>
    </html>
  );
}
