import _head from 'lodash/head'
import _isNil from 'lodash/isNil'
import _isUndefined from 'lodash/isUndefined'
import _noop from 'lodash/noop'
import _size from 'lodash/size'

import DetailLegendLabels from './detail-legend-labels'
import LegendLabels from './legend-labels'
import LineChartCardToggle from './line-chart-card-toggle'
import type { RadioButton } from '../timeline-toggle'
import { CurrentValue } from './current-value'

// TODO: Move to common types
type Dataset = {
  label?: string
  [key: string]: unknown
}

type CurrentValueLabelData = {
  value?: number
  unit?: string
  decimals?: number
}

type ChartData = {
  isDetailLegends?: boolean
  currentValueLabel?: CurrentValueLabelData
  datasets?: Dataset[]
  [key: string]: unknown
}

type LineChartCardHeaderProps = {
  data?: ChartData
  radioButtons?: RadioButton[]
  timeline?: string
  legendHidden?: Record<string, boolean>
  title?: string | null
  onChangeTimeline?: (timeline: string) => void
  onClickLegend?: (label: string) => void
}

const LineChartCardHeader = ({
  data,
  radioButtons = [],
  timeline = '',
  legendHidden = {},
  title = null,
  onChangeTimeline = _noop,
  onClickLegend = _noop,
}: LineChartCardHeaderProps): JSX.Element => {
  const { isDetailLegends, currentValueLabel, datasets } = data || {}
  const datasetLabel = _head(datasets)?.label
  const isMultipleLineChart = _size(datasets) > 1

  // @TODO - this should be refactored to get it dynamically
  const totalMinerConsumption = datasetLabel === 'Total Miner Consumption'
  const totalConsumption = datasetLabel === 'Total Consumption'

  const Legend = isDetailLegends ? DetailLegendLabels : LegendLabels
  const currentValueDecimalsMap =
    currentValueLabel?.value === 0 || _isUndefined(currentValueLabel?.value)
      ? 0
      : currentValueLabel?.decimals
  const valueDecimals = totalConsumption ? 2 : currentValueDecimalsMap
  const decimals = totalMinerConsumption ? 3 : valueDecimals

  const showCurrentValue =
    currentValueLabel &&
    !isDetailLegends &&
    !_isNil(currentValueLabel?.value) &&
    !isMultipleLineChart
  return (
    <div className="mining-sdk-line-chart-card__header" style={{ flex: 1 }}>
      <div className="mining-sdk-line-chart-card__header-container">
        <LineChartCardToggle
          title={title || undefined}
          timeline={timeline}
          radioButtons={radioButtons.map((btn) => ({
            value: btn.value,
            disabled: btn.disabled ?? false,
            text: btn.text || btn.label || '',
          }))}
          onChangeTimeline={onChangeTimeline}
        />
        <div className="mining-sdk-line-chart-card__header-legend-column">
          <Legend
            data={
              data as {
                datasets?: Array<{ label: string; borderColor?: string; [key: string]: unknown }>
                [key: string]: unknown
              }
            }
            hidden={legendHidden}
            onClick={onClickLegend}
          />
          {showCurrentValue && (
            <CurrentValue
              value={currentValueLabel?.value}
              unit={currentValueLabel?.unit}
              decimals={decimals}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default LineChartCardHeader
