import { Indicator, SimpleTooltip, UNITS } from '@mdk/core'
import { DEVICE_STATUS } from '../../../../constants/devices'
import _isNil from 'lodash/isNil'

export type TankRowPressure = Partial<{
  value: number
  flash: boolean
  color: string
  tooltip: string
}>

export type TankRowProps = {
  label: string
  temperature: number
  unit: string
  oilPumpEnabled: boolean
  waterPumpEnabled: boolean
  color: string
  flash?: boolean
  tooltip?: string
  pressure: TankRowPressure
}

export const TankRow = ({
  label,
  temperature,
  unit,
  oilPumpEnabled,
  waterPumpEnabled,
  color,
  flash,
  tooltip,
  pressure,
}: TankRowProps): JSX.Element => (
  <div className="mining-sdk-tanks-box__row">
    <span>{label}</span>
    <div className="mining-sdk-tanks-box__params">
      <div className="mining-sdk-tanks-box__param">
        <span
          className="mining-sdk-tanks-box__param-label"
          data-flash={flash || undefined}
          style={{ color: color || 'var(--mdk-color-white-5)' }}
        >
          Temperature
        </span>
        <SimpleTooltip content={tooltip || `Temperature: ${temperature}${unit}`}>
          <span
            className="mining-sdk-tanks-box__param-value"
            data-flash={flash || undefined}
            style={{ color: color || 'var(--mdk-color-white)' }}
          >
            {`${temperature}${unit}`}
          </span>
        </SimpleTooltip>
      </div>
      {!_isNil(pressure.value) && (
        <div className="mining-sdk-tanks-box__param">
          <span
            className="mining-sdk-tanks-box__param-label"
            data-flash={pressure.flash || undefined}
            style={{
              color: pressure.color || 'var(--mdk-color-white-5)',
            }}
          >
            Pressure
          </span>
          <SimpleTooltip
            content={pressure.tooltip || `Pressure: ${pressure.value} ${UNITS.PRESSURE_BAR}`}
          >
            <span
              className="mining-sdk-tanks-box__param-value"
              data-flash={pressure.flash || undefined}
              style={{
                color: pressure.color || 'var(--mdk-color-white)',
              }}
            >
              {`${pressure.value} ${UNITS.PRESSURE_BAR}`}
            </span>
          </SimpleTooltip>
        </div>
      )}
    </div>
    <div className="mining-sdk-tanks-box__pump-statuses">
      <div className="mining-sdk-tanks-box__pump-status">
        <span className="mining-sdk-tanks-box__pump-status-title">Oil Pump</span>
        <Indicator color={oilPumpEnabled ? 'green' : 'gray'} size="md">
          {oilPumpEnabled ? DEVICE_STATUS.RUNNING : DEVICE_STATUS.OFF}
        </Indicator>
      </div>
      <div className="mining-sdk-tanks-box__pump-status">
        <span className="mining-sdk-tanks-box__pump-status-title">Water Pump</span>
        <Indicator color={waterPumpEnabled ? 'green' : 'gray'} size="md">
          {waterPumpEnabled ? DEVICE_STATUS.RUNNING : DEVICE_STATUS.OFF}
        </Indicator>
      </div>
    </div>
  </div>
)
