import { memo } from 'react'
import { Card } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import styles from './alerts-summary.module.scss'

interface AlertsSummaryProps {
  totalAlerts: number
  activeAlerts: number
  triggeredAlerts: number
}

export const AlertsSummary = memo(({
  totalAlerts,
  activeAlerts,
  triggeredAlerts
}: AlertsSummaryProps) => {
  return (
    <div className={styles.alertsSummary}>
      <Card className={styles.alertsSummary__card}>
        <div className={styles.alertsSummary__item}>
          <span className={styles.alertsSummary__label}>Total Alerts</span>
          <span className={styles.alertsSummary__value}>{totalAlerts}</span>
        </div>
      </Card>

      <Card className={styles.alertsSummary__card}>
        <div className={styles.alertsSummary__item}>
          <span className={styles.alertsSummary__label}>Active Alerts</span>
          <div className={styles.alertsSummary__activeValue}>
            <span className={styles.alertsSummary__value}>{activeAlerts}</span>
            {activeAlerts > 0 && (
              <Badge variant="default" className={styles.alertsSummary__badge}>
                Active
              </Badge>
            )}
          </div>
        </div>
      </Card>

      <Card className={styles.alertsSummary__card}>
        <div className={styles.alertsSummary__item}>
          <span className={styles.alertsSummary__label}>Triggered</span>
          <span className={styles.alertsSummary__value}>{triggeredAlerts}</span>
        </div>
      </Card>
    </div>
  )
})

AlertsSummary.displayName = 'AlertsSummary'

