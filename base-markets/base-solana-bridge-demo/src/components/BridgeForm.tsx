'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { BRIDGE_CONFIG } from '../lib/constants';
import { addressResolver } from '../lib/addressResolver';

interface BridgeFormProps {
  onBridge: (amount: number, destinationAddress: string) => Promise<void>;
  maxAmount: number;
  isLoading: boolean;
  disabled: boolean;
  tokenSymbol?: string;
}

export const BridgeForm: React.FC<BridgeFormProps> = ({
  onBridge,
  maxAmount,
  isLoading,
  disabled,
  tokenSymbol = "SOL"
}) => {
  const [amount, setAmount] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [resolvedAddress, setResolvedAddress] = useState<string>('');
  const [addressType, setAddressType] = useState<string>('');
  const [isResolvingAddress, setIsResolvingAddress] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ amount?: string; address?: string }>({});

  const minAmount = BRIDGE_CONFIG.minBridgeAmount / Math.pow(10, 9); // Convert to SOL (9 decimals)

  // Debounced address resolution with improved validation
  const resolveAddress = useCallback(
    async (address: string, abortSignal?: AbortSignal) => {
      if (!address.trim()) {
        setResolvedAddress('');
        setAddressType('');
        return;
      }

      // Only resolve if the input looks complete
      const trimmed = address.trim();
      const isCompleteInput = 
        addressResolver.isValidInput(trimmed) && (
          /^0x[a-fA-F0-9]{40}$/.test(trimmed) || // Valid Ethereum address
          trimmed.endsWith('.eth') || // Complete ENS name
          trimmed.endsWith('.base') || // Complete basename
          trimmed.endsWith('.base.eth') // Complete basename with .eth
        );

      if (!isCompleteInput) {
        // Don't resolve incomplete inputs, but show the type if recognizable
        const type = addressResolver.getInputType(address);
        setAddressType(type !== 'Unknown' ? `${type} (incomplete)` : '');
        setResolvedAddress('');
        setIsResolvingAddress(false);
        return;
      }

      setIsResolvingAddress(true);
      setErrors(prev => ({ ...prev, address: undefined }));

      try {
        // Check if request was aborted
        if (abortSignal?.aborted) {
          return;
        }

        const type = addressResolver.getInputType(address);
        setAddressType(type);

        if (type === 'Ethereum Address') {
          setResolvedAddress(address);
        } else {
          const resolved = await addressResolver.resolveAddress(address);
          
          // Check again if request was aborted after resolution
          if (abortSignal?.aborted) {
            return;
          }
          
          setResolvedAddress(resolved);
        }
      } catch (error) {
        // Don't show errors if request was aborted
        if (abortSignal?.aborted) {
          return;
        }
        
        console.error('Address resolution failed:', error);
        setErrors(prev => ({ 
          ...prev, 
          address: error instanceof Error ? error.message : 'Failed to resolve address'
        }));
        setResolvedAddress('');
      } finally {
        if (!abortSignal?.aborted) {
          setIsResolvingAddress(false);
        }
      }
    },
    []
  );

  // Debounce address resolution with abort controller
  useEffect(() => {
    const abortController = new AbortController();
    
    const timer = setTimeout(() => {
      if (destinationAddress.trim()) {
        resolveAddress(destinationAddress.trim(), abortController.signal);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [destinationAddress, resolveAddress]);

  const validateForm = (): boolean => {
    const newErrors: { amount?: string; address?: string } = {};
    
    // Validate amount
    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum)) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (amountNum <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (maxAmount > 0 && amountNum > maxAmount) {
      newErrors.amount = `Insufficient balance. Max: ${maxAmount.toFixed(6)} ${tokenSymbol}`;
    }

    // Validate destination address
    if (!destinationAddress.trim()) {
      newErrors.address = 'Please enter a destination address';
    } else if (isResolvingAddress) {
      newErrors.address = 'Resolving address...';
    } else {
      const trimmed = destinationAddress.trim();
      const isCompleteInput = 
        /^0x[a-fA-F0-9]{40}$/.test(trimmed) || // Valid Ethereum address
        trimmed.endsWith('.eth') || // Complete ENS name
        trimmed.endsWith('.base') || // Complete basename
        trimmed.endsWith('.base.eth'); // Complete basename with .eth
      
      if (isCompleteInput && !resolvedAddress) {
        newErrors.address = 'Could not resolve address. Please check the format.';
      } else if (!isCompleteInput && !addressType.includes('incomplete')) {
        newErrors.address = 'Please enter a complete address, ENS name (.eth), or basename (.base)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const amountNum = parseFloat(amount);
    await onBridge(amountNum, destinationAddress.trim());
    
    // Clear form on success
    setAmount('');
    setDestinationAddress('');
    setErrors({});
  };

  const handleMaxClick = () => {
    if (maxAmount > 0) {
      setAmount(maxAmount.toFixed(2));
      setErrors(prev => ({ ...prev, amount: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Amount Input */}
      <div>
        <label className="block text-sm font-medium hacker-text mb-2">
          Amount ({tokenSymbol})
        </label>
        <div className="relative">
                  <input
                    type="number"
                    step="0.000001"
                    min="0"
                    max={maxAmount > 0 ? maxAmount : undefined}
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setErrors(prev => ({ ...prev, amount: undefined }));
                    }}
                    className={`w-full px-3 py-2 pr-16 hacker-input ${
                      errors.amount 
                        ? 'border-red-500' 
                        : ''
                    }`}
                    placeholder={`Enter ${tokenSymbol} amount`}
                    disabled={disabled || isLoading}
                  />
          <button
            type="button"
            onClick={handleMaxClick}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-white text-sm font-mono font-bold"
            disabled={disabled || isLoading}
          >
            [MAX]
          </button>
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
        )}
      </div>

      {/* Destination Address Input */}
      <div>
        <label className="block text-sm font-medium hacker-text mb-2">
          Base Sepolia Address
        </label>
        <div className="relative">
          <input
            type="text"
            value={destinationAddress}
            onChange={(e) => {
              setDestinationAddress(e.target.value);
              setErrors(prev => ({ ...prev, address: undefined }));
              setResolvedAddress('');
              setAddressType('');
            }}
            className={`w-full px-3 py-2 pr-10 hacker-input ${
              errors.address 
                ? 'border-red-500' 
                : resolvedAddress && resolvedAddress !== destinationAddress
                ? 'border-green-500'
                : ''
            }`}
            placeholder="0x..., Basename, or ENS"
            disabled={disabled || isLoading}
          />
          {isResolvingAddress && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="animate-spin h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
        
        {/* Address Resolution Display */}
        {resolvedAddress && resolvedAddress !== destinationAddress && (
          <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-green-700 dark:text-green-300">
                {addressType} resolved
              </span>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-mono">
              {resolvedAddress}
            </p>
          </div>
        )}
        
        {errors.address && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
        )}
      </div>


      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled || isLoading || !amount || !destinationAddress || isResolvingAddress || (!resolvedAddress && addressType !== 'Ethereum Address')}
        className="w-full hacker-button py-3 px-4 font-mono text-sm flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Bridging...
          </>
        ) : (
          <>
            Bridge to Base
          </>
        )}
      </button>
    </form>
  );
};
