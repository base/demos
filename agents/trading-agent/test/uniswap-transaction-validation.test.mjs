import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const template = await readFile(new URL("../templates/tools/protocols/uniswap-transaction-validation.js.hbs", import.meta.url), "utf8");
const { validateUniswapSwapTransaction } = await import("data:text/javascript;base64," + Buffer.from(template).toString("base64"));

const TOKEN_IN = "0x1111111111111111111111111111111111111111";
const MID_TOKEN = "0x2222222222222222222222222222222222222222";
const TOKEN_OUT = "0x3333333333333333333333333333333333333333";
const WALLET = "0x4444444444444444444444444444444444444444";
const ROUTER = "0x6ff5693b99212da76ad316178a184ab56d299b43";
const MSG_SENDER = "0x0000000000000000000000000000000000000001";
const DEFAULTS = {
  chainId: 8453,
  walletChainId: 8453,
  walletAddress: WALLET,
  tokenIn: TOKEN_IN,
  tokenOut: TOKEN_OUT,
  amountInRaw: "100",
  quoteAmountOutRaw: "1000",
  slippagePct: 0.5,
};

function word(value) { return BigInt(value).toString(16).padStart(64, "0"); }
function addressWord(address) { return address.toLowerCase().slice(2).padStart(64, "0"); }
function encodeBytes(hex) { return word(hex.length / 2) + hex.padEnd(Math.ceil(hex.length / 64) * 64, "0"); }
function encodeBytesArray(items) {
  const tails = items.map(encodeBytes);
  let offset = items.length * 32;
  const offsets = tails.map((tail) => { const current = word(offset); offset += tail.length / 2; return current; });
  return word(items.length) + offsets.join("") + tails.join("");
}
function encodeV3Path(addresses, fees) {
  let path = addresses[0].toLowerCase().slice(2);
  for (let i = 0; i < fees.length; i += 1) path += fees[i].toString(16).padStart(6, "0") + addresses[i + 1].toLowerCase().slice(2);
  return path;
}
function encodeV3Input({ recipient = WALLET, amountIn = 100n, minOut = 995n, addresses = [TOKEN_IN, TOKEN_OUT], fees = [500], payerIsUser = true } = {}) {
  const path = encodeV3Path(addresses, fees);
  return addressWord(recipient) + word(amountIn) + word(minOut) + word(160) + word(payerIsUser ? 1 : 0) + encodeBytes(path);
}
function encodeV2Input({ recipient = WALLET, amountIn = 100n, minOut = 995n, addresses = [TOKEN_IN, TOKEN_OUT], payerIsUser = true } = {}) {
  const addressArray = word(addresses.length) + addresses.map(addressWord).join("");
  return addressWord(recipient) + word(amountIn) + word(minOut) + word(160) + word(payerIsUser ? 1 : 0) + addressArray;
}
function encodeTx({ command = "00", input = encodeV3Input(), commands = [command], inputs = [input], to = ROUTER, from = WALLET, chainId = 8453, value = "0", selector = "0x3593564c", deadline } = {}) {
  const commandBytes = encodeBytes(commands.join(""));
  const encodedInputs = encodeBytesArray(inputs);
  const hasDeadline = selector.toLowerCase() === "0x24856bc3";
  const headSize = hasDeadline ? 96 : 64;
  const args = word(headSize) + word(headSize + commandBytes.length / 2) + (hasDeadline ? word(deadline ?? 2000000000) : "") + commandBytes + encodedInputs;
  return { to, from, chainId, value, data: selector + args };
}
function validate(tx, overrides = {}) {
  return validateUniswapSwapTransaction({ ...DEFAULTS, tx, ...overrides });
}

test("accepts a Base Mainnet V3 exact-input route with quote-bound minimum output", () => {
  assert.equal(validate(encodeTx()).valid, true);
});

test("accepts a Base Mainnet V2 multi-hop exact-input route", () => {
  const tx = encodeTx({ command: "08", input: encodeV2Input({ addresses: [TOKEN_IN, MID_TOKEN, TOKEN_OUT] }) });
  assert.equal(validate(tx).valid, true);
});

test("accepts the Universal Router sender-recipient alias and deadline entrypoint", () => {
  const tx = encodeTx({ input: encodeV3Input({ recipient: MSG_SENDER }), selector: "0x24856bc3" });
  assert.equal(validate(tx).valid, true);
});

test("accepts only the official Base Sepolia router set on Base Sepolia", () => {
  const tx = encodeTx({ to: "0x95273d871c8156636e114b63797d78d7e1720d81", chainId: 84532 });
  assert.equal(validate(tx, { chainId: 84532, walletChainId: 84532 }).valid, true);
});

test("rejects unknown routers and mismatched transaction or wallet chains", () => {
  assert.equal(validate(encodeTx({ to: "0x9999999999999999999999999999999999999999" })).valid, false);
  assert.equal(validate(encodeTx({ chainId: 84532 })).valid, false);
  assert.equal(validate(encodeTx(), { walletChainId: 84532 }).valid, false);
});

test("rejects sender, recipient, input amount, and token-path mismatches", () => {
  assert.equal(validate(encodeTx({ from: TOKEN_OUT })).valid, false);
  assert.equal(validate(encodeTx({ input: encodeV3Input({ recipient: MID_TOKEN }) })).valid, false);
  assert.equal(validate(encodeTx({ input: encodeV3Input({ amountIn: 101n }) })).valid, false);
  assert.equal(validate(encodeTx({ input: encodeV3Input({ addresses: [MID_TOKEN, TOKEN_OUT] }) })).valid, false);
  assert.equal(validate(encodeTx({ input: encodeV3Input({ addresses: [TOKEN_IN, MID_TOKEN] }) })).valid, false);
});

test("rejects nonzero native value and loose minimum-output protection", () => {
  assert.equal(validate(encodeTx({ value: "1" })).valid, false);
  assert.equal(validate(encodeTx({ input: encodeV3Input({ minOut: 994n }) })).valid, false);
});

test("rejects exact-output, partial-fill, multi-command, and unknown selectors", () => {
  assert.equal(validate(encodeTx({ command: "01" })).valid, false);
  assert.equal(validate(encodeTx({ command: "80" })).valid, false);
  const input = encodeV3Input();
  assert.equal(validate(encodeTx({ commands: ["00", "00"], inputs: [input, input] })).valid, false);
  assert.equal(validate(encodeTx({ selector: "0xdeadbeef" })).valid, false);
});

test("rejects malformed calldata, paths, and slippage values", () => {
  assert.equal(validate({ ...encodeTx(), data: "0x1234" }).valid, false);
  assert.equal(validate(encodeTx({ input: encodeV3Input({ fees: [0] }) })).valid, false);
  assert.equal(validate(encodeTx(), { slippagePct: 100 }).valid, false);
});
