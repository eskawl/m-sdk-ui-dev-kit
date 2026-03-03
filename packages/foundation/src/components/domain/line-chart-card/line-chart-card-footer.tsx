import { cn } from '@mining-sdk/core'
import type { UnknownRecord } from '@mining-sdk/core'
import _ceil from 'lodash/ceil'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import _size from 'lodash/size'
import _slice from 'lodash/slice'
import _times from 'lodash/times'
import MinMaxAvg from './min-max-avg'

type FooterStatItem = {
  label: string
  value: string | number
}

type LineChartCardFooterProps = {
  secondaryValueLabel?: UnknownRecord
  minMaxAvg?: UnknownRecord
  stats?: FooterStatItem[]
  statsItemsPerCol?: number
}

const LineChartCardFooter = ({
  secondaryValueLabel = {},
  minMaxAvg = {},
  stats = [],
  statsItemsPerCol = 1,
}: LineChartCardFooterProps): JSX.Element => (
  <div
    className={cn('mining-sdk-line-chart-card-footer-container', {
      'mining-sdk-line-chart-card-footer-container--variant-flex': statsItemsPerCol === 1,
      'mining-sdk-line-chart-card-footer-container--orient-row': statsItemsPerCol === 1,
    })}
  >
    {!_isEmpty(minMaxAvg) && (
      <div className="mining-sdk-line-chart-card-footer__min-max-avg">
        <MinMaxAvg {...minMaxAvg} />
      </div>
    )}
    {!_isEmpty(stats) && (
      <div
        className={cn('mining-sdk-line-chart-card-footer-stats', {
          'mining-sdk-line-chart-card-footer-stats--width-full': statsItemsPerCol === 1,
          'mining-sdk-line-chart-card-footer-stats--justify-between': statsItemsPerCol === 1,
        })}
      >
        {_times(_ceil(_size(stats) / statsItemsPerCol), (colIndex: number) => {
          const colItemsFirstIndex = colIndex * statsItemsPerCol

          const colItems = _slice(stats, colItemsFirstIndex, colItemsFirstIndex + statsItemsPerCol)

          const rowStyle = {
            flex: 1 / statsItemsPerCol,
          }

          return (
            <div className="mining-sdk-line-chart-card-footer-stats-column" key={colIndex}>
              {_map(colItems, (item: FooterStatItem) => (
                <div
                  className={cn('mining-sdk-line-chart-card-footer-stats-row', {
                    'mining-sdk-line-chart-card-footer-stats-row--justify-between':
                      statsItemsPerCol === 1,
                  })}
                  style={rowStyle}
                  key={item.label}
                >
                  <div className="mining-sdk-line-chart-card-footer-stats__label">{item.label}</div>
                  <div className="mining-sdk-line-chart-card-footer-stats__value">{item.value}</div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    )}
    <div className="mining-sdk-line-chart-card-footer-row">
      <div className="mining-sdk-line-chart-card-footer__text--primary">
        {secondaryValueLabel?.title as string | undefined}
      </div>
      <div
        className={cn(
          'mining-sdk-line-chart-card-footer__text--secondary',
          'mining-sdk-line-chart-card-footer__text--large',
        )}
      >
        {secondaryValueLabel?.value as string | number | undefined}
      </div>
    </div>
  </div>
)

export default LineChartCardFooter
