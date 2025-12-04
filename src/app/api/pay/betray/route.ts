import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const CARTEL_CORE_ADDRESS = process.env.NEXT_PUBLIC_CARTEL_CORE_ADDRESS;
const RPC_URL = process.env.BASE_RPC_URL || 'https://mainnet.base.org';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { traitorAddress, txHash } = body;

        // Validate required fields
        if (!traitorAddress || !ethers.isAddress(traitorAddress)) {
            return NextResponse.json(
                { error: 'Invalid traitor address' },
                { status: 400 }
            );
        }

        // Payment metadata for Base Pay
        // Note: Betrayal might not require a payment, or could have a penalty fee
        const paymentMetadata = {
            action: 'betray',
            traitorAddress,
            amount: '0', // No fee for betrayal in current design
            currency: 'USDC',
            contractAddress: CARTEL_CORE_ADDRESS,
            timestamp: new Date().toISOString(),
            warning: 'This action is irreversible and will burn all your shares',
        };

        // If txHash provided, verify transaction was successful
        if (txHash) {
            const provider = new ethers.JsonRpcProvider(RPC_URL);
            const receipt = await provider.getTransactionReceipt(txHash);

            if (!receipt || receipt.status !== 1) {
                return NextResponse.json(
                    { error: 'Transaction failed or not found' },
                    { status: 400 }
                );
            }

            // Transaction verified - return contract action details
            return NextResponse.json({
                success: true,
                message: 'Betrayal transaction can proceed.',
                metadata: paymentMetadata,
                contractAction: {
                    contract: CARTEL_CORE_ADDRESS,
                    function: 'betray',
                    args: [],
                }
            });
        }

        // Return metadata for confirmation UI
        return NextResponse.json({
            success: true,
            metadata: paymentMetadata,
            requiresConfirmation: true,
        });

    } catch (error) {
        console.error('[/api/pay/betray] Error:', error);
        return NextResponse.json(
            {
                error: 'Processing failed',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
