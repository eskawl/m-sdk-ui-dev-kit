import _map from 'lodash/map'
import _noop from 'lodash/noop'
import type { ChartData, DatasetItem } from './types'
import { cn } from '@mining-sdk/core'
import { hexToOpacity } from '../../../utils/color-utils'

export type LegendLabelsProps = {
  data?: ChartData
  hidden?: Record<string, boolean>
  onClick?: (label: string, index: number) => void
}

export const LegendLabels = ({
  data = {},
  hidden = {},
  onClick = _noop,
}: LegendLabelsProps): JSX.Element => {
  const { datasets = [] } = data

  return (
    <div className="mining-sdk-line-chart-card__legend-labels">
      {_map(datasets, (dataset: DatasetItem, index: number) => {
        const datasetLabel = dataset.label || ''
        const borderColor = dataset.borderColor

        return (
          <div
            className={cn('mining-sdk-line-chart-card__legend-container', {
              'mining-sdk-line-chart-card__legend-container--hidden': hidden[datasetLabel],
            })}
            key={`${datasetLabel} ${index}`}
            onClick={() => onClick(datasetLabel, index)}
          >
            <div
              className="mining-sdk-line-chart-card__legend-color"
              style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: borderColor ? hexToOpacity(borderColor) : 'inherit',
              }}
            />
            <div className="mining-sdk-line-chart-card__legend-text">{datasetLabel}</div>
          </div>
        )
      })}
    </div>
  )
}

export default LegendLabels
