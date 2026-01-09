// Форматирование цен, дат

const CURRENCY_SYMBOLS = {
	usd: "$",
	eur: "€",
	rub: "₽",
} as const

type Currency = keyof typeof CURRENCY_SYMBOLS

export const format = {
	price: (price: number, currency: Currency = "usd"): string => {
		const symbol = CURRENCY_SYMBOLS[currency]

		if (price >= 1_000_000) return `${symbol}${(price / 1_000_000).toFixed(2)}M`
		if (price >= 1_000) return `${symbol}${(price / 1_000).toFixed(2)}K`
		return `${symbol}${price.toFixed(2)}`
	},

	percentage: (value: number): string => {
		const formatted = value.toFixed(2)
		return value >= 0 ? `+${formatted}%` : `${formatted}%`
	},

	number: (value: number): string => {
		return new Intl.NumberFormat("en-US").format(value)
	},
}
