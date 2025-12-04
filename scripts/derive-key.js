const { ethers } = require("ethers");

const mnemonic = "arrow layer owner fatal enact paper clown embark entry orange city phone";

try {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log("\n✅ SUCCESS! Here is your Ethereum Private Key:");
    console.log("------------------------------------------------");
    console.log(wallet.privateKey);
    console.log("------------------------------------------------");
    console.log("Address:", wallet.address);
} catch (error) {
    console.error("Error deriving key:", error.message);
}
