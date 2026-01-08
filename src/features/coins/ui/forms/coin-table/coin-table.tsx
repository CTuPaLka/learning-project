import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinIcon } from '@/shared/ui/coin-icon'
import { PriceDisplay } from '@/shared/ui/price-display'
import { PercentageChange } from '@/shared/ui/percentage-change'
import type { CoinListItem } from '../../../types'
import styles from './coin-table.module.scss'

interface CoinTableProps {
  coins: CoinListItem[]
  isLoading?: boolean
  disabled?: boolean
}

export const CoinTable = memo(({
  coins,
  isLoading,
  disabled
}: CoinTableProps) => {
  const navigate = useNavigate()

  const handleRowClick = (coinId: string) => {
    if (!disabled) {
      navigate(`/coin/${coinId}`)
    }
  }

  if (isLoading) {
    return <div className={styles.coinTable__loading}>Loading...</div>
  }

  if (coins.length === 0) {
    return <div className={styles.coinTable__empty}>No coins found</div>
  }

  return (
    <div className={styles.coinTable}>
      <table className={styles.coinTable__table}>
        <thead className={styles.coinTable__thead}>
          <tr>
            <th className={styles.coinTable__th}>#</th>
            <th className={styles.coinTable__th}>Coin</th>
            <th className={styles.coinTable__th}>Price</th>
            <th className={styles.coinTable__th}>24h Change</th>
            <th className={styles.coinTable__th}>24h Volume</th>
            <th className={styles.coinTable__th}>Market Cap</th>
          </tr>
        </thead>
        <tbody className={styles.coinTable__tbody}>
          {coins.map((coin) => (
            <tr 
              key={coin.id} 
              className={styles.coinTable__row}
              onClick={() => handleRowClick(coin.id)}
              style={{ opacity: disabled ? 0.5 : 1 }}
            >
              <td className={styles.coinTable__td}>
                {coin.market_cap_rank}
              </td>
              <td className={styles.coinTable__td}>
                <div className={styles.coinTable__coinInfo}>
                  <CoinIcon src={coin.image} alt={coin.name} size="sm" />
                  <div className={styles.coinTable__coinNames}>
                    <span className={styles.coinTable__coinName}>{coin.name}</span>
                    <span className={styles.coinTable__coinSymbol}>{coin.symbol.toUpperCase()}</span>
                  </div>
                </div>
              </td>
              <td className={styles.coinTable__td}>
                <PriceDisplay value={coin.current_price} />
              </td>
              <td className={styles.coinTable__td}>
                <PercentageChange value={coin.price_change_percentage_24h} />
              </td>
              <td className={styles.coinTable__td}>
                <PriceDisplay value={coin.total_volume} />
              </td>
              <td className={styles.coinTable__td}>
                <PriceDisplay value={coin.market_cap} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

CoinTable.displayName = 'CoinTable'

