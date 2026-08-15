import { useState } from 'react';
import { createWalletClient, custom, parseUnits, isAddress } from 'viem';
import {
  NETWORKS,
  NetworkKey,
  usdcDomain,
  TRANSFER_WITH_AUTHORIZATION_TYPES,
  USDC_DECIMALS,
} from '../lib/eip3009';

const NETWORK_KEY = (process.env.NEXT_PUBLIC_NETWORK ?? 'base-sepolia') as NetworkKey;

export default function Home() {
  const [account, setAccount] = useState<`0x${string}` | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
  const [busy, setBusy] = useState(false);

  const network = NETWORKS[NETWORK_KEY];

  async function connect() {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      setStatus('No wallet found. Install a browser wallet first.');
      return;
    }
    const [addr] = await ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(addr);
    setStatus('');
  }

  async function payGasless() {
    if (!account) return;
    if (!isAddress(recipient)) {
      setStatus('Invalid recipient address.');
      return;
    }
    let value: bigint;
    try {
      value = parseUnits(amount, USDC_DECIMALS);
      if (value <= 0n) throw new Error();
    } catch {
      setStatus('Invalid amount.');
      return;
    }

    setBusy(true);
    setTxHash('');
    try {
      setStatus('Requesting signature… (no gas needed)');
      const ethereum = (window as any).ethereum;
      const walletClient = createWalletClient({
        chain: network.chain,
        transport: custom(ethereum),
      });

      const now = Math.floor(Date.now() / 1000);
      const nonce = ('0x' +
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')) as `0x${string}`;

      const message = {
        from: account,
        to: recipient as `0x${string}`,
        value,
        validAfter: 0n,
        validBefore: BigInt(now + 600), // 10 minutes — well under the relay's 1h cap
        nonce,
      };

      const signature = await walletClient.signTypedData({
        account,
        domain: usdcDomain(network.chain.id, network.usdc),
        types: TRANSFER_WITH_AUTHORIZATION_TYPES,
        primaryType: 'TransferWithAuthorization',
        message,
      });

      setStatus('Relaying transaction…');
      const res = await fetch('/api/relay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: message.from,
          to: message.to,
          value: message.value.toString(),
          validAfter: message.validAfter.toString(),
          validBefore: message.validBefore.toString(),
          nonce,
          signature,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Relay failed (${res.status})`);

      setTxHash(data.transactionHash);
      setStatus('Transfer complete — gas paid by the relayer.');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  const explorer = network.chain.blockExplorers?.default.url;

  return (
    <main style={{ maxWidth: 480, margin: '4rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Gasless USDC Payment</h1>
      <p style={{ color: '#555' }}>
        Sign an EIP-3009 authorization — the relayer submits it and pays gas. Network:{' '}
        <strong>{network.chain.name}</strong>
      </p>

      {!account ? (
        <button onClick={connect} style={btn}>
          Connect Wallet
        </button>
      ) : (
        <>
          <p style={{ fontSize: 13, color: '#777' }}>Connected: {account}</p>
          <label style={label}>
            Recipient
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x…"
              style={input}
            />
          </label>
          <label style={label}>
            Amount (USDC)
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1.50"
              style={input}
            />
          </label>
          <button onClick={payGasless} disabled={busy} style={btn}>
            {busy ? 'Working…' : 'Pay (gasless)'}
          </button>
        </>
      )}

      {status && <p style={{ marginTop: 16 }}>{status}</p>}
      {txHash && explorer && (
        <p>
          <a href={`${explorer}/tx/${txHash}`} target="_blank" rel="noreferrer">
            View transaction
          </a>
        </p>
      )}
    </main>
  );
}

const btn: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: 16,
  borderRadius: 8,
  border: 'none',
  background: '#0052ff',
  color: '#fff',
  cursor: 'pointer',
  marginTop: 12,
};
const label: React.CSSProperties = { display: 'block', marginTop: 12, fontSize: 14 };
const input: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: 8,
  marginTop: 4,
  fontSize: 14,
  borderRadius: 6,
  border: '1px solid #ccc',
};
