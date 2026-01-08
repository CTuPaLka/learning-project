import { PortfolioSummary } from "@/features/portfolio/ui/forms/portfolio-summary"
import { PortfolioTable } from "@/features/portfolio/ui/forms/portfolio-table"
import { mockPortfolioCoins } from "@/shared/mocks/portfolio"
import { Layout } from "@/shared/ui/layout"
import { useMemo } from "react"

/**
 * Страница портфолио пользователя
 */
export default function PortfolioPage() {
	const stats = useMemo(() => {
		const totalValue = mockPortfolioCoins.reduce(
			(sum, coin) => sum + coin.amount * coin.currentPrice,
			0
		)

		const totalInvested = mockPortfolioCoins.reduce(
			(sum, coin) => sum + coin.amount * coin.buyPrice,
			0
		)

		const totalProfit = totalValue - totalInvested
		const totalProfitPercentage =
			totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0

		return {
			totalValue,
			totalInvested,
			totalProfit,
			totalProfitPercentage,
		}
	}, [])

	return (
		<Layout>
			<h1 className='text-3xl font-bold mb-6'>Portfolio</h1>
			<PortfolioSummary {...stats} />
			<PortfolioTable coins={mockPortfolioCoins} />
		</Layout>
	)
}
