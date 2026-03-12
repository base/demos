'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BasePayButton } from '@base-org/account-ui/react';
import { pay } from '@base-org/account';
import { retryOperation, isRetryableError } from '@/lib/retry';

interface ProductInfo {
  asin: string;
  price: number;
  title: string;
}

interface UserData {
  email?: string;
  phone?: {
    number: string;
    countryCode: string;
  };
  address?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    name: {
      firstName: string;
      familyName: string;
    };
  };
  name?: {
    firstName: string;
    lastName: string;
  };
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);

  useEffect(() => {
    const asin = searchParams.get('asin');
    const price = searchParams.get('price');
    const title = searchParams.get('title');
    const paymentSuccess = searchParams.get('payment_success');

    if (asin && price && title) {
      setProduct({
        asin,
        price: parseFloat(price),
        title: decodeURIComponent(title)
      });
    }

  }, [searchParams]);

  const handlePayment = async () => {
    if (!product) {
      alert('Product information not available');
      return;
    }

    setLoading(true);
    setRetryCount(0);
    setRetryMessage(null);
    
    const paymentConfig = {
      amount: product.price.toString(),
      to: '0x0B14a7aE11B1651aF832DBC282dD1E020E893c4d',
      payerInfo: {
        requests: [
          { type: 'physicalAddress', required: true },
          { type: 'email', required: false },
          { type: 'phoneNumber', required: false },
          { type: 'name', required: false }
        ]
      },
      testnet: true
    };

    const retryResult = await retryOperation(
      async () => {
        console.log('Starting payment with product:', product);
        console.log('Payment amount:', product.price.toString());
        console.log('Payment config:', paymentConfig);
        
        const payment = await pay(paymentConfig);
        console.log('Payment successful:', payment);
        
        // Extract user data from payment.payerInfoResponses
        if (payment?.payerInfoResponses) {
          const responses = payment.payerInfoResponses;
          const userData = {
            email: responses.email,
            phone: responses.phoneNumber ? {
              number: responses.phoneNumber.number,
              countryCode: responses.phoneNumber.country
            } : undefined,
            address: responses.physicalAddress ? {
              address1: responses.physicalAddress.address1,
              address2: responses.physicalAddress.address2,
              city: responses.physicalAddress.city,
              state: responses.physicalAddress.state,
              postalCode: responses.physicalAddress.postalCode,
              country: responses.physicalAddress.countryCode,
              name: {
                firstName: responses.physicalAddress.name?.firstName || responses.name?.firstName || '',
                familyName: responses.physicalAddress.name?.familyName || responses.name?.familyName || ''
              }
            } : undefined,
            name: responses.name ? {
              firstName: responses.name.firstName,
              lastName: responses.name.familyName
            } : undefined
          };
          
          console.log('Extracted user data:', userData);
          setUserData(userData);
          setShowConfirmation(true);
        } else {
          console.log('No payerInfoResponses found in payment response');
        }
        
        setPaymentComplete(true);
        return payment;
      },
      {
        maxAttempts: 3,
        baseDelay: 2000,
        maxDelay: 8000,
        backoffMultiplier: 2
      }
    );

    if (retryResult.success) {
      console.log(`Payment succeeded after ${retryResult.attempts} attempt(s)`);
    } else {
      const error = retryResult.error!;
      const errorMessage = error?.message || error?.toString() || 'Unknown error occurred';
      
      console.error('Payment failed after all retries:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', error ? Object.keys(error) : 'No error object');
      
      // Check if error is retryable for user feedback
      if (isRetryableError(error)) {
        setRetryMessage(`Payment failed after ${retryResult.attempts} attempts. This appears to be a temporary issue. Please try again.`);
      } else {
        setRetryMessage(`Payment failed: ${errorMessage}`);
      }
      
      alert('Payment failed: ' + errorMessage);
    }
    
    setLoading(false);
  };

  const handleConfirmPurchase = async () => {
    if (!product || !userData) return;

    setLoading(true);
    setRetryMessage(null);

    const retryResult = await retryOperation(
      async () => {
        const response = await fetch('/api/crossmint-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            asin: product.asin,
            price: product.price,
            title: product.title,
            userData: userData,
            payerAddress: '0x0B14a7aE11B1651aF832DBC282dD1E020E893c4d'
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Order creation failed: ${errorData.error || 'Unknown error'}`);
        }

        const result = await response.json();
        console.log('Order created:', result);
        
        setShowConfirmation(false);
        setOrderComplete(true);
        setOrderResult(result);
        
        return result;
      },
      {
        maxAttempts: 3,
        baseDelay: 1500,
        maxDelay: 6000,
        backoffMultiplier: 2
      }
    );

    if (retryResult.success) {
      console.log(`Order creation succeeded after ${retryResult.attempts} attempt(s)`);
    } else {
      const error = retryResult.error!;
      console.error('Order creation failed after all retries:', error);
      
      // Check if error is retryable for user feedback
      if (isRetryableError(error)) {
        setRetryMessage(`Order creation failed after ${retryResult.attempts} attempts. This appears to be a temporary issue. Please try again.`);
      } else {
        setRetryMessage(`Order failed: ${error.message}`);
      }
      
      alert('Order failed: ' + error.message);
    }
    
    setLoading(false);
  };

  if (orderComplete && orderResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Your Amazon order has been processed and paid for using Base Pay.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Details</h2>
              <p className="text-gray-700 mb-2"><strong>Order ID:</strong> {orderResult.orderId}</p>
              <p className="text-gray-700 mb-2"><strong>Product:</strong> {product?.title}</p>
              <p className="text-gray-700"><strong>Price:</strong> ${product?.price}</p>
            </div>
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">What happens next?</h3>
              <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
                <li>• You will receive a confirmation email shortly</li>
                <li>• Amazon will process and ship your order</li>
                <li>• Tracking information will be provided via email</li>
                <li>• Estimated delivery: 3-5 business days</li>
              </ul>
            </div>
            <button
              onClick={() => window.close()}
              className="mt-8 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Please wait while we load your product information.</p>
        </div>
      </div>
    );
  }

  if (showConfirmation && userData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Confirm Your Purchase</h1>
            
            <div className="border-b pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg">{product.title}</h3>
                <p className="text-gray-600">ASIN: {product.asin}</p>
                <p className="text-2xl font-bold text-green-600">${product.price}</p>
              </div>
            </div>

            <div className="border-b pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              {userData.name && (
                <p className="font-medium">{userData.name.firstName} {userData.name.lastName}</p>
              )}
              {userData.email && (
                <p className="text-gray-600">{userData.email}</p>
              )}
              {userData.phone && (
                <p className="text-gray-600">+{userData.phone.countryCode} {userData.phone.number}</p>
              )}
              {userData.address && (
                <div className="mt-2 text-gray-600">
                  <p>{userData.address.address1}</p>
                  {userData.address.address2 && <p>{userData.address.address2}</p>}
                  <p>{userData.address.city}, {userData.address.state} {userData.address.postalCode}</p>
                  <p>{userData.address.country}</p>
                </div>
              )}
            </div>

            {retryMessage && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">{retryMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Back to Payment
              </button>
              <button
                onClick={handleConfirmPurchase}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-base-blue text-white rounded-lg hover:bg-base-blue-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Purchase'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout with Base Pay</h1>
          
          <div className="border-b pb-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg">{product.title}</h3>
              <p className="text-gray-600 mb-2">ASIN: {product.asin}</p>
              <p className="text-3xl font-bold text-green-600">${product.price}</p>
            </div>
          </div>

          {!paymentComplete && !userData && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <p className="text-gray-600 mb-6">
                  Complete your purchase securely with Base Pay. You'll be able to review your shipping information before finalizing the order.
                </p>
              </div>

              <div className="flex justify-center">
                <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
                  <BasePayButton
                    colorScheme="light"
                    onClick={handlePayment}
                  />
                </div>
              </div>
              
              {retryMessage && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800">{retryMessage}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {paymentComplete && !showConfirmation && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your payment has been processed successfully. Preparing your order confirmation...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}