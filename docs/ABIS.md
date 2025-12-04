# ABIs / Shared Types

## ABI Files Location
All contract ABIs are located in `/src/lib/abi/`:
- `CartelCore.json` - Main game logic contract
- `CartelPot.json` - USDC treasury management
- `CartelShares.json` - ERC-1155 share tokens

## Frontend Import Pattern

### ✅ Correct (using ABIs from /lib)
```typescript
import CartelCoreABI from '~/lib/abi/CartelCore.json';
import { useContractRead } from 'wagmi';

const { data: joinFee } = useContractRead({
  address: CARTEL_CORE_ADDRESS,
  abi: CartelCoreABI,
  functionName: 'JOIN_FEE',
});
```

### ❌ Incorrect (hardcoded function signatures)
```typescript
// DON'T DO THIS
const contract = new ethers.Contract(
  address,
  [
    "function join(address referrer)",  // Hardcoded!
    "function raid(address target)"      // Bad practice!
  ],
  signer
);
```

## Example Usage

See `/src/lib/abi/index.ts` for complete import examples with wagmi hooks.

### Contract Addresses
Configure in `.env`:
```env
NEXT_PUBLIC_CARTEL_CORE_ADDRESS=0x...
NEXT_PUBLIC_CARTEL_POT_ADDRESS=0x...
NEXT_PUBLIC_CARTEL_SHARES_ADDRESS=0x...
```

## Type Safety
The ABI JSON files provide full type safety when used with wagmi or viem. TypeScript will autocomplete function names and validate argument types.
