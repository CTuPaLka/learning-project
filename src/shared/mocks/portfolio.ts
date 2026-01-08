import type { PortfolioCoin } from '@/features/portfolio/types'

export const mockPortfolioCoins: PortfolioCoin[] = [
  {
    id: '1',
    coinId: 'bitcoin',
    coinName: 'Bitcoin',
    coinSymbol: 'BTC',
    coinImage: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
    amount: 0.5,
    buyPrice: 40000,
    currentPrice: 45123.45,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    coinId: 'ethereum',
    coinName: 'Ethereum',
    coinSymbol: 'ETH',
    coinImage: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
    amount: 5,
    buyPrice: 2200,
    currentPrice: 2345.67,
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    coinId: 'solana',
    coinName: 'Solana',
    coinSymbol: 'SOL',
    coinImage: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
    amount: 20,
    buyPrice: 95,
    currentPrice: 98.76,
    createdAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '4',
    coinId: 'cardano',
    coinName: 'Cardano',
    coinSymbol: 'ADA',
    coinImage: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png',
    amount: 1000,
    buyPrice: 0.55,
    currentPrice: 0.52,
    createdAt: '2024-02-10T16:45:00Z'
  },
  {
    id: '5',
    coinId: 'polkadot',
    coinName: 'Polkadot',
    coinSymbol: 'DOT',
    coinImage: 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png',
    amount: 50,
    buyPrice: 7.0,
    currentPrice: 7.23,
    createdAt: '2024-02-15T11:20:00Z'
  }
]

