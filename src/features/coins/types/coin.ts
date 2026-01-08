export interface CoinListItem {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  market_cap_rank: number
  sparkline_in_7d?: { price: number[] }
}

export interface CoinDetail {
  id: string
  symbol: string
  name: string
  image: { large: string }
  description: { en: string }
  market_data: {
    current_price: { usd: number }
    market_cap: { usd: number }
    total_volume: { usd: number }
    high_24h: { usd: number }
    low_24h: { usd: number }
    price_change_percentage_24h: number
    circulating_supply: number
    total_supply: number
    max_supply: number
  }
}

