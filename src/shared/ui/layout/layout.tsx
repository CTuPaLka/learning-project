import { memo, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/shared/ui/theme-toggle'
import { cn } from '@/shared/lib/utils'
import styles from './layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/alerts', label: 'Alerts' },
]

export const Layout = memo(({ children }: LayoutProps) => {
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <div className={styles.layout__container}>
          <Link to="/" className={styles.layout__logo}>
            <span className={styles.layout__logoIcon}>₿</span>
            <span className={styles.layout__logoText}>Crypto Tracker</span>
          </Link>

          <nav className={styles.layout__nav}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  styles.layout__navLink,
                  location.pathname === link.path && styles['layout__navLink--active']
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      <main className={styles.layout__main}>
        {children}
      </main>
    </div>
  )
})

Layout.displayName = 'Layout'

