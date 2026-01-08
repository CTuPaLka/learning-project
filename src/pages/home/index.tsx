import { CoinTable } from "@/features/coins/ui/forms/coin-table"
import { MarketOverview } from "@/features/coins/ui/forms/market-overview"
import { mockCoinsList, mockMarketOverview } from "@/shared/mocks/coins"
import { Layout } from "@/shared/ui/layout"

/**
 * Главная страница - Список монет + поиск
 */
export default function HomePage() {
	return (
		<Layout>
			<MarketOverview {...mockMarketOverview} />
			<CoinTable coins={mockCoinsList} />
		</Layout>
	)
}
