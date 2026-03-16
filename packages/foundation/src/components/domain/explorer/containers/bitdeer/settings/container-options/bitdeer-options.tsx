import type { ReactElement } from 'react'
import type { Device } from '../../../../../../../types/device'
import { getBitdeerCoolingSystemData } from '../bitdeer-settings-utils'
import './bitdeer-options.scss'
import { BitdeerPumps } from './bitdeer-pumps'
import { DryCooler } from './dry-cooler/dry-cooler'

type BitdeerOptionsProps = {
  data?: Device
}

/**
 * Bitdeer Options Component
 *
 * Main container for Bitdeer cooling system options.
 * Displays dry cooler and pumps components.
 *
 * @example
 * ```tsx
 * <BitdeerOptions data={containerData} />
 * ```
 */
export const BitdeerOptions = ({ data }: BitdeerOptionsProps): ReactElement => {
  const { dryCooler } = getBitdeerCoolingSystemData(data ?? {})

  return (
    <div className="mining-sdk-bitdeer-options">
      {dryCooler && <DryCooler data={data} />}
      <BitdeerPumps data={data} />
    </div>
  )
}
