import { formatNumber } from '@mining-sdk/core'
import _isNil from 'lodash/isNil'
import type { ReactNode } from 'react'

export const CurrentValue = ({ value = 0, unit = '', decimals = 3 }): ReactNode => {
  if (_isNil(value)) {
    return null
  }

  return (
    <div className="mining-sdk-line-chart-card__current-value">
      <div className="mining-sdk-line-chart-card__current-value-text">
        {formatNumber(value, {
          maximumSignificantDigits: undefined,
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
      </div>
      <div className="mining-sdk-line-chart-card__current-value-unit-text">{unit}</div>
    </div>
  )
}
