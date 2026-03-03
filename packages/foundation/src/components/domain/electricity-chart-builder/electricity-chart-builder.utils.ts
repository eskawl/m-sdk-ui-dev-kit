import { timeRangeWalker } from '@mining-sdk/core'
import type { UnknownRecord } from '@mining-sdk/core'
import _fromPairs from 'lodash/fromPairs'
import _keyBy from 'lodash/keyBy'
import _head from 'lodash/head'
import _last from 'lodash/last'
import _map from 'lodash/map'
import type { ChartDataPayload, ChartLine } from './types'
import { DATE_RANGE_DURATIONS } from '../../../constants'

export const getDatasetsLineData = (
  data: Array<UnknownRecord>,
  chartDataPayload?: ChartDataPayload,
): any[] => {
  if (!chartDataPayload?.lines) {
    return []
  }

  const datasetLinesDataLookup = _fromPairs(
    _map(chartDataPayload.lines, (line: ChartLine) => [line.backendAttribute, []]),
  )

  const dateWiseDataLookup = _keyBy(data, 'ts')

  const startTs = _head(data)?.ts as number | undefined
  const endTs = _last(data)?.ts as number | undefined

  if (!startTs || !endTs) {
    return []
  }

  const duration = DATE_RANGE_DURATIONS[statKey as keyof typeof DATE_RANGE_DURATIONS]

  const walker = timeRangeWalker(startTs, endTs, duration)

  for (const currentTs of walker) {
    const x = currentTs
    for (const line of chartDataPayload.lines) {
      const entry = dateWiseDataLookup[currentTs] as UnknownRecord | undefined
      const y = entry?.[line.backendAttribute]
      const pointData: { x: number; y?: unknown } = {
        x,
      }
      if (y !== undefined) {
        pointData.y = y
      }

      const lineKey = line.backendAttribute
      const lineData = datasetLinesDataLookup[lineKey] as Array<{ x: number; y?: unknown }>
      lineData.push(pointData)
    }
  }

  return _map(
    chartDataPayload.lines,
    (line: ChartLine) => datasetLinesDataLookup[line.backendAttribute],
  )
}
