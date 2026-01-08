import type { PriceAlert } from '@/features/alerts/types'

export const mockAlerts: PriceAlert[] = [
  {
    id: '1',
    coinId: 'bitcoin',
    coinName: 'Bitcoin',
    coinSymbol: 'BTC',
    coinImage: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
    currentPrice: 45123.45,
    targetPrice: 50000,
    condition: 'above',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    coinId: 'ethereum',
    coinName: 'Ethereum',
    coinSymbol: 'ETH',
    coinImage: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
    currentPrice: 2345.67,
    targetPrice: 2000,
    condition: 'below',
    isActive: true,
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    coinId: 'solana',
    coinName: 'Solana',
    coinSymbol: 'SOL',
    coinImage: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
    currentPrice: 98.76,
    targetPrice: 100,
    condition: 'above',
    isActive: false,
    createdAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '4',
    coinId: 'cardano',
    coinName: 'Cardano',
    coinSymbol: 'ADA',
    coinImage: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png',
    currentPrice: 0.52,
    targetPrice: 0.6,
    condition: 'above',
    isActive: true,
    createdAt: '2024-02-10T16:45:00Z'
  },
  {
    id: '5',
    coinId: 'ripple',
    coinName: 'XRP',
    coinSymbol: 'XRP',
    coinImage: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    currentPrice: 0.62,
    targetPrice: 0.5,
    condition: 'below',
    isActive: false,
    createdAt: '2024-02-15T11:20:00Z'
  }
]

