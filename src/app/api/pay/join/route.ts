import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { validateAddress, validateTxHash, ValidationError } from '@/lib/validation';

const CARTEL_CORE_ADDRESS = process.env.NEXT_PUBLIC_CARTEL_CORE_ADDRESS;
const RPC_URL = process.env.BASE_RPC_URL || 'https://mainnet.base.org';

export async function POST(request: Request) {
    try {
        // Apply rate limiting
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rateLimitResult = await rateLimit(RATE_LIMITS.payment)(request as any);
        if (rateLimitResult) {
            return rateLimitResult;
        }

        const body = await request.json();
        const { playerAddress, referrerAddress, txHash } = body;

        // Validate required fields
        if (!playerAddress) {
            return NextResponse.json(
                { error: 'Missing required field: playerAddress' },
                { status: 400 }
            );
        }

        // Validate addresses
        try {
            validateAddress(playerAddress, 'playerAddress');
            if (referrerAddress) {
                validateAddress(referrerAddress, 'referrerAddress');
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }
            throw error;
        }

        // Payment metadata for Base Pay
        const paymentMetadata = {
            action: 'join',
            playerAddress,
            referrerAddress: referrerAddress || ethers.ZeroAddress,
            amount: '10000', // 0.01 USDC (6 decimals)
            currency: 'USDC',
            contractAddress: CARTEL_CORE_ADDRESS,
            timestamp: new Date().toISOString(),
        };

        // If txHash provided, verify payment was successful
        if (txHash) {
            try {
                validateTxHash(txHash);
            } catch (error) {
                if (error instanceof ValidationError) {
                    return NextResponse.json({ error: error.message }, { status: 400 });
                }
                throw error;
            }

            const provider = new ethers.JsonRpcProvider(RPC_URL);
            const receipt = await provider.getTransactionReceipt(txHash);

            if (!receipt || receipt.status !== 1) {
                return NextResponse.json(
                    { error: 'Payment transaction failed or not found' },
                    { status: 400 }
                );
            }

            // Payment verified - now execute contract action
            // Note: In production, this would be triggered by a backend service
            // with proper key management, not directly from the API
            return NextResponse.json({
                success: true,
                message: 'Payment verified. Join transaction can proceed.',
                metadata: paymentMetadata,
                contractAction: {
                    contract: CARTEL_CORE_ADDRESS,
                    function: 'join',
                    args: [referrerAddress || ethers.ZeroAddress],
                }
            });
        }

        // Return payment metadata for Base Pay UI
        return NextResponse.json({
            success: true,
            metadata: paymentMetadata,
            paymentUrl: '/api/pay/join/confirm',
        });

    } catch (error) {
        console.error('[/api/pay/join] Error:', error);
        return NextResponse.json(
            {
                error: 'Payment processing failed',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
