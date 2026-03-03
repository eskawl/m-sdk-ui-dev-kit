import _map from 'lodash/map'
import type { EnergyAggrItem, TailLogDataItem } from '../types/tail-log'
import { getUteEnergyAggrDataset } from './electricity-utils'
import type { UnknownRecord } from '@mining-sdk/core'

export const getKunaEnergyAggr = (tailLogData: TailLogDataItem[]): EnergyAggrItem[] =>
  _map(tailLogData, (log: TailLogDataItem) => ({
    ...getUteEnergyAggrDataset(log as unknown as UnknownRecord),
    ts: log.ts,
    key: log.ts,
  }))
