import { cn, DecreaseIcon, IncreaseIcon } from '@mining-sdk/core'
import _isNaN from 'lodash/isNaN'

export type PercentageChangeIndicatorProps = {
  percentChange: number | string
  showIcon?: boolean
}

const PercentageChangeIndicator = ({
  percentChange,
  showIcon = false,
}: PercentageChangeIndicatorProps): JSX.Element => {
  const percentChangeNumber = Number(percentChange)
  const percentChangeFormatted = _isNaN(percentChangeNumber) ? 0 : percentChangeNumber
  const value = `(${percentChangeFormatted}%) `
  const isIncrease = percentChangeFormatted > 0
  const isDecrease = percentChangeFormatted < 0
  const Icon = isIncrease ? IncreaseIcon : DecreaseIcon

  return (
    <div
      className={cn('mining-sdk-line-chart-card__pct-change-indicator', {
        'mining-sdk-line-chart-card__pct-change-indicator--variant-increase': isIncrease,
        'mining-sdk-line-chart-card__pct-change-indicator--variant-decrease': isDecrease,
      })}
    >
      {value}
      {showIcon && (isIncrease || isDecrease) && <Icon />}
    </div>
  )
}

export default PercentageChangeIndicator
