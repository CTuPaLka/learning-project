export interface PriceAlert {
  id: string
  coinId: string
  coinName: string
  coinSymbol: string
  coinImage: string
  currentPrice: number
  targetPrice: number
  condition: 'above' | 'below'
  isActive: boolean
  createdAt: string
}

