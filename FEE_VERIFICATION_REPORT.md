# Payment Fee Verification Report

**Date**: November 20, 2025  
**Verification Scope**: Complete codebase  

---

## ⚠️ CRITICAL FINDING: Fee Amount Discrepancy

**User Request**: Fees should be:
- Join = **0.01 USDC** (10,000 decimals)
- Raid = **0.005 USDC** (5,000 decimals)

**Actual Implementation**: Fees are currently:
- Join = **10 USDC** (10,000,000 decimals)
- Raid = **5 USDC** (5,000,000 decimals)

**Magnitude**: **1000x higher than requested**

---

## Fee Locations & Status

### 1. JOIN FEE (Currently: 10 USDC, Should be: 0.01 USDC)

#### Smart Contract
| Location | Value | Decimals | Status |
|----------|-------|----------|--------|
| `contracts/CartelCore.sol:36` | `10e6` | 10,000,000 | ❌ **MISMATCH** |

**Current Code**:
```solidity
uint256 public constant JOIN_FEE = 10e6; // 10 USDC
```

**Required Fix**:
```solidity
uint256 public constant JOIN_FEE = 10000; // 0.01 USDC
```

#### Frontend Constants
| Location | Value | Status |
|----------|-------|--------|
| `src/lib/basePay.ts:12` | `BigInt(10 * 1e6)` | ❌ **MISMATCH** |

**Current Code**:
```typescript
export const JOIN_FEE = BigInt(10 * 1e6); // 10 USDC
```

**Required Fix**:
```typescript
export const JOIN_FEE = BigInt(10000); // 0.01 USDC (USDC has 6 decimals)
```

#### Backend API Routes
| Location | Value | Status |
|----------|-------|--------|
| `src/app/api/pay/join/route.ts:47` | `'10000000'` | ❌ **MISMATCH** |

**Current Code**:
```typescript
amount: '10000000', // 10 USDC (6 decimals)
```

**Required Fix**:
```typescript
amount: '10000', // 0.01 USDC (6 decimals)
```

#### UI Display
| Location | Display | Status |
|----------|---------|--------|
| `src/components/JoinCartel.tsx:51` | `formatUSDC(JOIN_FEE)` | ❌ **MISMATCH** (depends on JOIN_FEE constant) |

**Current**: Displays "10 USDC"  
**After Fix**: Will display "0.01 USDC"

#### Documentation
| Location | Value | Status |
|----------|-------|--------|
| `TERMS.md:50` | 10 USDC | ❌ **MISMATCH** |
| `docs/OVERVIEW.md:9` | 10 USDC | ❌ **MISMATCH** |
| `docs/FLOWS.md:8,9` | 10 USDC | ❌ **MISMATCH** |
| `docs/CONTRACTS.md:13` | 10 USDC | ❌ **MISMATCH** |
| `docs/BASE_PAY.md:252` | 10 USDC | ❌ **MISMATCH** |
| `ROADMAP.md:6` | 10 USDC | ❌ **MISMATCH** |
| `SMOKE_TEST.md:60,76` | 10 USDC | ❌ **MISMATCH** |

---

### 2. RAID FEE (Currently: 5 USDC, Should be: 0.005 USDC)

#### Smart Contract
| Location | Value | Decimals | Status |
|----------|-------|----------|--------|
| `contracts/CartelCore.sol:37` | `5e6` | 5,000,000 | ❌ **MISMATCH** |

**Current Code**:
```solidity
uint256 public constant RAID_FEE = 5e6;  // 5 USDC
```

**Required Fix**:
```solidity
uint256 public constant RAID_FEE = 5000;  // 0.005 USDC
```

#### Frontend Constants
| Location | Value | Status |
|----------|-------|--------|
| `src/lib/basePay.ts:13` | `BigInt(5 * 1e6)` | ❌ **MISMATCH** |

**Current Code**:
```typescript
export const RAID_FEE = BigInt(5 * 1e6);  // 5 USDC
```

**Required Fix**:
```typescript
export const RAID_FEE = BigInt(5000);  // 0.005 USDC
```

#### Backend API Routes
| Location | Value | Status |
|----------|-------|--------|
| `src/app/api/pay/raid/route.ts:32` | `'5000000'` | ❌ **MISMATCH** |

