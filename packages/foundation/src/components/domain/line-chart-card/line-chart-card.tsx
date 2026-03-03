import _filter from 'lodash/filter'
import _keyBy from 'lodash/keyBy'
import _map from 'lodash/map'
import _sortBy from 'lodash/sortBy'
import _values from 'lodash/values'
import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

import { CHART_MIN_HEIGHT, getTimelineDateFormat } from './helper'
import { LineChartCardContainer, LineChartContainer, NoDataContainer } from './LineChartCard.styles'
import { LineChart, withErrorBoundary } from '@mining-sdk/core'
import type { DateRange } from '@mining-sdk/core'
import { checkChartData } from '../../../utils/chart-utils'
import LineChartCardHeader from './line-chart-card-header'
import { ChartWrapper } from '../chart-wrapper'
import LineChartCardFooter from './line-chart-card-footer'
import type { RadioButton } from '../timeline-toggle'

type LineDataPoint = { x: number; y: number | null }
type LineDataset = {
  label?: string
  visible?: boolean
  borderColor: string
  borderWidth?: number
  data: LineDataPoint[]
  [key: string]: unknown
}
type LineChartData = { datasets: LineDataset[] }

type DatasetProp = {
  datasets: unknown[]
}

type ChartDataPoint = {
  ts: number
  [key: string]: unknown
}

type FooterStatItem = {
  label: string
  value: string | number
}

type MinMaxAvgData = {
  min?: number
  max?: number
  avg?: number
  [key: string]: unknown
}

type SecondaryValueLabel = {
  title?: string
  value?: string | number
  [key: string]: unknown
}

type LineChartWrapperProps = {
  tag?: string
  title?: string | null
  dataAdapter?: (data: unknown) => unknown
  radioButtons?: RadioButton[]
  dropdownItems?: unknown[]
  type?: string
  dataProcessor?: ((data: unknown) => unknown) | null
  priceFormatter?: ((value: number) => string) | null
  skipPolling?: boolean
  skipUpdates?: boolean
  isDetailLegends?: boolean
  chartRef?: RefObject<IChartApi | null>
  statKey?: string
  dateRange?: DateRange | null
  isRow?: boolean
  fields?: unknown
  aggrFields?: unknown
  groupRange?: unknown
  isFieldsCompulsory?: boolean
  isLoading?: boolean
  shouldResetZoom?: boolean
  queryLimit?: number
  onTailLogDataChange?: ((data: unknown) => void) | undefined
  aggrDaily?: boolean
  datasetProp?: DatasetProp | null
}

