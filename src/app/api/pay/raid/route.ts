import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const CARTEL_CORE_ADDRESS = process.env.NEXT_PUBLIC_CARTEL_CORE_ADDRESS;
const RPC_URL = process.env.BASE_RPC_URL || 'https://mainnet.base.org';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { raiderAddress, targetAddress, txHash } = body;

        // Validate required fields
        if (!raiderAddress || !ethers.isAddress(raiderAddress)) {
            return NextResponse.json(
                { error: 'Invalid raider address' },
                { status: 400 }
            );
        }

        if (!targetAddress || !ethers.isAddress(targetAddress)) {
            return NextResponse.json(
                { error: 'Invalid target address' },
                { status: 400 }
            );
        }

        // Payment metadata for Base Pay
        const paymentMetadata = {
            action: 'raid',
            raiderAddress,
            targetAddress,
            amount: '5000', // 0.005 USDC (6 decimals)
            currency: 'USDC',
            contractAddress: CARTEL_CORE_ADDRESS,
            timestamp: new Date().toISOString(),
        };

        // If txHash provided, verify payment was successful
        if (txHash) {
            const provider = new ethers.JsonRpcProvider(RPC_URL);
            const receipt = await provider.getTransactionReceipt(txHash);

            if (!receipt || receipt.status !== 1) {
                return NextResponse.json(
                    { error: 'Payment transaction failed or not found' },
                    { status: 400 }
                );
            }

            // Payment verified - return contract action details
            return NextResponse.json({
                success: true,
                message: 'Payment verified. Raid transaction can proceed.',
                metadata: paymentMetadata,
                contractAction: {
                    contract: CARTEL_CORE_ADDRESS,
                    function: 'raid',
                    args: [targetAddress],
                }
            });
        }

        // Return payment metadata for Base Pay UI
        return NextResponse.json({
            success: true,
            metadata: paymentMetadata,
            paymentUrl: '/api/pay/raid/confirm',
        });

    } catch (error) {
        console.error('[/api/pay/raid] Error:', error);
        return NextResponse.json(
            {
                error: 'Payment processing failed',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
