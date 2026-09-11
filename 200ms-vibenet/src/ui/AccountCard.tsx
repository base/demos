import { formatEth, formatUnits, shortAddress } from '../chain/format'

type Props = {
  label: string
  address: string
  tokenBalance: bigint
  ethBalance?: bigint
  auxiliary?: string
}

export function AccountCard({ label, address, tokenBalance, ethBalance, auxiliary }: Props) {
  return (
    <article className="account-card">
      <div className="account-heading">
        <span className="eyebrow">{label}</span>
        {auxiliary ? <span className="account-aux">{auxiliary}</span> : null}
      </div>
      <a
        className="address-link"
        href={`https://chain.base.org/vibenet/explorer/address/${address}`}
        target="_blank"
        rel="noreferrer"
        title={address}
      >
        {shortAddress(address, 10, 8)}
      </a>
      <div className="account-balance">{formatUnits(tokenBalance, 6, 4)} <span>USDV</span></div>
      {ethBalance !== undefined ? <div className="gas-balance">{formatEth(ethBalance)} ETH gas</div> : null}
    </article>
  )
}
