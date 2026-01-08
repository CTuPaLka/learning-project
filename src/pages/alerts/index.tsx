import { AlertsGrid } from "@/features/alerts/ui/forms/alerts-grid"
import { AlertsSummary } from "@/features/alerts/ui/forms/alerts-summary"
import { mockAlerts } from "@/shared/mocks/alerts"
import { Layout } from "@/shared/ui/layout"
import { useMemo } from "react"

/**
 * Страница управления алертами по ценам
 */
export default function AlertsPage() {
	const stats = useMemo(() => {
		const totalAlerts = mockAlerts.length
		const activeAlerts = mockAlerts.filter(alert => alert.isActive).length

		const triggeredAlerts = mockAlerts.filter(alert => {
			if (alert.condition === "above") {
				return alert.currentPrice >= alert.targetPrice
			} else {
				return alert.currentPrice <= alert.targetPrice
			}
		}).length

		return {
			totalAlerts,
			activeAlerts,
			triggeredAlerts,
		}
	}, [])

	return (
		<Layout>
			<h1 className='text-3xl font-bold mb-6'>Price Alerts</h1>
			<AlertsSummary {...stats} />
			<AlertsGrid alerts={mockAlerts} />
		</Layout>
	)
}
