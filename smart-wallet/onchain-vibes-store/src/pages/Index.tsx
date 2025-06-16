import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getConfig } from '@/lib/wagmi';
import CheckoutButton from '@/components/CheckoutButton';
import { Sparkles, Zap, Star, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const queryClient = new QueryClient();
const config = getConfig();

const Index = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-pink rounded-full opacity-20 animate-pulse-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-blue rounded-full opacity-20 animate-pulse-slow animation-delay-1000"></div>
          </div>

          {/* Header */}
          <header className="relative z-10 p-6 text-center border-b border-border">
            <h1 
              className="pixel-font text-4xl md:text-6xl lg:text-8xl font-bold mb-4 glitch-text text-primary"
              data-text="VIBES STORE"
            >
              VIBES STORE
            </h1>
            <p className="pixel-font text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              &gt; ONCHAIN MARKETPLACE FOR ONCHAIN VIBES
              <br />
              &gt; POWERED BY BASE SEPOLIA + SMART WALLET PROFILES
            </p>
          </header>

          {/* Main Content */}
          <main className="relative z-10 container mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              
              {/* Product Showcase */}
              <div className="space-y-8">
                <Card className="neon-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      {/* Product Image Placeholder */}
                      <div className="relative">
                        <div className="w-64 h-64 mx-auto bg-gradient-to-br from-neon-pink via-neon-blue to-neon-cyan rounded-lg neon-border flex items-center justify-center">
                          <div className="text-6xl animate-pulse-slow">
                            ✨
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded pixel-font text-xs">
                          NEW!
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-4">
                        <h2 className="pixel-font text-3xl text-primary">ONCHAIN VIBES</h2>
                        <p className="text-muted-foreground leading-relaxed">
                          Premium quality vibes, minted onchain. Each purchase includes:
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="h-4 w-4 text-neon-yellow" />
                            <span>Authentic vibes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-neon-cyan" />
                            <span>Instant delivery</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-neon-pink" />
                            <span>Premium quality</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Heart className="h-4 w-4 text-neon-green" />
                            <span>Good vibes only</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <div className="pixel-font text-2xl text-accent">
                            0.01 USDC
                          </div>
                          <div className="text-xs text-muted-foreground">
                            + gas fees
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card className="neon-border bg-card/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="pixel-font text-lg mb-4 text-center">Why Buy Onchain Vibes?</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-3">
                        <span className="text-accent pixel-font">&gt;</span>
                        <span>100% authentic onchain vibes, verified on Base</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-accent pixel-font">&gt;</span>
                        <span>Smart wallet profiles for seamless payments</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-accent pixel-font">&gt;</span>
                        <span>Secure profile data collection for delivery</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-accent pixel-font">&gt;</span>
                        <span>Powered by Coinbase Smart Wallet + Base</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* One-Click Purchase Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="pixel-font text-2xl mb-4 text-primary">ONE-CLICK ONCHAIN VIBES</h3>
                  <p className="text-muted-foreground mb-8">
                    Buy instantly with your smart wallet - no connection required!
                  </p>
                </div>
                
                <CheckoutButton />
              </div>

            </div>
          </main>

          {/* Footer */}
          <footer className="relative z-10 border-t border-border mt-20 p-6">
            <div className="text-center pixel-font text-xs text-muted-foreground">
              <p>&gt; BUILT WITH WAGMI + BASE + COINBASE SMART WALLET PROFILES</p>
              <p>&gt; VIBES STORE 2024 - BRINGING GOOD ONCHAIN VIBES</p>
            </div>
          </footer>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Index;
