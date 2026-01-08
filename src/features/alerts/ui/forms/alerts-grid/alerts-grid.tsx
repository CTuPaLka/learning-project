import { memo } from 'react'
import { Card } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { CoinIcon } from '@/shared/ui/coin-icon'
import { PriceDisplay } from '@/shared/ui/price-display'
import { cn } from '@/shared/lib/utils'
import type { PriceAlert } from '../../../types'
import styles from './alerts-grid.module.scss'

interface AlertsGridProps {
  alerts: PriceAlert[]
}

export const AlertsGrid = memo(({ alerts }: AlertsGridProps) => {
  if (alerts.length === 0) {
    return (
      <div className={styles.alertsGrid__empty}>
        <p className={styles.alertsGrid__emptyText}>No alerts created</p>
        <p className={styles.alertsGrid__emptyHint}>
          Create your first price alert to get notified when targets are reached
        </p>
      </div>
    )
  }

  return (
    <div className={styles.alertsGrid}>
      {alerts.map((alert) => {
        const isAbove = alert.condition === 'above'
        const isTriggered = isAbove 
          ? alert.currentPrice >= alert.targetPrice
          : alert.currentPrice <= alert.targetPrice

        return (
          <Card 
            key={alert.id} 
            className={cn(
              styles.alertsGrid__card,
              isAbove ? styles['alertsGrid__card--above'] : styles['alertsGrid__card--below']
            )}
          >
            <div className={styles.alertsGrid__header}>
              <div className={styles.alertsGrid__coinInfo}>
                <CoinIcon src={alert.coinImage} alt={alert.coinName} size="md" />
                <div className={styles.alertsGrid__coinNames}>
                  <span className={styles.alertsGrid__coinName}>{alert.coinName}</span>
                  <span className={styles.alertsGrid__coinSymbol}>{alert.coinSymbol.toUpperCase()}</span>
                </div>
              </div>
              
              <div className={styles.alertsGrid__badges}>
                {alert.isActive && (
                  <Badge variant="default" className={styles.alertsGrid__activeBadge}>
                    Active
                  </Badge>
                )}
                {isTriggered && (
                  <Badge variant="destructive" className={styles.alertsGrid__triggeredBadge}>
                    Triggered
                  </Badge>
                )}
              </div>
            </div>

            <div className={styles.alertsGrid__prices}>
              <div className={styles.alertsGrid__priceItem}>
                <span className={styles.alertsGrid__priceLabel}>Current Price</span>
                <PriceDisplay value={alert.currentPrice} size="md" />
              </div>
              
              <div className={styles.alertsGrid__arrow}>
                {isAbove ? '↑' : '↓'}
              </div>
              
              <div className={styles.alertsGrid__priceItem}>
                <span className={styles.alertsGrid__priceLabel}>Target Price</span>
                <PriceDisplay value={alert.targetPrice} size="md" />
              </div>
            </div>

            <div className={styles.alertsGrid__condition}>
              <span className={styles.alertsGrid__conditionText}>
                Alert when price goes {isAbove ? 'above' : 'below'} target
              </span>
            </div>
          </Card>
        )
      })}
    </div>
  )
})

AlertsGrid.displayName = 'AlertsGrid'

