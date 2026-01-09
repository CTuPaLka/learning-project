import { queryKeys } from "@/shared/api/query-keys"
import { useQuery } from "@tanstack/react-query"
import { coinsApi } from "./coins-api"

export const useCoins = (params?: { currency?: string; page?: number }) => {
	return useQuery({
		queryKey: queryKeys.coins.list(params),
		queryFn: () => coinsApi.getCoins(params),
	})
}

export const useCoinDetail = (id: string) => {
	return useQuery({
		queryKey: queryKeys.coins.detail(id),
		queryFn: () => coinsApi.getCoinById(id),
		enabled: !!id,
	})
}

export const useChartData = (id: string, days: string = "7") => {
	return useQuery({
		queryKey: queryKeys.coins.chart(id, days),
		queryFn: () => coinsApi.getChartData(id, days),
		enabled: !!id,
		refetchInterval: 60000, // Обновление каждую минуту
	})
}
