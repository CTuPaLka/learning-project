# Crypto Tracker - Полный план разработки

## 📋 TODO List

- [ ] **Этап 1: Настройка проекта** (setup-project)
  - Установить зависимости ✅
  - Настроить QueryClient, env валидацию, Query Keys Factory
- [ ] **Этап 2: CoinGecko API интеграция** (coingecko-integration)
  - Создать Zod схемы для API
  - Создать API функции
  - Создать кастомные Query хуки
- [ ] **Этап 3: Portfolio Backend** (portfolio-backend)
  - Реализовать имитацию backend через localStorage с Zod валидацией
- [ ] **Этап 4: Portfolio Queries** (portfolio-queries)
  - Создать Query и Mutation хуки с оптимистичными обновлениями
- [ ] **Этап 5: Zustand Store** (zustand-store)
  - Настроить Vanilla Zustand store с Context, persist и devtools middleware
- [ ] **Этап 6: UI - Список монет** (ui-coins-list)
  - Создать страницу с поиском, infinite scroll и prefetching
- [ ] **Этап 7: UI - Детали монеты** (ui-coin-details)
  - Создать страницу с графиками и зависимыми запросами
- [ ] **Этап 8: UI - Portfolio** (ui-portfolio)
  - Создать портфолио с формой (React Hook Form + Zod), расчетами и сортировкой
- [ ] **Этап 9: Alerts Feature** (alerts-feature)
  - Реализовать функционал алертов (API, хуки, UI)
- [ ] **Этап 10: Оптимизация** (optimization)
  - Error boundaries, loading states, useShallow, DevTools проверка

---

## 🔗 Необходимые ресурсы

### API и документация

- **CoinGecko API**: https://docs.coingecko.com/reference/introduction
- **Demo API** (без ключа): https://api.coingecko.com/api/v3
- **Регистрация для ключа**: https://www.coingecko.com/en/api/pricing (опционально)
- **coinGecko**: https://www.coingecko.com/en/portfolio

### Технологии (документация)

- **TanStack Query v5**: https://tanstack.com/query/latest/docs/react/overview
- **Zod v3**: https://zod.dev/
- **Zustand v5**: https://zustand-demo.pmnd.rs/
- **React Hook Form**: https://react-hook-form.com/
- **Recharts**: https://recharts.org/
- **date-fns**: https://date-fns.org/

### UI/UX Дизайн макеты

1. используем пример CoinGecko сайта

### Дополнительные инструменты

- **React Query DevTools**: встроено в TanStack Query
- **Zustand DevTools**: `zustand/middleware` для отладки

---

## 🏗 Архитектура проекта

### Структура папок

```
src/
├── app/
│   ├── providers/
│   │   ├── query-provider.tsx       # QueryClient setup
│   │   └── app-providers.tsx        # Все providers
│   ├── router/
│   │   └── index.tsx                # React Router setup
│   └── App.tsx
├── pages/
│   ├── home/
│   │   └── index.tsx                # Список монет + поиск
│   ├── coin-details/
│   │   └── [id].tsx                 # Детали монеты
│   ├── portfolio/
│   │   └── index.tsx                # Портфолио пользователя
│   └── alerts/
│       └── index.tsx                # Алерты по ценам
├── features/
│   ├── coins/
│   │   ├── api/
│   │   │   ├── coins-api.ts         # CoinGecko API функции
│   │   │   ├── use-coins.ts         # useQuery хуки
│   │   │   └── schemas.ts           # Zod схемы для API
│   │   ├── ui/
│   │   │   ├── coin-list.tsx
│   │   │   ├── coin-card.tsx
│   │   │   └── coin-search.tsx
│   │   └── model/
│   │       └── types.ts
│   ├── portfolio/
│   │   ├── api/
│   │   │   ├── portfolio-api.ts     # Имитация backend (localStorage)
│   │   │   ├── use-portfolio.ts     # useQuery + useMutation
│   │   │   └── schemas.ts           # Zod валидация
│   │   ├── ui/
│   │   │   ├── portfolio-list.tsx
│   │   │   ├── add-coin-form.tsx
│   │   │   └── portfolio-summary.tsx
│   │   └── store/
│   │       ├── store.ts             # Zustand store
│   │       ├── provider.tsx         # Context + Provider
│   │       ├── types.ts
│   │       └── selectors.ts
│   ├── alerts/
│   │   ├── api/                     # Аналогично portfolio
│   │   ├── ui/
│   │   └── store/
│   └── charts/
│       ├── api/
│       │   ├── chart-api.ts
│       │   └── use-chart-data.ts
│       └── ui/
│           └── price-chart.tsx
├── shared/
│   ├── api/
│   │   ├── client.ts                # Axios instance
│   │   └── query-keys.ts            # Query Keys Factory
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...                      # Базовые компоненты
│   ├── lib/
│   │   ├── format.ts                # Форматирование цен, дат
│   │   └── storage.ts               # LocalStorage утилиты с Zod
│   └── config/
│       ├── env.ts                   # Валидация env с Zod
│       └── query-client.ts          # QueryClient конфигурация
└── main.tsx
```

