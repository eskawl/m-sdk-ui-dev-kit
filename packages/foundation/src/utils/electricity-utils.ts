import type { UnknownRecord } from '@mining-sdk/core'
import _get from 'lodash/get'
import _head from 'lodash/head'
import _map from 'lodash/map'
import type { EnergyDataItem, EnergyDataWithLabel, UteEnergyAggrOptions } from '../types/energy'
import { DATE_TIME_FORMAT } from '../constants/dates'
import { format } from 'date-fns'
import { DATE_RANGE } from '../constants'

export const UTE_ENERGY_AGGR_PATH = {
  datasetsKey: 'energy',
  valueKey: 'availableEnergy',
}

export const getUteEnergyAggrDataset = (
  dataEntry: UnknownRecord,
  datasetsKey = UTE_ENERGY_AGGR_PATH.datasetsKey,
): UnknownRecord => {
  const datasets = _get(dataEntry, datasetsKey, []) as UnknownRecord[]

  return _head(datasets) || {}
}

/**
 * Convert energy data to range
 * @param energyData
 * @returns {object}
 */
export const convertEnergyToRange = (energyData: EnergyDataItem[]): EnergyDataWithLabel[] =>
  _map(
    energyData,
    (data: EnergyDataItem): EnergyDataWithLabel => ({
      ...data,
      label: `${data.ts ? format(new Date(data.ts), DATE_TIME_FORMAT) : ''}`,
    }),
  )

export const getUteEnergyAggrValue = (
  dataEntry: UnknownRecord,
  {
    datasetsKey = UTE_ENERGY_AGGR_PATH.datasetsKey,
    valueKey = UTE_ENERGY_AGGR_PATH.valueKey,
  }: UteEnergyAggrOptions = UTE_ENERGY_AGGR_PATH,
): number | undefined => {
  const dataset = getUteEnergyAggrDataset(dataEntry, datasetsKey)

  return _get(dataset, valueKey) as number | undefined
}

export const getRangeStatsKey = (
  range: (typeof DATE_RANGE)[keyof typeof DATE_RANGE],
): (typeof DATE_RANGE)[keyof typeof DATE_RANGE] => {
  switch (range) {
    case DATE_RANGE.MONTH1:
    case DATE_RANGE.D1:
      return DATE_RANGE.H1
    default:
      return range
  }
}
