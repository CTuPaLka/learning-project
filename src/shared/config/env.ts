// Валидация env с Zod
import { z } from "zod"

const envSchema = z.object({
	VITE_COINGECKO_API_URL: z
		.string()
		.url()
		.default("https://api.coingecko.com/api/v3"),
	VITE_COINGECKO_API_KEY: z.string().optional(),
	MODE: z.enum(["development", "production"]).optional().default("development"),
})

export const env = envSchema.parse(import.meta.env)
