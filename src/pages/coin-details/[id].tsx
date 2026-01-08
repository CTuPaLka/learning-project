import type { ChartPeriod } from "@/features/charts"
import { PriceChart } from "@/features/charts"
import { CoinHeader } from "@/features/coins/ui/forms/coin-header"
import { mockBitcoinChartData, mockBitcoinDetail } from "@/shared/mocks/coins"
import { Layout } from "@/shared/ui/layout"
import { useState } from "react"
import { useParams } from "react-router-dom"

/**
 * Страница детальной информации о монете
 */
export default function CoinDetailsPage() {
	const { id } = useParams()
	const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>("7D")

	// В реальном приложении здесь будет запрос к API по id
	const coinDetail = mockBitcoinDetail
	const chartData = mockBitcoinChartData

	const handleAddToPortfolio = () => {
		console.log("Add to portfolio:", id)
		// Здесь будет логика добавления в портфолио
	}

	const handleSetAlert = () => {
		console.log("Set alert for:", id)
		// Здесь будет логика установки алерта
	}

	return (
		<Layout>
			<CoinHeader
				coin={{
					name: coinDetail.name,
					symbol: coinDetail.symbol,
					image: coinDetail.image.large,
					current_price: coinDetail.market_data.current_price.usd,
					price_change_percentage_24h:
						coinDetail.market_data.price_change_percentage_24h,
				}}
				onAddToPortfolio={handleAddToPortfolio}
				onSetAlert={handleSetAlert}
			/>

			<div className='mt-8'>
				<PriceChart
					data={chartData}
					selectedPeriod={selectedPeriod}
					onPeriodChange={setSelectedPeriod}
				/>
			</div>

			<div className='mt-8 prose dark:prose-invert max-w-none'>
				<h2>About {coinDetail.name}</h2>
				<p>{coinDetail.description.en}</p>
			</div>
		</Layout>
	)
}
