import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import CartelCoreABI from '@/lib/abi/CartelCore.json';
import { CARTEL_CORE_ADDRESS } from '@/lib/basePay';
import { Button } from '@/components/ui/button';

interface GaslessTransactionProps {
    action: 'join' | 'raid';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any[];
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function GaslessTransaction({ action, args, onSuccess, onError }: GaslessTransactionProps) {
    const [usePaymaster, setUsePaymaster] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        writeContract,
        data: hash,
        error: writeError,
        isPending: isWritePending
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed
    } = useWaitForTransactionReceipt({ hash });

    const handleTransaction = async () => {
        try {
            setErrorMessage(null);

            // Attempt with paymaster first
            if (usePaymaster) {
                try {
                    await writeContract({
                        address: CARTEL_CORE_ADDRESS as `0x${string}`,
                        abi: CartelCoreABI,
                        functionName: action,
                        args: args,
                        // Paymaster will be used automatically if configured in WagmiProvider
                    });
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (paymasterError: any) {
                    console.error('[Paymaster] Failed:', paymasterError);

                    // Check if paymaster-specific error
                    if (paymasterError?.message?.includes('paymaster') ||
                        paymasterError?.message?.includes('sponsor')) {
                        setErrorMessage('Gasless transaction unavailable. Fallback to regular transaction?');
                        setUsePaymaster(false);
                        return; // Wait for user to retry
                    }

                    throw paymasterError; // Other errors
                }
            } else {
                // Fallback: regular transaction (user pays gas)
                await writeContract({
                    address: CARTEL_CORE_ADDRESS as `0x${string}`,
                    abi: CartelCoreABI,
                    functionName: action,
                    args: args,
                });
            }

            if (isConfirmed && onSuccess) {
                onSuccess();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('[Transaction] Failed:', error);
            setErrorMessage(error?.message || 'Transaction failed');
            if (onError) {
                onError(error);
            }
        }
    };

    return (
        <div className="space-y-4">
            {errorMessage && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-900 text-sm font-medium">⚠️ {errorMessage}</p>
                    {!usePaymaster && (
                        <p className="text-yellow-700 text-xs mt-2">
                            You will need to pay gas fees for this transaction.
                        </p>
                    )}
                </div>
            )}

            <Button
                onClick={handleTransaction}
                disabled={isWritePending || isConfirming}
                className="w-full"
            >
                {isWritePending && 'Preparing...'}
                {isConfirming && 'Confirming...'}
                {!isWritePending && !isConfirming && (
                    <>
                        {usePaymaster ? '⚡ Gasless ' : '💳 '}{action === 'join' ? 'Join' : 'Raid'}
                    </>
                )}
            </Button>

            {usePaymaster && !errorMessage && (
                <p className="text-xs text-zinc-500 text-center">
                    ✨ Gas fees sponsored by Paymaster
                </p>
            )}

            {writeError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-900 text-sm">Transaction failed. Please try again.</p>
                    <p className="text-red-700 text-xs mt-1">{writeError.message}</p>
                </div>
            )}
        </div>
    );
}