const LineChartWrapperComponent = ({
  title = null,
  dataAdapter = (data: unknown) => data,
  radioButtons = [],
  dataProcessor = null,
  priceFormatter = null,
  isDetailLegends = false,
  chartRef,
  statKey = '',
  isRow = false,
  isLoading = false,
  shouldResetZoom = true,
  datasetProp = null,
}: LineChartWrapperProps): JSX.Element => {
  const [legendHidden, setLegendHidden] = useState<Record<string, boolean>>({})
  const [timeline, setTimeline] = useState(statKey || '5m')
  const [end, setEnd] = useState<number | undefined>()
  const [dataset, setDataset] = useState<ChartDataPoint[]>([])
  // const time = useSubtractedTime(TIME.TEN_MINS, TIME.ONE_MIN)
  // const { from: startRange, to: endRange } = dateRange || {}
  // const chartReqParams: {
  //   key: string
  //   type: string
  //   tag: string
  //   fields?: string
  //   aggrFields?: string
  //   aggrDaily?: string
  // } = {
  //   key: `stat-${timeline}`,
  //   type,
  //   tag,
  // }
  // if (fields) chartReqParams.fields = JSON.stringify(fields)
  // if (aggrFields) chartReqParams.aggrFields = JSON.stringify(aggrFields)
  // if (aggrDaily) chartReqParams.aggrDaily = '1'

  // useEffect(() => {
  //   if (datasetProp) {
  //     setDataset((datasetProp.datasets || []) as ChartDataPoint[])
  //   }
  // }, [datasetProp])

  // const { data: tailLogData, isLoading } = useGetTailLogQuery(
  //   {
  //     ...chartReqParams,
  //     limit: queryLimit,
  //     // eslint-disable-next-line no-nested-ternary
  //     start: dateRange ? startRange : end ? end - timelineToMs(timeline) * queryLimit : undefined,
  //     end: dateRange ? endRange : end,
  //     groupRange,
  //   },
  //   { skip: !!datasetProp || (isFieldsCompulsory && _isEmpty(fields)) },
  // )

  // const { data: tailLogDataUpdates } = useGetTailLogQuery(
  //   {
  //     ...chartReqParams,
  //     limit: 1,
  //     start: time,
  //   },
  //   {
  //     pollingInterval: skipPolling ? undefined : POLLING_5s,
  //     skip: !!datasetProp || (isFieldsCompulsory && _isEmpty(fields)) || skipUpdates,
  //   },
  // )

  useEffect(() => {
    // const dataToProcess = datasetProp || _head(tailLogData)
    const dataToProcess = datasetProp // || _head(tailLogData)
    const processedData = dataProcessor ? dataProcessor(dataToProcess) : dataToProcess

    setDataset((state: ChartDataPoint[]) => {
      if (!end) return (processedData as ChartDataPoint[]) || []
      const dataArray = (processedData as ChartDataPoint[]) || []
      return _values({ ..._keyBy(state, 'ts'), ..._keyBy(dataArray, 'ts') }) as ChartDataPoint[]
    })
  }, [end, dataProcessor, datasetProp])

  // useEffect(() => {
  //   const updatedData = _head(tailLogDataUpdates)
  //   const tailLogDataSize = updatedData ? _size(updatedData as string | unknown[]) : 0
  //   if (skipPolling || tailLogDataSize > 1 || datasetProp) return
  //   const processedData = dataProcessor ? dataProcessor(updatedData) : updatedData
  //   const dataArray = (processedData as ChartDataPoint[]) || []
  //   setDataset(
  //     (state: ChartDataPoint[]) =>
  //       _values({ ..._keyBy(state, 'ts'), ..._keyBy(dataArray, 'ts') }) as ChartDataPoint[],
  //   )
  // }, [tailLogDataUpdates, end, skipPolling, dataProcessor, datasetProp])

  const handleTimelineChange = (timeline: string): void => {
    chartRef?.current?.timeScale().resetTimeScale()
    setTimeline(timeline)
    setEnd(undefined)
  }

  const handleLegendClick = (label: string): void => {
    setLegendHidden((prevState: Record<string, boolean>) => ({
      ...prevState,
      [label]: !prevState[label],
    }))
  }

  useEffect(() => {
    setTimeline(statKey || '5m')
  }, [statKey])

  // useEffect(() => {
  //   onTailLogDataChange?.(tailLogData)
  // }, [onTailLogDataChange, tailLogData])

  // useEffect(() => {
  //   const tailLogDataSize = tailLogDataUpdates ? _size(tailLogDataUpdates as string | unknown[]) : 0
  //   if (tailLogDataSize > 1) return
  //   onTailLogDataChange?.(tailLogDataUpdates)
  // }, [onTailLogDataChange, tailLogDataUpdates])

  const visibleData = (() => {
    const rawData = datasetProp || dataAdapter(_sortBy(_filter(dataset, 'ts'), 'ts'))
    const data = rawData as {
      datasets?: Array<{ label?: string; [key: string]: unknown }>
      yTicksFormatter?: (value: number) => string
      skipRound?: boolean
      roundPrecision?: number
      minMaxAvg?: MinMaxAvgData
      secondaryValueLabel?: SecondaryValueLabel
      footerStats?: FooterStatItem[]
      footerStatsItemsPerCol?: number
      [key: string]: unknown
    }

    return {
      ...data,
      datasets: _map(data.datasets || [], (d: { label?: string; [key: string]: unknown }) => ({
        ...d,
        visible: d.label ? !legendHidden[d.label] : true,
      })),
      isDetailLegends,
    } as typeof data & {
      datasets: Array<{ label?: string; visible: boolean; [key: string]: unknown }>
      isDetailLegends: boolean
    }
  })()

  const isChartDataUnavailable = checkChartData({ data: visibleData })

  return (
    <LineChartCardContainer $row={isRow} $noWrap>
      <ChartWrapper isLoading={isLoading} minHeight={CHART_MIN_HEIGHT}>
        <>
          <LineChartCardHeader
            data={isChartDataUnavailable ? {} : visibleData}
            title={title ?? null}
            radioButtons={radioButtons || []}
            timeline={timeline}
            legendHidden={legendHidden as Record<string, boolean>}
            onChangeTimeline={handleTimelineChange}
            onClickLegend={handleLegendClick}
          />
          <LineChartContainer key={String(isChartDataUnavailable)}>
            {isChartDataUnavailable ? (
              <NoDataContainer>No records found</NoDataContainer>
            ) : (
              <LineChart
                chartRef={chartRef}
                data={visibleData as unknown as LineChartData}
                yTicksFormatter={visibleData.yTicksFormatter || ((value: number) => String(value))}
                skipRound={visibleData.skipRound}
                roundPrecision={visibleData.roundPrecision}
                timeline={timeline}
                customDateFormat={getTimelineDateFormat(timeline)}
                shouldResetZoom={shouldResetZoom}
                priceFormatter={priceFormatter || undefined}
                customLabel={title || undefined}
              />
            )}
          </LineChartContainer>
          {!isChartDataUnavailable ? (
            <LineChartCardFooter
              minMaxAvg={visibleData.minMaxAvg}
              secondaryValueLabel={visibleData.secondaryValueLabel}
              stats={visibleData.footerStats || []}
              statsItemsPerCol={visibleData.footerStatsItemsPerCol}
            />
          ) : null}
        </>
      </ChartWrapper>
    </LineChartCardContainer>
  )
}

export const LineChartWrapper = withErrorBoundary(LineChartWrapperComponent, 'LineChartWrapper')
