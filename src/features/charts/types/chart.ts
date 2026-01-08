export interface ChartDataPoint {
  timestamp: number
  price: number
}

export type ChartPeriod = '1D' | '7D' | '1M' | '3M' | '1Y' | 'ALL'