---

## 📚 Детальный план по этапам

### **Этап 1: Настройка проекта и базовая конфигурация** (День 1)

#### 1.1 Инициализация

Установить зависимости:

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
pnpm add zustand zod
pnpm add react-hook-form @hookform/resolvers
pnpm add axios date-fns recharts
pnpm add react-router-dom
```

#### 1.2 Настройка TanStack Query

Создать `src/shared/config/query-client.ts`:

```typescript
import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60, // 1 минута
			gcTime: 1000 * 60 * 5, // 5 минут
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
})
```

**Паттерны из TANSTACK_QUERY_LEARNING_PLAN.md:** Этап 3 - Конфигурация QueryClient

#### 1.3 Query Keys Factory

Создать `src/shared/api/query-keys.ts`:

```typescript
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
} as const
```

**Паттерны:** Этап 2 - Query Keys Factory Pattern

#### 1.4 Валидация env с Zod

Создать `src/shared/config/env.ts`:

```typescript
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
```

**Паттерны из ZOD_LEARNING_PLAN.md:** Уровень 5.1 - Валидация переменных окружения

#### 1.5 Axios client

Создать `src/shared/api/client.ts`:

```typescript
import axios from "axios"
import { env } from "@/shared/config/env"

export const coinGeckoApi = axios.create({
	baseURL: env.VITE_COINGECKO_API_URL,
	headers: env.VITE_COINGECKO_API_KEY
		? { "x-cg-demo-api-key": env.VITE_COINGECKO_API_KEY }
		: {},
})
```

#### 1.6 Query Provider

Создать `src/app/providers/query-provider.tsx`:

```typescript
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/shared/config/query-client"
import type { ReactNode } from "react"

interface QueryProviderProps {
	children: ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
```

#### 1.7 Утилиты форматирования

Создать `src/shared/lib/format.ts`:

```typescript
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
```

---

### **Этап 2: CoinGecko API интеграция** (День 2-3)

#### 2.1 Zod схемы для API

Создать `src/features/coins/api/schemas.ts`:

```typescript
import { z } from "zod"

// Схема для монеты в списке
export const coinListItemSchema = z.object({
	id: z.string(),
	symbol: z.string(),
	name: z.string(),
	image: z.string().url(),
	current_price: z.number().nullable(),
	market_cap: z.number().nullable(),
	market_cap_rank: z.number().nullable(),
	price_change_percentage_24h: z.number().nullable(),
	total_volume: z.number().nullable(),
})

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
			current_price: z.record(z.number()),
			market_cap: z.record(z.number()),
			total_volume: z.record(z.number()),
			price_change_percentage_24h: z.number(),
			high_24h: z.record(z.number()),
			low_24h: z.record(z.number()),
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
```

**Паттерны:** Уровень 3 - Композиция схем, Уровень 5.2 - Валидация API-ответов

#### 2.2 API функции

Создать `src/features/coins/api/coins-api.ts`:

```typescript
import { coinGeckoApi } from "@/shared/api/client"
import {
	coinListItemSchema,
	coinDetailSchema,
	chartDataSchema,
} from "./schemas"
import { z } from "zod"

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
```

#### 2.3 Кастомные Query хуки

Создать `src/features/coins/api/use-coins.ts`:

```typescript
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api/query-keys"
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
```

**Паттерны:** Этап 4 - Кастомные хуки, Этап 7.1 - Dependent Queries

---

### **Этап 3: Имитация Backend для Portfolio** (День 3-4)

#### 3.1 LocalStorage утилита с Zod

Создать `src/shared/lib/storage.ts`:

```typescript
import { z } from "zod"

export class LocalStorageService<T> {
	constructor(
		private key: string,
		private schema: z.ZodType<T>,
		private fallback: T
	) {}

	get(): T {
		try {
			const item = localStorage.getItem(this.key)
			if (!item) return this.fallback

			const parsed = JSON.parse(item)
			const validated = this.schema.safeParse(parsed)

			if (!validated.success) {
				console.warn("LocalStorage validation failed:", validated.error)
				return this.fallback
			}

			return validated.data
		} catch {
			return this.fallback
		}
	}

	set(value: T): void {
		const validated = this.schema.parse(value)
		localStorage.setItem(this.key, JSON.stringify(validated))
	}

