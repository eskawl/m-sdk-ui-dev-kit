import { Indicator } from '@mining-sdk/core'
import type { ReactElement } from 'react'
import { DEVICE_STATUS } from '../../../../../../../constants/devices'
import type { Device } from '../../../../../../../types/device'
import { getBitdeerCoolingSystemData } from '../bitdeer-settings-utils'
import './bitdeer-pumps.scss'

type BitdeerPumpsProps = {
  data?: Device
}

/**
 * Bitdeer Pumps Component
 *
 * Displays exhaust fan status using an indicator.
 *
 * @example
 * ```tsx
 * <BitdeerPumps data={containerData} />
 * ```
 */
export const BitdeerPumps = ({ data }: BitdeerPumpsProps): ReactElement | null => {
  const { exhaustFanEnabled } = getBitdeerCoolingSystemData(data ?? {})

  if (typeof exhaustFanEnabled !== 'boolean') {
    return null
  }

  const isRunning = exhaustFanEnabled

  return (
    <div className="mining-sdk-bitdeer-pumps">
      <div className="mining-sdk-bitdeer-pumps__status">
        <span className="mining-sdk-bitdeer-pumps__title">Exhaust Fan</span>
        <Indicator color={isRunning ? 'green' : 'gray'} size="md">
          {isRunning ? DEVICE_STATUS.RUNNING : DEVICE_STATUS.OFF}
        </Indicator>
      </div>
    </div>
  )
}
