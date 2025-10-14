/**
 * Address Resolution Service for ENS and Basename
 * Resolves ENS names and basenames to Ethereum addresses
 */
export class AddressResolver {
  
  /**
   * Resolve an address, ENS name, or basename to an Ethereum address
   * @param input - Ethereum address, ENS name (.eth), or basename (.base.eth)
   * @returns Promise<string> - Resolved Ethereum address
   */
  async resolveAddress(input: string): Promise<string> {
    const trimmedInput = input.trim();

    // If it's already a valid Ethereum address, return as-is
    if (this.isValidEthereumAddress(trimmedInput)) {
      return trimmedInput;
    }

    // Handle ENS names (.eth)
    if (trimmedInput.endsWith('.eth') && !trimmedInput.endsWith('.base.eth')) {
      return await this.resolveEns(trimmedInput);
    }

    // Handle basenames (.base.eth or .base)
    if (trimmedInput.endsWith('.base.eth') || trimmedInput.endsWith('.base')) {
      return await this.resolveBasename(trimmedInput);
    }

    throw new Error('Invalid address format. Please enter a valid Ethereum address (0x...), ENS name (.eth), or basename (.base)');
  }

  /**
   * Validate if a string is a valid Ethereum address
   */
  private isValidEthereumAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  /**
   * Resolve ENS name to Ethereum address
   * @param ensName - ENS name ending with .eth
   * @returns Promise<string> - Resolved Ethereum address
   */
  private async resolveEns(ensName: string): Promise<string> {
    try {
      // For demo purposes, we'll use a public ENS resolver API
      // In production, you'd want to use your own RPC endpoint
      
      const response = await fetch(`https://api.ensdata.net/${ensName}`);
      
      if (!response.ok) {
        throw new Error(`ENS resolution failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.address) {
        throw new Error(`ENS name ${ensName} does not resolve to an address`);
      }

      const resolvedAddress = data.address;
      
      if (!this.isValidEthereumAddress(resolvedAddress)) {
        throw new Error(`ENS resolved to invalid address: ${resolvedAddress}`);
      }

      console.log(`Resolved ENS ${ensName} → ${resolvedAddress}`);
      return resolvedAddress;

    } catch (error) {
      console.error('ENS resolution error:', error);
      
      if (error instanceof Error) {
        throw new Error(`Failed to resolve ENS name ${ensName}: ${error.message}`);
      }
      
      throw new Error(`Failed to resolve ENS name ${ensName}`);
    }
  }

  /**
   * Resolve basename to Ethereum address
   * @param basename - Basename ending with .base or .base.eth
   * @returns Promise<string> - Resolved Ethereum address
   */
  private async resolveBasename(basename: string): Promise<string> {
    try {
      // Normalize basename format
      const normalizedName = basename.endsWith('.base.eth') 
        ? basename 
        : basename.endsWith('.base') 
          ? `${basename}.eth` 
          : `${basename}.base.eth`;

      // For demo purposes, we'll use a public basename resolver
      // In production, you'd use the official Base name service
      
      // Try multiple resolution methods
      const resolvers = [
        () => this.resolveViaEns(normalizedName),
        () => this.resolveViaBasenameApi(basename),
      ];

      for (const resolver of resolvers) {
        try {
          const address = await resolver();
          if (address) {
            console.log(`Resolved basename ${basename} → ${address}`);
            return address;
          }
        } catch (error) {
          console.log(`Resolver failed, trying next...`, error);
        }
      }

      throw new Error(`Could not resolve basename ${basename}`);

    } catch (error) {
      console.error('Basename resolution error:', error);
      
      if (error instanceof Error) {
        throw new Error(`Failed to resolve basename ${basename}: ${error.message}`);
      }
      
      throw new Error(`Failed to resolve basename ${basename}`);
    }
  }

  /**
   * Try to resolve basename via ENS (since basenames are ENS subdomains)
   */
  private async resolveViaEns(fullName: string): Promise<string | null> {
    try {
      const response = await fetch(`https://api.ensdata.net/${fullName}`);
      if (response.ok) {
        const data = await response.json();
        return data.address || null;
      }
    } catch (error) {
      console.log('ENS resolution failed:', error);
    }
    return null;
  }

  /**
   * Try to resolve basename via a basename-specific API
   */
  private async resolveViaBasenameApi(basename: string): Promise<string | null> {
    try {
      // This would use the official Base name service API
      // For now, return null to indicate not implemented
      console.log(`Would use Base name service API for: ${basename}`);
      return null;
    } catch (error) {
      console.log('Basename API resolution failed:', error);
      return null;
    }
  }

  /**
   * Validate if an input looks like it could be resolved
   * @param input - Address, ENS, or basename
   * @returns boolean - Whether the input format is valid
   */
  isValidInput(input: string): boolean {
    const trimmed = input.trim();
    
    return (
      this.isValidEthereumAddress(trimmed) ||
      trimmed.endsWith('.eth') ||
      trimmed.endsWith('.base') ||
      trimmed.endsWith('.base.eth')
    );
  }

  /**
   * Get input type for display purposes
   * @param input - Address, ENS, or basename
   * @returns string - Type description
   */
  getInputType(input: string): string {
    const trimmed = input.trim();
    
    if (this.isValidEthereumAddress(trimmed)) {
      return 'Ethereum Address';
    } else if (trimmed.endsWith('.base.eth') || trimmed.endsWith('.base')) {
      return 'Basename';
    } else if (trimmed.endsWith('.eth')) {
      return 'ENS Name';
    }
    
    return 'Unknown';
  }
}

// Export singleton instance
export const addressResolver = new AddressResolver();
