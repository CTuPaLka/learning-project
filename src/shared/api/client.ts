import axios from "axios"
import { env } from "@/shared/config/env"

export const coinGeckoApi = axios.create({
	baseURL: env.VITE_COINGECKO_API_URL,
	headers: env.VITE_COINGECKO_API_KEY
		? { "x-cg-demo-api-key": env.VITE_COINGECKO_API_KEY }
		: {},
})
