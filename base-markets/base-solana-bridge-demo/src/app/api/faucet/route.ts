import { NextRequest, NextResponse } from 'next/server';
import { cdpFaucet } from '../../../lib/cdpFaucet';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    console.log('Faucet request for address:', address);

    // Check if CDP faucet is configured
    const isConfigured = await cdpFaucet.isConfigured();
    if (!isConfigured) {
      console.log('CDP not configured, returning mock response');
      
      // Return mock response if CDP not configured
      return NextResponse.json({
        success: true,
        transactionHash: 'mock_tx_hash_' + Date.now(),
        amount: 1,
        network: 'solana-devnet',
        token: 'USDC',
        explorerUrl: `https://explorer.solana.com/tx/mock_tx_hash_${Date.now()}?cluster=devnet`,
        note: 'Mock faucet - CDP not configured. Add your CDP credentials to .env.local'
      });
    }

    // Use real CDP faucet
    console.log('Using real CDP faucet...');
    const result = await cdpFaucet.requestUsdc(address);

    return NextResponse.json({
      success: true,
      transactionHash: result.transactionHash,
      amount: result.amount,
      network: 'solana-devnet',
      token: 'USDC',
      explorerUrl: `https://explorer.solana.com/tx/${result.transactionHash}?cluster=devnet`
    });

  } catch (error) {
    console.error('Faucet API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const isConfigured = await cdpFaucet.isConfigured();
    const info = cdpFaucet.getFaucetInfo();

    return NextResponse.json({
      configured: isConfigured,
      ...info
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get faucet info' },
      { status: 500 }
    );
  }
}
