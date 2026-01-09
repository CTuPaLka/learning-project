import z from "zod"

// Схема для монеты в списке
export const coinListItemSchema = z.array(
	z.object({
		id: z.string(), // "bitcoin"
		symbol: z.string(), // "btc"
		name: z.string(), // "Bitcoin"

		// Изображение — просто строка (URL), НЕ объект!
		image: z.string().url(), // "https://assets.../large/bitcoin.png..."

		current_price: z.number().nullable(), // 70187 или null
		market_cap: z.number().nullable(),
		market_cap_rank: z.number().nullable(), // 1, 2, ...
		fully_diluted_valuation: z.number().nullable(),
		total_volume: z.number().nullable(),

		high_24h: z.number().nullable(),
		low_24h: z.number().nullable(),

		price_change_24h: z.number().nullable(),
		price_change_percentage_24h: z.number().nullable(),

		market_cap_change_24h: z.number().nullable(),
		market_cap_change_percentage_24h: z.number().nullable(),

		circulating_supply: z.number().nullable(),
		total_supply: z.number().nullable(),
		max_supply: z.number().nullable(),

		ath: z.number().nullable(),
		ath_change_percentage: z.number().nullable(),
		ath_date: z.iso.datetime().nullable(),

		atl: z.number().nullable(),
		atl_change_percentage: z.number().nullable(),
		atl_date: z.iso.datetime().nullable(),

		roi: z
			.object({
				times: z.number(),
				currency: z.string(),
				percentage: z.number(),
			})
			.nullable()
			.optional(),

		last_updated: z.iso.datetime(),
	})
)

export type CoinListItem = z.infer<typeof coinListItemSchema>

// Схема для детальной информации
export const coinDetailSchema = z.object({
	id: z.string(),
	symbol: z.string(),
	name: z.string(),
	description: z.object({ en: z.string() }),
	image: z
		.object({
			large: z.string().url(),
		})
		.optional(),
	market_data: z
		.object({
			current_price: z.record(z.string(), z.number()),
			market_cap: z.record(z.string(), z.number()),
			total_volume: z.record(z.string(), z.number()),
			price_change_percentage_24h: z.number(),
			high_24h: z.record(z.string(), z.number()),
			low_24h: z.record(z.string(), z.number()),
			circulating_supply: z.number().nullable(),
			total_supply: z.number().nullable(),
		})
		.optional(),
	market_cap_rank: z.number().optional(),
	last_updated: z.string().optional(),
})

export type CoinDetail = z.infer<typeof coinDetailSchema>

// Схема для графика
export const chartDataSchema = z.object({
	prices: z.array(z.tuple([z.number(), z.number()])),
})

export type ChartData = z.infer<typeof chartDataSchema>
