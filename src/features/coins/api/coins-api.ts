import { coinGeckoApi } from "@/shared/api/client"
import { z } from "zod"
import {
	chartDataSchema,
	coinDetailSchema,
	coinListItemSchema,
} from "./schemas"

export const coinsApi = {
	async getCoins(params: { currency?: string; page?: number } = {}) {
		const { data } = await coinGeckoApi.get("/coins/markets", {
			params: {
				vs_currency: params.currency || "usd",
				page: params.page || 1,
				per_page: 50,
			},
		})
		return z.array(coinListItemSchema).parse(data)
	},

	async getCoinById(id: string) {
		const { data } = await coinGeckoApi.get(`/coins/${id}`)
		return coinDetailSchema.parse(data)
	},

	async getChartData(id: string, days: string = "7") {
		const { data } = await coinGeckoApi.get(`/coins/${id}/market_chart`, {
			params: { vs_currency: "usd", days },
		})
		return chartDataSchema.parse(data)
	},
}
