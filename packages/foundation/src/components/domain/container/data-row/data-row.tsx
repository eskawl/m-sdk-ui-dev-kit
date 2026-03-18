import type { ReactElement } from 'react'
import './data-row.scss'

export type DataRowItem = {
  /** Row label */
  label?: string
  /** Row value */
  value?: unknown
  /** Units to display */
  units?: string
  /** Highlight the row */
  isHighlighted?: boolean
  /** Custom text color */
  color?: string
  /** Flash animation */
  flash?: boolean
}

/**
 * Data Row Component
 *
 * Displays a single row with label, value, and units.
 *
 * @example
 * ```tsx
 * <DataRow label="Temperature" value={45} units="°C" />
 * <DataRow label="Status" value="Running" isHighlighted color="green" />
 * <DataRow label="Alert" value="Critical" flash color="red" />
 * ```
 */
export const DataRow = ({
  label,
  value,
  units,
  isHighlighted = false,
  color,
  flash = false,
}: DataRowItem): ReactElement | null => {
  // Don't render if value is null or undefined
  if (value === null || value === undefined) {
    return null
  }

  return (
    <div
      className={`mining-sdk-data-row ${isHighlighted ? 'mining-sdk-data-row--highlighted' : ''} ${flash ? 'mining-sdk-data-row--flash' : ''}`}
      style={color ? { color } : undefined}
    >
      <span className="mining-sdk-data-row__label">{label}</span>
      <span className="mining-sdk-data-row__value">{String(value)}</span>
      {units && <span className="mining-sdk-data-row__units">{units}</span>}
    </div>
  )
}
