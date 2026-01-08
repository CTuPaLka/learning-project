import { memo } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import styles from './theme-toggle.module.scss'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle = memo(({ className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('system')
    } else {
      setTheme('dark')
    }
  }

  const getIcon = () => {
    switch (theme) {
      case 'dark':
        return '🌙'
      case 'light':
        return '☀️'
      default:
        return '💻'
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'dark':
        return 'Dark'
      case 'light':
        return 'Light'
      default:
        return 'System'
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={cn(styles.themeToggle, className)}
      title={`Current theme: ${getLabel()}. Click to cycle.`}
    >
      <span className={styles.themeToggle__icon}>{getIcon()}</span>
      <span className={styles.themeToggle__label}>{getLabel()}</span>
    </Button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'

