import { memo, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Button } from '@/shared/ui/button'
import type { ChartDataPoint, ChartPeriod } from '../../../types'
import styles from './price-chart.module.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface PriceChartProps {
  data: ChartDataPoint[]
  selectedPeriod: ChartPeriod
  onPeriodChange?: (period: ChartPeriod) => void
  disabled?: boolean
}

const periods: ChartPeriod[] = ['1D', '7D', '1M', '3M', '1Y', 'ALL']

export const PriceChart = memo(({
  data,
  selectedPeriod,
  onPeriodChange,
  disabled
}: PriceChartProps) => {
  const chartData = useMemo(() => {
    const labels = data.map(point => 
      new Date(point.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    )
    
    const prices = data.map(point => point.price)

    return {
      labels,
      datasets: [
        {
          label: 'Price',
          data: prices,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          tension: 0.4
        }
      ]
    }
  }, [data])

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Price: $${context.parsed.y.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString()
          }
        }
      }
    }
  }), [])

  return (
    <div className={styles.priceChart}>
      <div className={styles.priceChart__header}>
        <h2 className={styles.priceChart__title}>Price Chart</h2>
        <div className={styles.priceChart__periods}>
          {periods.map(period => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onPeriodChange?.(period)}
              disabled={disabled}
              className={styles.priceChart__periodButton}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>
      
      <div className={styles.priceChart__chartContainer}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
})

PriceChart.displayName = 'PriceChart'

