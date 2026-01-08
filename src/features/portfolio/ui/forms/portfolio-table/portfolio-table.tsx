import { memo } from 'react'
import { CoinIcon } from '@/shared/ui/coin-icon'
import { PriceDisplay } from '@/shared/ui/price-display'
import { PercentageChange } from '@/shared/ui/percentage-change'
import type { PortfolioCoin } from '../../../types'
import styles from './portfolio-table.module.scss'

interface PortfolioTableProps {
  coins: PortfolioCoin[]
}

export const PortfolioTable = memo(({ coins }: PortfolioTableProps) => {
  if (coins.length === 0) {
    return (
      <div className={styles.portfolioTable__empty}>
        <p className={styles.portfolioTable__emptyText}>No coins in portfolio</p>
        <p className={styles.portfolioTable__emptyHint}>
          Add your first coin to start tracking your portfolio
        </p>
      </div>
    )
  }

  return (
    <div className={styles.portfolioTable}>
      <table className={styles.portfolioTable__table}>
        <thead className={styles.portfolioTable__thead}>
          <tr>
            <th className={styles.portfolioTable__th}>Coin</th>
            <th className={styles.portfolioTable__th}>Amount</th>
            <th className={styles.portfolioTable__th}>Buy Price</th>
            <th className={styles.portfolioTable__th}>Current Price</th>
            <th className={styles.portfolioTable__th}>Total Value</th>
            <th className={styles.portfolioTable__th}>Profit/Loss</th>
          </tr>
        </thead>
        <tbody className={styles.portfolioTable__tbody}>
          {coins.map((coin) => {
            const totalValue = coin.amount * coin.currentPrice
            const totalInvested = coin.amount * coin.buyPrice
            const profit = totalValue - totalInvested
            const profitPercentage = ((profit / totalInvested) * 100)

            return (
              <tr key={coin.id} className={styles.portfolioTable__row}>
                <td className={styles.portfolioTable__td}>
                  <div className={styles.portfolioTable__coinInfo}>
                    <CoinIcon src={coin.coinImage} alt={coin.coinName} size="sm" />
                    <div className={styles.portfolioTable__coinNames}>
                      <span className={styles.portfolioTable__coinName}>{coin.coinName}</span>
                      <span className={styles.portfolioTable__coinSymbol}>{coin.coinSymbol.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.portfolioTable__td}>
                  {coin.amount.toLocaleString(undefined, { maximumFractionDigits: 8 })}
                </td>
                <td className={styles.portfolioTable__td}>
                  <PriceDisplay value={coin.buyPrice} />
                </td>
                <td className={styles.portfolioTable__td}>
                  <PriceDisplay value={coin.currentPrice} />
                </td>
                <td className={styles.portfolioTable__td}>
                  <PriceDisplay value={totalValue} />
                </td>
                <td className={styles.portfolioTable__td}>
                  <div className={styles.portfolioTable__profitCell}>
                    <PriceDisplay value={profit} />
                    <PercentageChange value={profitPercentage} showArrow={false} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
})

PortfolioTable.displayName = 'PortfolioTable'

