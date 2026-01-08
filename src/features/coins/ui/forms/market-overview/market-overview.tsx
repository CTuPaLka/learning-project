import { memo } from 'react'
import { Card } from '@/shared/ui/card'
import { PriceDisplay } from '@/shared/ui/price-display'
import { cn } from '@/shared/lib/utils'
import styles from './market-overview.module.scss'

interface MarketOverviewProps {
  totalMarketCap: number
  totalVolume24h: number
  btcDominance: number
  activeCryptocurrencies: number
}

export const MarketOverview = memo(({
  totalMarketCap,
  totalVolume24h,
  btcDominance,
  activeCryptocurrencies
}: MarketOverviewProps) => {
  return (
    <div className={styles.marketOverview}>
      <Card className={styles.marketOverview__card}>
        <div className={styles.marketOverview__item}>
          <span className={styles.marketOverview__label}>Market Cap</span>
          <PriceDisplay value={totalMarketCap} size="lg" />
        </div>
      </Card>

      <Card className={styles.marketOverview__card}>
        <div className={styles.marketOverview__item}>
          <span className={styles.marketOverview__label}>24h Volume</span>
          <PriceDisplay value={totalVolume24h} size="lg" />
        </div>
      </Card>

      <Card className={styles.marketOverview__card}>
        <div className={styles.marketOverview__item}>
          <span className={styles.marketOverview__label}>BTC Dominance</span>
          <span className={styles.marketOverview__value}>{btcDominance.toFixed(1)}%</span>
        </div>
      </Card>

      <Card className={styles.marketOverview__card}>
        <div className={styles.marketOverview__item}>
          <span className={styles.marketOverview__label}>Active Coins</span>
          <span className={styles.marketOverview__value}>{activeCryptocurrencies.toLocaleString()}</span>
        </div>
      </Card>
    </div>
  )
})

MarketOverview.displayName = 'MarketOverview'

