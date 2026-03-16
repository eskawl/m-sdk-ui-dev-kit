import { cn, FanIcon } from '@mining-sdk/core'
import type { ReactElement } from 'react'
import './container-fans-legend.scss'

type ContainerFanLegendProps = {
  /** Fan index/number to display */
  index?: number | null
  /** Whether the fan is enabled/running */
  enabled?: boolean
  /** Custom className */
  className?: string
}

/**
 * Container Fan Legend Component
 *
 * Displays a single fan status with number and icon.
 *
 * @example
 * ```tsx
 * <ContainerFanLegend index={1} enabled={true} />
 * <ContainerFanLegend index={2} enabled={false} />
 * ```
 */
export const ContainerFanLegend = ({
  index,
  enabled = false,
  className,
}: ContainerFanLegendProps): ReactElement => (
  <div
    className={cn(
      'mining-sdk-container-fan-legend',
      {
        'mining-sdk-container-fan-legend--on': enabled,
        'mining-sdk-container-fan-legend--off': !enabled,
      },
      className,
    )}
  >
    <span className="mining-sdk-container-fan-legend__number">
      {index !== null && index !== undefined ? String(index) : ''}
    </span>
    <div
      className={cn('mining-sdk-container-fan-legend__icon', {
        'mining-sdk-container-fan-legend__icon--on': enabled,
        'mining-sdk-container-fan-legend__icon--off': !enabled,
      })}
    >
      <FanIcon />
    </div>
  </div>
)