**Current Code**:
```typescript
amount: '5000000', // 5 USDC (6 decimals)
```

**Required Fix**:
```typescript
amount: '5000', // 0.005 USDC (6 decimals)
```

#### UI Display
| Location | Display | Status |
|----------|---------|--------|
| `src/components/RaidModal.tsx:80` | `formatUSDC(RAID_FEE)` | ❌ **MISMATCH** (depends on RAID_FEE constant) |

**Current**: Displays "5 USDC"  
**After Fix**: Will display "0.005 USDC"

#### Documentation
| Location | Value | Status |
|----------|-------|--------|
| `TERMS.md:51` | 5 USDC | ❌ **MISMATCH** |
| `docs/OVERVIEW.md:19` | 5 USDC | ❌ **MISMATCH** |
| `docs/FLOWS.md:29,30,32` | 5 USDC | ❌ **MISMATCH** |
| `docs/CONTRACTS.md:21` | 5 USDC | ❌ **MISMATCH** |
| `ROADMAP.md:8` | 5 USDC | ❌ **MISMATCH** |
| `SMOKE_TEST.md` (multiple) | 5 USDC | ❌ **MISMATCH** |

---

### 3. BETRAY FEE

| Location | Implementation | Status |
|----------|----------------|--------|
| `src/app/api/pay/betray/route.ts:21` | Comment only: "might not require payment" | ✅ **NO FEE DEFINED** (as expected) |
| `contracts/CartelCore.sol` | Betrayal has no fee | ✅ **CORRECT** |

**Status**: Betrayal correctly has no fee.

---

## USDC Decimal Handling Analysis

### ✅ Correct Understanding
- USDC has **6 decimals**
- 1 USDC = 1,000,000 (1e6)
- 0.01 USDC = 10,000
- 0.005 USDC = 5,000

### Current Implementation

**Smart Contracts**:
```solidity
uint256 public constant JOIN_FEE = 10e6;  // 10 * 10^6 = 10,000,000 = 10 USDC ✓
uint256 public constant RAID_FEE = 5e6;   // 5 * 10^6 = 5,000,000 = 5 USDC ✓
```

**Frontend**:
```typescript
export const JOIN_FEE = BigInt(10 * 1e6); // 10,000,000 = 10 USDC ✓
export const RAID_FEE = BigInt(5 * 1e6);  // 5,000,000 = 5 USDC ✓
```

**Backend API**:
```typescript
amount: '10000000'  // 10 USDC ✓
amount: '5000000'   // 5 USDC ✓
```

**Decimal Handling**: ✅ **CORRECT** (all using proper USDC 6-decimal format)

**Value**: ❌ **INCORRECT** (should be 1000x lower)

---

## Comprehensive Fix Patch

### File 1: `contracts/CartelCore.sol`

```diff
- uint256 public constant JOIN_FEE = 10e6; // 10 USDC
+ uint256 public constant JOIN_FEE = 10000; // 0.01 USDC

- uint256 public constant RAID_FEE = 5e6;  // 5 USDC
+ uint256 public constant RAID_FEE = 5000;  // 0.005 USDC
```

### File 2: `src/lib/basePay.ts`

```diff
- export const JOIN_FEE = BigInt(10 * 1e6); // 10 USDC
+ export const JOIN_FEE = BigInt(10000); // 0.01 USDC

- export const RAID_FEE = BigInt(5 * 1e6);  // 5 USDC
+ export const RAID_FEE = BigInt(5000);  // 0.005 USDC
```

### File 3: `src/app/api/pay/join/route.ts`

```diff
- amount: '10000000', // 10 USDC (6 decimals)
+ amount: '10000', // 0.01 USDC (6 decimals)
```

### File 4: `src/app/api/pay/raid/route.ts`

```diff
- amount: '5000000', // 5 USDC (6 decimals)
+ amount: '5000', // 0.005 USDC (6 decimals)
```

### File 5: `TERMS.md`

```diff
- Join Fee: 10 USDC (subject to change)
+ Join Fee: 0.01 USDC (subject to change)

- Raid Fee: 5 USDC (subject to change)
+ Raid Fee: 0.005 USDC (subject to change)
```

### File 6-12: Documentation Updates

