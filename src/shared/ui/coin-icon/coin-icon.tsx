import { memo, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import styles from './coin-icon.module.scss'

interface CoinIconProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const CoinIcon = memo(({
  src,
  alt,
  size = 'md',
  className
}: CoinIconProps) => {
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
  }

  return (
    <div 
      className={cn(
        styles.coinIcon,
        styles[`coinIcon--${size}`],
        className
      )}
    >
      {hasError ? (
        <div className={styles.coinIcon__fallback}>
          {alt.charAt(0).toUpperCase()}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={styles.coinIcon__image}
          onError={handleError}
        />
      )}
    </div>
  )
})

CoinIcon.displayName = 'CoinIcon'

