import { cn, formatNumber, formatUnit, SimpleTooltip } from '@mining-sdk/core'
import _isNumber from 'lodash/isNumber'
import _isString from 'lodash/isString'
import _map from 'lodash/map'
import _noop from 'lodash/noop'
import type { DatasetItem } from './types'
import PercentageChangeIndicator from './percentage-change-indicator'

const getPercentChange = (oldValue: number, newValue: number): string =>
  formatNumber(((newValue - oldValue) * 100) / oldValue)

export type DetailLegendLabelsProps = {
  data?: {
    datasets?: DatasetItem[]
  }
  hidden?: Record<string, boolean>
  onClick?: (label: string, index: number) => void
}

const DetailLegendLabels = ({
  data = {},
  hidden = {},
  onClick = _noop,
}: DetailLegendLabelsProps): JSX.Element => {
  const { datasets = [] } = data

  return (
    <div className="mining-sdk-line-chart-card__detail-legend-labels">
      {_map(datasets, (dataset: DatasetItem, index: number) => (
        <div
          className={cn('mining-sdk-line-chart-card__legend-container', {
            'mining-sdk-line-chart-card__legend-container--hidden': hidden[dataset.label],
          })}
          key={`${dataset.label} ${index}`}
          onClick={() => onClick(dataset.label, index)}
        >
          <div
            className="mining-sdk-line-chart-card__legend-icons"
            style={{ color: dataset.borderColor }}
          >
            {dataset.legendIcon}
          </div>
          <div className="mining-sdk-line-chart-card__detail-legend">
            <div className="mining-sdk-line-chart-card__detail-legend-label">
              <span>{dataset.label}</span>
            </div>
            <div className="mining-sdk-line-chart-card__detail-legend-value">
              <div className="mining-sdk-line-chart-card__detail-legend-value-text">
                {_isNumber(dataset.currentValue?.value) || _isString(dataset.currentValue?.value)
                  ? formatNumber(dataset.currentValue.value)
                  : ''}
              </div>
              <div className="mining-sdk-line-chart-card__detail-legend-value-label">
                {dataset.currentValue?.unit}
              </div>
              {dataset?.yesterdayAvg?.realValue && dataset?.currentValue?.realValue ? (
                <SimpleTooltip
                  content={
                    <span>
                      Variation over Yesterday&apos;s Average
                      <br />
                      {`Yesterday&apos;s average: ${formatUnit(dataset?.yesterdayAvg)}`}
                    </span>
                  }
                >
                  <div>
                    <PercentageChangeIndicator
                      showIcon
                      percentChange={getPercentChange(
                        dataset?.yesterdayAvg?.realValue,
                        dataset?.currentValue?.realValue,
                      )}
                    />
                  </div>
                </SimpleTooltip>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DetailLegendLabels
