import type { ReactNode } from 'react'

export type DatasetItem = {
  label: string
  borderColor?: string
  legendIcon?: ReactNode
  currentValue?: {
    value?: number
    unit?: string
    realValue?: number
  }
  yesterdayAvg?: {
    realValue?: number
    [key: string]: unknown
  }
}

export type ChartData = {
  datasets?: DatasetItem[]
  [key: string]: unknown
}
