import { memo } from 'react'
import { CoinIcon } from '@/shared/ui/coin-icon'
import { PriceDisplay } from '@/shared/ui/price-display'
import { PercentageChange } from '@/shared/ui/percentage-change'
import { Button } from '@/shared/ui/button'
import styles from './coin-header.module.scss'

interface CoinHeaderProps {
  coin: {
    name: string
    symbol: string
    image: string
    current_price: number
    price_change_percentage_24h: number
  }
  onAddToPortfolio?: () => void
  onSetAlert?: () => void
  disabled?: boolean
}

export const CoinHeader = memo(({
  coin,
  onAddToPortfolio,
  onSetAlert,
  disabled
}: CoinHeaderProps) => {
  return (
    <div className={styles.coinHeader}>
      <div className={styles.coinHeader__main}>
        <CoinIcon src={coin.image} alt={coin.name} size="lg" />
        <div className={styles.coinHeader__info}>
          <h1 className={styles.coinHeader__name}>{coin.name}</h1>
          <span className={styles.coinHeader__symbol}>{coin.symbol.toUpperCase()}</span>
        </div>
      </div>

      <div className={styles.coinHeader__price}>
        <PriceDisplay value={coin.current_price} size="lg" />
        <PercentageChange value={coin.price_change_percentage_24h} period="24h" />
      </div>

      <div className={styles.coinHeader__actions}>
        <Button 
          onClick={onAddToPortfolio} 
          disabled={disabled}
          variant="default"
        >
          Add to Portfolio
        </Button>
        <Button 
          onClick={onSetAlert} 
          disabled={disabled}
          variant="outline"
        >
          Set Alert
        </Button>
      </div>
    </div>
  )
})

CoinHeader.displayName = 'CoinHeader'

