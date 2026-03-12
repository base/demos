/**
 * Retry utility for handling failed operations with exponential backoff
 */

export interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
}

export interface RetryResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
  attempts: number;
}

/**
 * Retries an async operation with exponential backoff
 * @param operation The async operation to retry
 * @param options Retry configuration options
 * @returns Promise with retry result
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<RetryResult<T>> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2
  } = options;

  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const data = await operation();
      return {
        success: true,
        data,
        attempts: attempt
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on the last attempt
      if (attempt === maxAttempts) {
        break;
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(
        baseDelay * Math.pow(backoffMultiplier, attempt - 1),
        maxDelay
      );
      
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`, lastError.message);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return {
    success: false,
    error: lastError!,
    attempts: maxAttempts
  };
}

/**
 * Determines if an error is retryable based on common patterns
 * @param error The error to check
 * @returns True if the error should trigger a retry
 */
export function isRetryableError(error: Error): boolean {
  const retryablePatterns = [
    /network/i,
    /timeout/i,
    /connection/i,
    /rate limit/i,
    /temporary/i,
    /server error/i,
    /502/i,
    /503/i,
    /504/i
  ];
  
  const errorMessage = error.message.toLowerCase();
  return retryablePatterns.some(pattern => pattern.test(errorMessage));
}
