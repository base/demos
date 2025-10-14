'use client';

import { MainContent } from '../components/MainContent';
import { WalletConnection } from '../components/WalletConnection';
import { CompactBalance } from '../components/CompactBalance';
import { PixelatedBridgeLogo } from '../components/PixelatedBridgeLogo';

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 py-6 relative z-10">
        
        {/* Top Bar - Tagline, Balance and Wallet */}
        <div className="flex justify-between items-center mb-8">
          {/* Top-left tagline */}
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2" style={{ backgroundColor: '#0000FF', boxShadow: '0 0 5px #0000FF' }}></div>
            <p className="text-blue-400 font-bold text-[16px] italic">
              Base is a bridge, not an island
            </p>
          </div>
          
          {/* Top-right controls */}
          <div className="flex items-center space-x-3">
            <CompactBalance />
            <WalletConnection />
          </div>
        </div>

        {/* Pixelated Bridge Logo */}
        <PixelatedBridgeLogo />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="hacker-title text-4xl mb-3" style={{ textTransform: 'none' }}>
            sol2base
          </h1>
          <p className="white-text text-sm max-w-2xl mx-auto mb-4">
            Bridge SOL from <span className="text-pink-400">Solana Devnet</span> to <span className="text-blue-400">Base Sepolia</span> using the{' '}
            <a 
              href="https://github.com/base/bridge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              new Base/Solana bridge
            </a>
          </p>
        </div>

        {/* Main Content */}
        <MainContent />

      </div>
    </div>
  );
}
