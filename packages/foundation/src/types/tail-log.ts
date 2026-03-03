import type { UnknownRecord } from '@mining-sdk/core'

export type TailLogDataItem = {
  ts?: number
  data?: UnknownRecord
  [key: string]: unknown
}

export type EnergyAggrItem = {
  ts?: number
  key?: number
  [key: string]: unknown
}