	remove(): void {
		localStorage.removeItem(this.key)
	}
}
```

**Паттерны:** ZOD Уровень 5.4 - Валидация localStorage

#### 3.2 Portfolio Zod схемы

Создать `src/features/portfolio/api/schemas.ts`:

```typescript
import { z } from "zod"

export const portfolioCoinSchema = z.object({
	id: z.string(),
	coinId: z.string(),
	amount: z.number().positive(),
	buyPrice: z.number().positive().optional(),
	note: z.string().optional(),
	createdAt: z.string().datetime(),
})

export type PortfolioCoin = z.infer<typeof portfolioCoinSchema>

export const addPortfolioCoinSchema = z.object({
	coinId: z.string().min(1, "Выберите монету"),
	amount: z.number().positive("Количество должно быть больше 0"),
	buyPrice: z.number().positive().optional(),
	note: z.string().max(200).optional(),
})

export type AddPortfolioCoinInput = z.infer<typeof addPortfolioCoinSchema>
```

#### 3.3 Portfolio API (имитация backend)

Создать `src/features/portfolio/api/portfolio-api.ts`:

```typescript
import { LocalStorageService } from "@/shared/lib/storage"
import { z } from "zod"
import {
	portfolioCoinSchema,
	type PortfolioCoin,
	type AddPortfolioCoinInput,
} from "./schemas"

const storage = new LocalStorageService(
	"crypto-portfolio",
	z.array(portfolioCoinSchema),
	[]
)

// Имитация задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const portfolioApi = {
	async getAll(): Promise<PortfolioCoin[]> {
		await delay(300)
		return storage.get()
	},

	async add(input: AddPortfolioCoinInput): Promise<PortfolioCoin> {
		await delay(500)

		const current = storage.get()
		const newCoin: PortfolioCoin = {
			id: crypto.randomUUID(),
			...input,
			createdAt: new Date().toISOString(),
		}

		storage.set([...current, newCoin])
		return newCoin
	},

	async update(
		id: string,
		input: Partial<AddPortfolioCoinInput>
	): Promise<PortfolioCoin> {
		await delay(500)

		const current = storage.get()
		const index = current.findIndex(c => c.id === id)

		if (index === -1) throw new Error("Coin not found")

		const updated = { ...current[index], ...input }
		current[index] = updated
		storage.set(current)

		return updated
	},

	async remove(id: string): Promise<void> {
		await delay(300)

		const current = storage.get()
		storage.set(current.filter(c => c.id !== id))
	},
}
```

---

### **Этап 4: Portfolio Query хуки** (День 4)

Создать `src/features/portfolio/api/use-portfolio.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api/query-keys"
import { portfolioApi } from "./portfolio-api"
import type { AddPortfolioCoinInput } from "./schemas"

export const usePortfolio = () => {
	return useQuery({
		queryKey: queryKeys.portfolio.all(),
		queryFn: portfolioApi.getAll,
	})
}

export const useAddPortfolioCoin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (input: AddPortfolioCoinInput) => portfolioApi.add(input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.portfolio.all() })
		},
	})
}

export const useUpdatePortfolioCoin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: string
			input: Partial<AddPortfolioCoinInput>
		}) => portfolioApi.update(id, input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.portfolio.all() })
		},
	})
}

export const useRemovePortfolioCoin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => portfolioApi.remove(id),
		// Оптимистичное удаление
		onMutate: async id => {
			await queryClient.cancelQueries({ queryKey: queryKeys.portfolio.all() })

			const previous = queryClient.getQueryData(queryKeys.portfolio.all())

			queryClient.setQueryData(queryKeys.portfolio.all(), (old: any) =>
				old?.filter((coin: any) => coin.id !== id)
			)

			return { previous }
		},
		onError: (err, id, context) => {
			queryClient.setQueryData(queryKeys.portfolio.all(), context?.previous)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.portfolio.all() })
		},
	})
}
```

**Паттерны:** Этап 5 - Mutations и оптимистичные обновления

---

### **Этап 5: Zustand Store для UI состояния** (День 4-5)

#### 5.1 Создание Vanilla Store - Types

Создать `src/features/portfolio/store/types.ts`:

```typescript
export interface State {
	currency: "usd" | "eur" | "rub"
	sortBy: "value" | "amount" | "name"
	viewMode: "grid" | "list"
}

export interface Actions {
	actions: {
		setCurrency: (currency: State["currency"]) => void
		setSortBy: (sortBy: State["sortBy"]) => void
		setViewMode: (viewMode: State["viewMode"]) => void
	}
}

export type Store = State & Actions
```

#### 5.2 Store

Создать `src/features/portfolio/store/store.ts`:

```typescript
import { createStore as createZustandStore } from "zustand/vanilla"
import { devtools, persist } from "zustand/middleware"
import type { Store, State } from "./types"

const initialState: State = {
	currency: "usd",
	sortBy: "value",
	viewMode: "grid",
}

