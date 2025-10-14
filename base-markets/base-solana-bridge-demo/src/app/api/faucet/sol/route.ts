import { NextRequest, NextResponse } from 'next/server';
import { cdpFaucet } from '../../../../lib/cdpFaucet';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    console.log('SOL faucet request for address:', address);

    // Check if CDP faucet is configured
    const isConfigured = await cdpFaucet.isConfigured();
    if (!isConfigured) {
      console.log('CDP not configured, returning mock response');
      
      // Return mock response if CDP not configured
      return NextResponse.json({
        success: true,
        transactionHash: 'mock_sol_faucet_' + Date.now(),
        amount: 0.00125,
        network: 'solana-devnet',
        token: 'SOL',
        explorerUrl: `https://explorer.solana.com/tx/mock_sol_faucet_${Date.now()}?cluster=devnet`,
        note: 'Mock SOL faucet - CDP not configured. Add your CDP credentials to .env.local'
      });
    }

    // Use real CDP faucet for SOL
    console.log('Using real CDP SOL faucet...');
    const result = await cdpFaucet.requestSol(address);

    return NextResponse.json({
      success: true,
      transactionHash: result.transactionHash,
      amount: result.amount,
      network: 'solana-devnet',
      token: 'SOL',
      explorerUrl: `https://explorer.solana.com/tx/${result.transactionHash}?cluster=devnet`
    });

  } catch (error) {
    console.error('SOL Faucet API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
