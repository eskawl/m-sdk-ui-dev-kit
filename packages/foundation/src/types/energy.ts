export type EnergyDataItem = {
  ts?: number
  [key: string]: unknown
}

export type EnergyDataWithLabel = {
  label: string
} & EnergyDataItem

export type UteEnergyAggrOptions = {
  datasetsKey?: string
  valueKey?: string
}
