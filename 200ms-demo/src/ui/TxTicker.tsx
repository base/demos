import type { StreamTransaction } from '../chain/streamer'
import { formatFixedUnits, shortAddress } from '../chain/format'

type Props = {
  transactions: StreamTransaction[]
}

const statusLabel = {
  pending: 'pending',
  confirmed: 'confirmed',
  reverted: 'reverted',
  unknown: 'unknown',
}

export function TxTicker({ transactions }: Props) {
  return (
    <section className="ticker" aria-label="Onchain transfers">
      <div className="ticker-head">
        <span>Transaction</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Block</span>
        <span>Latency</span>
      </div>
      <div className="ticker-body">
        {transactions.length === 0 ? (
          <div className="ticker-empty">Transfers will appear here as real hashes land.</div>
        ) : transactions.map((transaction) => (
          <a
            className="ticker-row"
            key={transaction.hash}
            href={`https://chain.base.org/vibenet/explorer/tx/${transaction.hash}`}
            target="_blank"
            rel="noreferrer"
            title={transaction.message ?? transaction.hash}
          >
            <span className="tx-hash">{shortAddress(transaction.hash, 10, 6)}</span>
            <span>{formatFixedUnits(transaction.amount)}</span>
            <span className={`tx-status is-${transaction.status}`}>
              <i aria-hidden="true" />{statusLabel[transaction.status]}
            </span>
            <span>{transaction.blockNumber ?? '—'}</span>
            <span>{transaction.latencyMs ? `${transaction.latencyMs}ms` : '—'}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
