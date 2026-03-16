import { COLOR } from '@mining-sdk/core'
import { describe, expect, it } from 'vitest'
import { getCommonColorMapping, getCommonTableColumns } from '../helpers'

describe('getCommonTableColumns', () => {
  it('returns 5 columns', () => {
    const columns = getCommonTableColumns()
    expect(columns).toHaveLength(5)
  })

  it('has correct column structure', () => {
    const columns = getCommonTableColumns()
    const headers = columns.map((col) => col.header)

    expect(headers).toEqual(['State', 'Range', 'Color', 'Flash', 'Sound'])
  })

  it('has correct column sizes', () => {
    const columns = getCommonTableColumns()
    const sizes = columns.map((col) => col.size)

    expect(sizes).toEqual([20, 25, 15, 20, 20])
  })
})

describe('getCommonColorMapping', () => {
  it('returns color mapping object', () => {
    const mapping = getCommonColorMapping()
    expect(mapping).toBeDefined()
    expect(typeof mapping).toBe('object')
  })

  it('has red color mapping', () => {
    const mapping = getCommonColorMapping()

    expect(mapping[COLOR.RED]).toEqual({
      text: 'Red',
      color: 'red',
    })
  })

  it('has green color mapping', () => {
    const mapping = getCommonColorMapping()

    expect(mapping[COLOR.GREEN]).toEqual({
      text: 'Green',
      color: 'green',
    })
  })

  it('has orange color mapping', () => {
    const mapping = getCommonColorMapping()

    expect(mapping[COLOR.ORANGE]).toEqual({
      text: 'Orange',
      color: 'amber',
    })
  })

  it('has white color mapping', () => {
    const mapping = getCommonColorMapping()

    expect(mapping[COLOR.WHITE]).toEqual({
      text: 'White',
      color: 'slate',
    })
  })

  it('has all expected color keys', () => {
    const mapping = getCommonColorMapping()
    const keys = Object.keys(mapping)

    expect(keys).toContain(COLOR.RED)
    expect(keys).toContain(COLOR.GREEN)
    expect(keys).toContain(COLOR.ORANGE)
    expect(keys).toContain(COLOR.GOLD)
  })

  it('all mappings have required properties', () => {
    const mapping = getCommonColorMapping()

    Object.values(mapping).forEach((colorInfo) => {
      expect(colorInfo).toHaveProperty('text')
      expect(colorInfo).toHaveProperty('color')
      expect(typeof colorInfo.text).toBe('string')
      expect(typeof colorInfo.color).toBe('string')
    })
  })
})
