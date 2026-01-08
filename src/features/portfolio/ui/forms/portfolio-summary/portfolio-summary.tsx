import { memo } from 'react'
import { Card } from '@/shared/ui/card'
import { PriceDisplay } from '@/shared/ui/price-display'
import { PercentageChange } from '@/shared/ui/percentage-change'
import { cn } from '@/shared/lib/utils'
import styles from './portfolio-summary.module.scss'

interface PortfolioSummaryProps {
  totalValue: number
  totalInvested: number
  totalProfit: number
  totalProfitPercentage: number
}

export const PortfolioSummary = memo(({
  totalValue,
  totalInvested,
  totalProfit,
  totalProfitPercentage
}: PortfolioSummaryProps) => {
  return (
    <div className={styles.portfolioSummary}>
      <Card className={styles.portfolioSummary__card}>
        <div className={styles.portfolioSummary__item}>
          <span className={styles.portfolioSummary__label}>Total Value</span>
          <PriceDisplay value={totalValue} size="lg" />
        </div>
      </Card>

      <Card className={styles.portfolioSummary__card}>
        <div className={styles.portfolioSummary__item}>
          <span className={styles.portfolioSummary__label}>Total Invested</span>
          <PriceDisplay value={totalInvested} size="lg" />
        </div>
      </Card>

      <Card className={styles.portfolioSummary__card}>
        <div className={styles.portfolioSummary__item}>
          <span className={styles.portfolioSummary__label}>Total Profit</span>
          <PriceDisplay value={totalProfit} size="lg" />
        </div>
      </Card>

      <Card className={styles.portfolioSummary__card}>
        <div className={styles.portfolioSummary__item}>
          <span className={styles.portfolioSummary__label}>Profit Percentage</span>
          <div className={styles.portfolioSummary__percentage}>
            <PercentageChange value={totalProfitPercentage} showArrow={false} />
          </div>
        </div>
      </Card>
    </div>
  )
})

PortfolioSummary.displayName = 'PortfolioSummary'

