# sol2base v1.1.0 - Base Bridge v0.3.0 Compatibility Update

## **working e2e Bridge restored**

This release updates sol2base to be compatible with the Base team's September 24, 2025 bridge infrastructure redeploy (v0.3.0), which included breaking changes. The bridge now works end-to-end again, with completion times of just a few seconds for WSOL to land on Base Sepolia.

## **breaking changes from Base Team redeploy**

### **updated Program IDs**
- **Solana Bridge program:** `HSvNvzehozUpYhRBuCKq3Fq8udpRocTmGMUYXmCSiCCc` (was `83hN2esneZUbKgLfUvo7uzas4g7kyiodeNKAqZgx5MbH`)
- **Solana Base Relayer program:** `ExS1gcALmaA983oiVpvFSVohi1zCtAUTgsLj5xiFPPgL` (new)
- **gas fee receiver:** `BEwzVVw44VLaspWByUML23hbQmo5ndM1NPQAJsvCxC6F` (unchanged)

### **account structure changes**
- **OutgoingMessage accounts:** Now use PDAs instead of generated keypairs
- **MessageToRelay accounts:** Now use PDAs instead of generated keypairs
- **PDA seeds:** 
  - OutgoingMessage: `["outgoing_message", 32-byte-salt]`
  - MessageToRelay: `["mtr", 32-byte-salt]`

### **updated CA's**
- **Base Sepolia Bridge:** `0x3154Cf16ccdb4C6d922629664174b904d80F2C35`
- **Base Sepolia Bridge validator:** `0xa80C07DF38fB1A5b3E6a4f4FAAB71E7a056a4EC7`
- **Wrapped SOL on Base Sepolia:** `0xC5b9112382f3c87AFE8e1A28fa52452aF81085AD` (was `0x70445da14e089424E5f7Ab6d3C22F5Fadeb619Ca`)

## 🛠️ **technical fixes implemented**

### **Updated WSOL contract address** to the devnet-prod deployment address

### **PDA implementation**
- **single salt usage:** Both OutgoingMessage and MessageToRelay PDAs now use the same 32-byte salt
- **proper seed derivation:** Using exact seed patterns from Base bridge source code
- **raw byte packing:** EVM addresses properly encoded as 20-byte buffers

### **enhanced reliability**
- **improved error handling** for "transaction already processed" scenarios
- **better diagnostics** for debugging bridge issues
- **environment configuration** support for different deployments

## **codebase improvements**

### **streamlined repository**
- **removed 30,000+ lines** of unused generated client code
- **removed unused directories:** bridge-contracts, bridge-solana
- **cleaned up dependencies** and reduced bundle size
- **updated documentation** with all current addresses