export const createStore = (init: Partial<State> = {}) =>
	createZustandStore<Store>()(
		devtools(
			persist(
				set => ({
					...initialState,
					...init,
					actions: {
						setCurrency: currency => set({ currency }),
						setSortBy: sortBy => set({ sortBy }),
						setViewMode: viewMode => set({ viewMode }),
					},
				}),
				{ name: "portfolio-settings" }
			),
			{ name: "portfolio" }
		)
	)
```

**Паттерны из ZUSTAND_LEARNING_PLAN.md:** Этап 3 - Vanilla Store, Этап 4 - Middleware (devtools + persist)

#### 5.3 Context Provider

Создать `src/features/portfolio/store/provider.tsx`:

```typescript
import { createContext, useContext, useRef, type ReactNode } from "react"
import { useStore as useZustandStore } from "zustand"
import { createStore } from "./store"
import type { Store } from "./types"

type StoreAPI = ReturnType<typeof createStore>

const StoreContext = createContext<StoreAPI | null>(null)

export const PortfolioStoreProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const storeRef = useRef<StoreAPI>()

	if (!storeRef.current) {
		storeRef.current = createStore()
	}

	return (
		<StoreContext.Provider value={storeRef.current}>
			{children}
		</StoreContext.Provider>
	)
}

export const usePortfolioStore = <T>(selector: (store: Store) => T): T => {
	const context = useContext(StoreContext)
	if (!context)
		throw new Error(
			"usePortfolioStore must be used within PortfolioStoreProvider"
		)
	return useZustandStore(context, selector)
}
```

#### 5.4 Селекторы

Создать `src/features/portfolio/store/selectors.ts`:

```typescript
import type { Store } from "./types"

export const selectCurrency = (s: Store) => s.currency
export const selectSortBy = (s: Store) => s.sortBy
export const selectViewMode = (s: Store) => s.viewMode
export const selectActions = (s: Store) => s.actions
```

**Паттерны:** Этап 5 - Оптимизация с селекторами

---

### **Этап 6: UI Компоненты** (День 5-7)

#### 6.1 Страница списка монет

- Компонент поиска с debounce
- Infinite scroll для списка
- Prefetching при hover на карточке

**Паттерны:** Этап 7.3 - Infinite Queries, Этап 7.4 - Prefetching

#### 6.2 Страница деталей монеты

- График цен (Recharts)
- Зависимые запросы (детали → график)
- Кнопка добавления в портфолио

**Паттерны:** Этап 7.1 - Dependent Queries

#### 6.3 Форма добавления в портфолио

- React Hook Form + Zod resolver
- Валидация с кастомными сообщениями

**Паттерны:** ZOD Уровень 5.3 - React Hook Form интеграция

#### 6.4 Страница портфолио

- Расчет общей стоимости (текущая цена × количество)
- Сортировка через Zustand
- Оптимистичное удаление

---

### **Этап 7: Alerts Feature** (День 7-8)

Аналогично Portfolio - создать:

- API (localStorage)
- Zod схемы
- Query хуки с mutations
- UI компоненты

---

### **Этап 8: Оптимизация и полировка** (День 8-9)

- Error boundaries
- Loading скелетоны
- DevTools настройка
- useShallow для оптимизации
- Тестирование всех сценариев

---

## 🎓 Покрытие паттернов из Learning Plans

### TanStack Query (100%)

- ✅ Query Keys Factory (Этап 2)
- ✅ Кастомные хуки (Этап 4)
- ✅ QueryClient конфигурация (Этап 3)
- ✅ Mutations (Этап 5)
- ✅ Оптимистичные обновления (Этап 5)
- ✅ Инвалидация кеша (Этап 6)
- ✅ Dependent Queries (Этап 7.1)
- ✅ Infinite Queries (Этап 7.3)
- ✅ Prefetching (Этап 7.4)
- ✅ DevTools (Этап 8)

### Zod (100%)

- ✅ Базовые типы и валидация (Уровень 1-2)
- ✅ Композиция схем (Уровень 4)
- ✅ .refine() и .superRefine() (Уровень 3)
- ✅ Валидация env (Уровень 5.1)
- ✅ Валидация API (Уровень 5.2)
- ✅ React Hook Form (Уровень 5.3)
- ✅ LocalStorage (Уровень 5.4)

### Zustand (100%)

- ✅ Vanilla Store API (Этап 3)
- ✅ Context интеграция (Этап 3.2)
- ✅ TypeScript типизация (Этап 2)
- ✅ Middleware (devtools + persist) (Этап 4)
- ✅ Селекторы (Этап 5)
- ✅ useShallow (Этап 5)

---

## 🎯 Следующие шаги после изучения

1. Выбрать дизайн из предложенных макетов
2. Начать с Этапа 1 (настройка)
3. Двигаться последовательно через этапы
4. Постоянно тестировать в DevTools
5. Коммитить после каждого этапа
