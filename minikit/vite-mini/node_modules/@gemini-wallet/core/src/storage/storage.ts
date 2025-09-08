import { safeJsonStringify } from "../utils";
import {
  type IStorage,
  STORAGE_ETH_ACCOUNTS_KEY,
  STORAGE_ETH_ACTIVE_CHAIN_KEY,
  STORAGE_PASSKEY_CREDENTIAL_KEY,
  STORAGE_SETTINGS_KEY,
  STORAGE_SMART_ACCOUNT_KEY,
} from "./storageInterface";

// Memory fallback storage for environments without localStorage
const memoryStorage: Record<string, string> = {};

// Export storage keys from interface for backward compatibility
export {
  STORAGE_ETH_ACCOUNTS_KEY,
  STORAGE_ETH_ACTIVE_CHAIN_KEY,
  STORAGE_PASSKEY_CREDENTIAL_KEY,
  STORAGE_SETTINGS_KEY,
  STORAGE_SMART_ACCOUNT_KEY,
};

/**
 * Default web storage implementation using localStorage
 * For mobile platforms, implement a custom storage class that implements IStorage
 */
export class GeminiStorage implements IStorage {
  private readonly scope = "@gemini";
  private readonly module = "wallet";

  private scopedKey(key: string): string {
    return `${this.scope}.${this.module}.${key}`;
  }

  public async storeObject<T>(key: string, item: T): Promise<void> {
    const json = safeJsonStringify(item);
    await this.setItem(key, json);
  }

  public async loadObject<T>(key: string, fallback: T): Promise<T> {
    const item = await this.getItem(key);
    if (!item) {
      await this.storeObject(key, fallback);
      return fallback;
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing JSON for key ${key}:`, error);
      return fallback;
    }
  }

  public setItem(key: string, value: string): Promise<void> {
    const scoped = this.scopedKey(key);

    try {
      localStorage.setItem(scoped, value);
    } catch {
      // Fallback to memory storage if localStorage is not available
      memoryStorage[scoped] = value;
    }

    return Promise.resolve();
  }

  public getItem(key: string): Promise<string | undefined> {
    const scoped = this.scopedKey(key);

    try {
      return Promise.resolve(localStorage.getItem(scoped) ?? undefined);
    } catch {
      // Fallback to memory storage if localStorage is not available
      return Promise.resolve(memoryStorage[scoped] || undefined);
    }
  }

  public removeItem(key: string): Promise<void> {
    const scoped = this.scopedKey(key);

    try {
      localStorage.removeItem(scoped);
    } catch {
      // Fallback to memory storage if localStorage is not available
      delete memoryStorage[scoped];
    }

    return Promise.resolve();
  }
}
