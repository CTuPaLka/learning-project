import type { CoinListItem, CoinDetail, ChartDataPoint } from '../types/coin'

// Моковые данные для списка монет
export const mockCoinsList: CoinListItem[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 45123.45,
    price_change_percentage_24h: 2.5,
    market_cap: 880000000000,
    total_volume: 25000000000,
    market_cap_rank: 1,
    sparkline_in_7d: {
      price: [43000, 43500, 44000, 43800, 44500, 45000, 45123]
    }
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 2345.67,
    price_change_percentage_24h: -1.2,
    market_cap: 280000000000,
    total_volume: 15000000000,
    market_cap_rank: 2,
    sparkline_in_7d: {
      price: [2400, 2380, 2350, 2360, 2340, 2330, 2345]
    }
  },
  {
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png',
    current_price: 1.0,
    price_change_percentage_24h: 0.01,
    market_cap: 95000000000,
    total_volume: 45000000000,
    market_cap_rank: 3,
    sparkline_in_7d: {
      price: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
    }
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 98.76,
    price_change_percentage_24h: 5.3,
    market_cap: 42000000000,
    total_volume: 2800000000,
    market_cap_rank: 4,
    sparkline_in_7d: {
      price: [92, 94, 95, 93, 96, 97, 98.76]
    }
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 0.52,
    price_change_percentage_24h: -0.8,
    market_cap: 18500000000,
    total_volume: 780000000,
    market_cap_rank: 5,
    sparkline_in_7d: {
      price: [0.53, 0.52, 0.51, 0.52, 0.53, 0.52, 0.52]
    }
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 0.62,
    price_change_percentage_24h: 1.5,
    market_cap: 33000000000,
    total_volume: 1200000000,
    market_cap_rank: 6,
    sparkline_in_7d: {
      price: [0.60, 0.61, 0.60, 0.61, 0.62, 0.62, 0.62]
    }
  },
  {
    id: 'polkadot',
    symbol: 'dot',
    name: 'Polkadot',
    image: 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png',
    current_price: 7.23,
    price_change_percentage_24h: 3.2,
    market_cap: 9500000000,
    total_volume: 340000000,
    market_cap_rank: 7,
    sparkline_in_7d: {
      price: [7.0, 7.1, 7.05, 7.15, 7.2, 7.18, 7.23]
    }
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    image: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png',
    current_price: 0.085,
    price_change_percentage_24h: -2.1,
    market_cap: 12000000000,
    total_volume: 890000000,
    market_cap_rank: 8,
    sparkline_in_7d: {
      price: [0.087, 0.086, 0.087, 0.085, 0.084, 0.085, 0.085]
    }
  },
  {
    id: 'avalanche',
    symbol: 'avax',
    name: 'Avalanche',
    image: 'https://coin-images.coingecko.com/coins/images/12559/large/avalanche.png',
    current_price: 36.45,
    price_change_percentage_24h: 4.7,
    market_cap: 14000000000,
    total_volume: 650000000,
    market_cap_rank: 9,
    sparkline_in_7d: {
      price: [34, 35, 34.5, 35.5, 36, 36.2, 36.45]
    }
  },
  {
    id: 'chainlink',
    symbol: 'link',
    name: 'Chainlink',
    image: 'https://coin-images.coingecko.com/coins/images/877/large/chainlink.png',
    current_price: 14.56,
    price_change_percentage_24h: 1.8,
    market_cap: 8500000000,
    total_volume: 420000000,
    market_cap_rank: 10,
    sparkline_in_7d: {
      price: [14.2, 14.3, 14.1, 14.4, 14.5, 14.52, 14.56]
    }
  }
]

// Детальная информация о Bitcoin
export const mockBitcoinDetail: CoinDetail = {
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: {
    large: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  description: {
    en: 'Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process. Bitcoin is changing the way we see money as we speak.'
  },
  market_data: {
    current_price: { usd: 45123.45 },
    market_cap: { usd: 880000000000 },
    total_volume: { usd: 25000000000 },
    high_24h: { usd: 46000 },
    low_24h: { usd: 44500 },
    price_change_percentage_24h: 2.5,
    circulating_supply: 19500000,
    total_supply: 21000000,
    max_supply: 21000000
  }
}

// Детальная информация о Ethereum
export const mockEthereumDetail: CoinDetail = {
  id: 'ethereum',
  symbol: 'eth',
  name: 'Ethereum',
  image: {
    large: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png'
  },
  description: {
    en: 'Ethereum is a decentralized open-source blockchain system that features its own cryptocurrency, Ether. ETH works as a platform for numerous other cryptocurrencies, as well as for the execution of decentralized smart contracts.'
  },
  market_data: {
    current_price: { usd: 2345.67 },
    market_cap: { usd: 280000000000 },
    total_volume: { usd: 15000000000 },
    high_24h: { usd: 2400 },
    low_24h: { usd: 2320 },
    price_change_percentage_24h: -1.2,
    circulating_supply: 120000000,
    total_supply: 120000000,
    max_supply: 0
  }
}

// Данные для графика Bitcoin (7 дней)
export const mockBitcoinChartData: ChartDataPoint[] = [
  { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, price: 43000 },
  { timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, price: 43500 },
  { timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, price: 44000 },
  { timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, price: 43800 },
  { timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, price: 44500 },
  { timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, price: 45000 },
  { timestamp: Date.now(), price: 45123 }
]

// Общая рыночная статистика
export const mockMarketOverview = {
  totalMarketCap: 1850000000000,
  totalVolume24h: 92000000000,
  btcDominance: 47.5,
  activeCryptocurrencies: 12500
}