**Update all documentation files**:
- `docs/OVERVIEW.md`
- `docs/FLOWS.md`
- `docs/CONTRACTS.md`
- `docs/BASE_PAY.md`
- `ROADMAP.md`
- `SMOKE_TEST.md`
- `README.md` (if mentions fees)

Replace all instances of:
- "10 USDC" → "0.01 USDC"
- "5 USDC" → "0.005 USDC"

---

## Risk Assessment

### 🔴 CRITICAL RISKS if Current Values Go Live

**1. Economic Risk (SEVERE)**
- Users would pay **$10** instead of **$0.01** to join (1000x)
- Users would pay **$5** instead of **$0.005** to raid (1000x)
- **Impact**: Near-zero user adoption, product unusable

**2. Revenue Impact (SEVERE)**
- Massively overpriced
- Target audience (Farcaster users) unlikely to pay $10-15 per action
- Competitor advantage (any similar game at lower prices)

**3. User Experience (SEVERE)**
- High barrier to entry
- Raid economics broken (stealing shares not worth $5 fee)
- Betrayal becomes less attractive if pot has minimal value

**4. Smart Contract Risk (HIGH)**
- Constants are immutable once deployed
- Would require new contract deployment to fix
- Migration complexity (move users/shares to new contract)
- Potential loss of funds/shares during migration

**5. Testing Impact (MEDIUM)**
- Current tests likely use testnet USDC
- May not catch pricing issues in test environment
- Need real user testing with actual economics

### ✅ Positive: No Type/Decimal Errors

- USDC decimals (6) correctly handled everywhere
- No type mismatches (all using uint256 or BigInt appropriately)
- String/number conversions correct
- formatUSDC() function will work correctly once constants updated

---

## Validation Checklist

### Decimal Handling
- ✅ USDC = 6 decimals (confirmed in all locations)
- ✅ Smart contract uses proper integer arithmetic
- ✅ Frontend uses BigInt for precision
- ✅ Backend uses string representation (no precision loss)
- ✅ No floating-point arithmetic errors

### Unit Consistency
- ❌ Value mismatch (1000x too high)
- ✅ Unit format consistent (all using USDC smallest units)
- ✅ No mixing of decimal and integer representations incorrectly

### Cross-System Verification
| System | Join Fee | Raid Fee | Match? |
|--------|----------|----------|--------|
| Smart Contract | 10,000,000 | 5,000,000 | ✅ |
| Frontend | 10,000,000 | 5,000,000 | ✅ |
| Backend | 10,000,000 | 5,000,000 | ✅ |
| Documentation | "10 USDC" | "5 USDC" | ✅ |

**Internal Consistency**: ✅ All systems agree on 10/5 USDC  
**User Requirement**: ❌ Should be 0.01/0.005 USDC (1000x lower)

---

## Recommended Action Plan

### Immediate (Before Any Mainnet Deploy)
1. ✅ Update smart contracts (lines 36-37)
2. ✅ Update frontend constants (basePay.ts)
3. ✅ Update API routes (both join and raid)
4. ✅ Recompile contracts
5. ✅ Re-run all tests
6. ✅ Deploy to testnet with new values
7. ✅ Test complete flow with 0.01/0.005 USDC

### Secondary
8. ✅ Update all documentation
9. ✅ Update smoke test documentation
10. ✅ Update terms of service
11. ✅ Verify UI displays correct amounts

### Validation
12. ✅ Test user can join for $0.01
13. ✅ Test user can raid for $0.005
14. ✅ Verify pot balances correctly
15. ✅ Confirm UI shows precise amounts

---

## Summary

**Total Locations Requiring Updates**: 15+ files

**Critical Code Changes**: 4 files
1. `contracts/CartelCore.sol`
2. `src/lib/basePay.ts`
3. `src/app/api/pay/join/route.ts`
4. `src/app/api/pay/raid/route.ts`

**Documentation Changes**: 8+ files

**Risk Level**: 🔴 **CRITICAL** (Cannot deploy with current values)

**Effort**: **~30 minutes** (straightforward find-replace)

**Testing Required**: **Full regression** (payment flows, economics)

---

**Status**: ❌ **FEES MUST BE FIXED BEFORE PRODUCTION DEPLOY**
