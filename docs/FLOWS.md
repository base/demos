# User Flows

## 1. Join Cartel Flow
1. **User** opens the Frame.
2. **System** checks `hasJoined` status.
3. **If New User**:
   - Display `JoinCartel` screen.
   - User clicks "Join Cartel (10 USDC)".
   - **System** triggers `BasePay` transaction for 10 USDC.
   - **Contract** `CartelCore.join()` is called.
   - **Contract** mints 100 `CartelShares` to user.
   - **System** updates local state to `hasJoined = true`.
   - Redirect to Dashboard.

## 2. Claim Yield Flow
1. **User** is on `CartelDashboard`.
2. **User** clicks "Claim Daily Yield".
3. **System** checks `lastClaimTime` vs current time.
4. **If Eligible**:
   - **System** triggers transaction to `CartelCore.claimYield()`.
   - **Contract** verifies eligibility and transfers USDC from Pot to User.
   - **UI** shows success animation + Haptic feedback.
   - **System** updates "Next Claim" timer.

## 3. Raid Flow
1. **User** clicks "Raid" on Dashboard.
2. **System** opens `RaidModal`.
3. **User** selects a target (or random).
4. **User** confirms "Raid (5 USDC)".
5. **System** triggers `BasePay` transaction for 5 USDC.
6. **Contract** `CartelCore.raid()` is called.
   - 5 USDC deposited to Pot.
   - Raid logic executes (success/fail calculation).
   - `Raid` event emitted.
7. **UI** displays result (Stolen amount or Failure).
8. **User** prompted to "Share Raid" on Farcaster.

## 4. Betrayal Flow
1. **User** clicks "Betray Cartel" (High Risk).
2. **System** opens `BetrayModal` with warning.
3. **User** confirms betrayal.
4. **System** triggers transaction to `CartelCore.betray()`.
5. **Contract** executes betrayal logic:
   - Burns all user shares.
   - Calculates payout (if successful).
   - Emits `Betrayal` event.
6. **UI** shows "You have been kicked out" or "You escaped with X USDC".
7. **System** resets user state (kicked out).
