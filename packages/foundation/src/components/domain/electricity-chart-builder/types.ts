import type { TailLogDataItem } from '../../../types/tail-log'

export type ChartLine = {
  backendAttribute: string
  [key: string]: unknown
}

export type ChartDataPayload = {
  lines: ChartLine[]
  valueDecimals?: number
  unit?: string
  currentValueLabel?: {
    backendAttribute?: string
  }
  [key: string]: unknown
}

export type ElectricityChartBuilderProps = {
  chartDataPayload?: ChartDataPayload
  dateRange?: { start: number; end: number } | null
  statKey?: string
  showGaps?: boolean
  statistics?: Array<{ label: string; value: string | number; [key: string]: unknown }>
  statisticsItemsPerCol?: number
  queryItemsLimit?: number
  onElectricityDataChange?: (data: TailLogDataItem[]) => void
  chartTitle?: string | null
}
