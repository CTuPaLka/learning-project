// Query Keys Factory

export const queryKeys = {
	coins: {
		all: () => ["coins"] as const,
		list: (params?: { currency?: string; page?: number }) =>
			["coins", "list", params] as const,
		detail: (id: string) => ["coins", id] as const,
		chart: (id: string, days: string) => ["coins", id, "chart", days] as const,
	},
	portfolio: {
		all: () => ["portfolio"] as const,
		summary: () => ["portfolio", "summary"] as const,
	},
	alerts: {
		all: () => ["alerts"] as const,
	},
}
