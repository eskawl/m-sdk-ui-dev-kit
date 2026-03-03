import type { TailLogDataItem } from '../../../types/tail-log'
import {
  convertEnergyToRange,
  getRangeStatsKey,
  getUteEnergyAggrValue,
} from '../../../utils/electricity-utils'
import { getKunaEnergyAggr } from '../../../utils/reporting-tool-utils'
import _last from 'lodash/last'
import _head from 'lodash/head'
import _map from 'lodash/map'
import _isString from 'lodash/isString'
import { formatValueUnit, getTimeRange } from '@mining-sdk/core'
import type { TimeRangeType, UnknownRecord } from '@mining-sdk/core'
import type { ChartLine, ElectricityChartBuilderProps } from './types'
import { DATE_RANGE } from '../../../constants'
import { getDatasetsLineData } from './electricity-chart-builder.utils'

const VALUE_DECIMALS_DEFAULT = 3 // precision

export const ElectricityChartBuilder = ({
  chartDataPayload,
  dateRange = null,
  statKey = DATE_RANGE.H1,
  showGaps = true,
  statistics = [],
  statisticsItemsPerCol = 1,
  queryItemsLimit = undefined,
  onElectricityDataChange = undefined,
  chartTitle = null,
}: ElectricityChartBuilderProps): JSX.Element => {
  const getChartData = (
    data: TailLogDataItem[],
  ): {
    datasets: any[]
    footerStats: ElectricityChartBuilderProps['statistics']
    footerStatsItemsPerCol: number
    yTicksFormatter?: (value: number) => string
    timeRange?: TimeRangeType
    currentValueLabel?: {
      decimals: number
      unit?: string | number
      value?: number
    }
  } => {
    if (!chartDataPayload) {
      return {
        datasets: [],
        footerStats: statistics,
        footerStatsItemsPerCol: statisticsItemsPerCol,
      }
    }

    const validData = data.filter(
      (item): item is TailLogDataItem & { ts: number } => item.ts !== undefined,
    )
    const kunaAggrData = getKunaEnergyAggr(validData)

    const convertedData = convertEnergyToRange(kunaAggrData)

    const datasetLinesData = getDatasetsLineData(convertedData)

    const lastItem = _last(data)

    const lastItemTs = lastItem?.ts
    const firstItemTs = _head(data)?.ts
    const timeRange = lastItemTs && firstItemTs ? getTimeRange(lastItemTs, firstItemTs) : undefined

    const decimals = chartDataPayload.valueDecimals || VALUE_DECIMALS_DEFAULT

    return {
      yTicksFormatter: (value: number) =>
        formatValueUnit(value, chartDataPayload.unit ?? '', {
          maximumSignificantDigits: undefined,
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }),
      timeRange,
      currentValueLabel: {
        value: getUteEnergyAggrValue(lastItem as UnknownRecord, {
          valueKey: chartDataPayload.currentValueLabel?.backendAttribute,
        }),
        unit: chartDataPayload.unit,
        decimals,
      },
      datasets: _map(chartDataPayload.lines, (line: ChartLine, index: number) => ({
        type: 'line',
        label: (line.label ?? '') as string,
        data: datasetLinesData[index],
        borderColor: (line.borderColor ?? '') as string,
        borderWidth: (line.borderWidth ?? 2) as number,
        pointRadius: 1,
      })),
      footerStats: statistics,
      footerStatsItemsPerCol: statisticsItemsPerCol,
    }
  }

  return (
    <div>
      <LineChartCard
        title={chartTitle}
        tag="t-electricity"
        statKey={
          statKey && _isString(statKey)
            ? getRangeStatsKey(statKey as Parameters<typeof getRangeStatsKey>[0])
            : undefined
        }
        skipPolling
        skipUpdates
        type="electricity"
        dataAdapter={getChartData}
        dateRange={dateRange}
        showGaps={showGaps}
        queryLimit={queryItemsLimit}
        onTailLogDataChange={onElectricityDataChange}
        groupRange={statKey}
      />
    </div>
  )
}
