# Phase 1 live-chain report

Verified against Base Vibenet on September 10, 2026.

## Final passing configuration

- Chain ID: `84538453`
- Sender implementation: `CanonicalHighRatePayerAccount`
  (`0x813002ffdd25c81cef79781702176d453af0fa57` at test time)
- Bootstrap transaction: ordered nonce key `0`
- Streaming transactions: nonce-free `nonceKeyMax`, 15-second validity
- Cadence: self-correcting 200ms schedule
- Gas limit: sequenced estimate + nonce-free surcharge + 30% headroom
- Receipt reconciliation: independent watcher with exact signed-byte rebroadcast

## 50-transfer gate

| Metric | Result |
| --- | ---: |
| Transfers | 50 |
| Recipient delta | 0.833300 USDV |
| Broadcast duration | 9.922s |
| Accepted throughput | 5.04 tx/s |
| Confirmation duration | 10.824s |
| Confirmed throughput | 4.62 tx/s |
| Mean gas per transfer | 50,017 |
| Sampled base fee | 1 gwei |
| Cost per transfer | 0.000050017 ETH |
| 0.1 ETH runway | 1,999 transfers |
| Runway at 5 tx/s | 6.66 minutes |

## Five-minute streamer/funding soak

The corrected hot loop then ran for five minutes with `npm run soak`:

| Metric | Result |
| --- | ---: |
| Transfers | 1,500 |
| Recipient delta | 24.999000 USDV |
| Broadcast duration | 299.915s |
| Accepted throughput | 5.00 tx/s |
| Confirmation duration | 303.017s |
| Confirmed throughput | 4.95 tx/s |
| Mean gas per transfer | 50,040 |
| Automatic ETH top-ups | 1 |

Two absent transactions were recovered by exact signed-byte rebroadcast during
the soak. There were no unrecovered nonce failures, and every transfer was
included in the final authoritative recipient balance delta.

## Rejected designs discovered by the gate

1. **Unchecked ordered-nonce bursts:** a lower sequence could disappear after
   the RPC returned its hash. Later sequences then filled the sender signature
   pool and produced `sender EIP-8130 signature limit reached`.
2. **Receipt work inside the queue:** throughput fell to 2.65 tx/s.
3. **Visibility acknowledgement through the account RPC proxy:** consistent but
   effectively receipt-paced at 1.39 tx/s.
4. **Account configuration lock:** the current execution client rejected the
   lock change as `unknown account-change op in the enshrined apply path`.
5. **60-second nonce-free validity:** the live admission window is 20 seconds;
   the working path uses 15 seconds.

Run the gate again with:

```bash
npm run spike
```
