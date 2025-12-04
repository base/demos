/**
 * Input Validation Utilities
 * 
 * Validates and sanitizes inputs for all API routes
 */

import { ethers } from 'ethers';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * Validate Ethereum address
 */
export function validateAddress(address: unknown, fieldName: string = 'address'): string {
    if (typeof address !== 'string') {
        throw new ValidationError(`${fieldName} must be a string`);
    }

    if (!ethers.isAddress(address)) {
        throw new ValidationError(`${fieldName} is not a valid Ethereum address`);
    }

    return address;
}

/**
 * Validate transaction hash
 */
export function validateTxHash(hash: unknown, fieldName: string = 'txHash'): string {
    if (typeof hash !== 'string') {
        throw new ValidationError(`${fieldName} must be a string`);
    }

    if (!/^0x[a-fA-F0-9]{64}$/.test(hash)) {
        throw new ValidationError(`${fieldName} is not a valid transaction hash`);
    }

    return hash;
}

/**
 * Validate positive integer
 */
export function validatePositiveInt(value: unknown, fieldName: string = 'value'): number {
    const num = Number(value);

    if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
        throw new ValidationError(`${fieldName} must be a positive integer`);
    }

    return num;
}

/**
 * Validate string length
 */
export function validateStringLength(
    str: unknown,
    minLength: number,
    maxLength: number,
    fieldName: string = 'string'
): string {
    if (typeof str !== 'string') {
        throw new ValidationError(`${fieldName} must be a string`);
    }

    if (str.length < minLength || str.length > maxLength) {
        throw new ValidationError(
            `${fieldName} length must be between ${minLength} and ${maxLength} characters`
        );
    }

    return str;
}

/**
 * Sanitize string (prevent XSS)
 */
export function sanitizeString(str: string): string {
    return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validate request body schema
 */
export function validateRequestBody<T>(
    body: unknown,
    requiredFields: string[]
): T {
    if (!body || typeof body !== 'object') {
        throw new ValidationError('Request body must be an object');
    }

    const bodyObj = body as Record<string, unknown>;

    for (const field of requiredFields) {
        if (!(field in bodyObj) || bodyObj[field] === null || bodyObj[field] === undefined) {
            throw new ValidationError(`Missing required field: ${field}`);
        }
    }

    return body as T;
}

/**
 * Validate season number
 */
export function validateSeasonNumber(season: unknown): number {
    const num = Number(season);

    if (isNaN(num) || !Number.isInteger(num) || num < 1 || num > 1000) {
        throw new ValidationError('Season number must be between 1 and 1000');
    }

    return num;
}

/**
 * Validate rank
 */
export function validateRank(rank: unknown): number {
    const num = Number(rank);

    if (isNaN(num) || !Number.isInteger(num) || num < 1 || num > 500) {
        throw new ValidationError('Rank must be between 1 and 500');
    }

    return num;
}
