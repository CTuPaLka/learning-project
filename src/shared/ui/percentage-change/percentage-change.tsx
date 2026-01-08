import { memo } from 'react'
import { cn } from '@/shared/lib/utils'
import styles from './percentage-change.module.scss'

interface PercentageChangeProps {
  value: number
  period?: '1h' | '24h' | '7d'
  showArrow?: boolean
  className?: string
}

export const PercentageChange = memo(({
  value,
  period,
  showArrow = true,
  className
}: PercentageChangeProps) => {
  const isPositive = value >= 0
  const formatted = Math.abs(value).toFixed(2)

  return (
    <span 
      className={cn(
        styles.percentageChange,
        isPositive ? styles['percentageChange--positive'] : styles['percentageChange--negative'],
        className
      )}
    >
      {showArrow && (
        <span className={styles.percentageChange__arrow}>
          {isPositive ? '↑' : '↓'}
        </span>
      )}
      <span className={styles.percentageChange__value}>
        {isPositive ? '+' : '-'}{formatted}%
      </span>
      {period && (
        <span className={styles.percentageChange__period}>
          {' '}{period}
        </span>
      )}
    </span>
  )
})

PercentageChange.displayName = 'PercentageChange'

