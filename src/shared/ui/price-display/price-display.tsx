import { memo } from 'react'
import { cn } from '@/shared/lib/utils'
import styles from './price-display.module.scss'

interface PriceDisplayProps {
  value: number
  currency?: 'USD' | 'EUR' | 'RUB'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const currencySymbols = {
  USD: '$',
  EUR: '€',
  RUB: '₽'
}

export const PriceDisplay = memo(({
  value,
  currency = 'USD',
  size = 'md',
  className
}: PriceDisplayProps) => {
  const symbol = currencySymbols[currency]
  const isNegative = value < 0
  
  const formatPrice = (price: number) => {
    const absPrice = Math.abs(price)
    
    if (absPrice >= 1000000) {
      return `${symbol}${(absPrice / 1000000).toFixed(2)}M`
    }
    
    if (absPrice >= 1000) {
      return `${symbol}${(absPrice / 1000).toFixed(2)}K`
    }
    
    return `${symbol}${absPrice.toFixed(2)}`
  }

  return (
    <span 
      className={cn(
        styles.priceDisplay,
        styles[`priceDisplay--${size}`],
        isNegative && styles['priceDisplay--negative'],
        className
      )}
    >
      {formatPrice(value)}
    </span>
  )
})

PriceDisplay.displayName = 'PriceDisplay'

