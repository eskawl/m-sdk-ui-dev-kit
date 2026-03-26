import { describe, expect, it } from 'vitest'
import { CONTAINER_SETTINGS_MODEL } from '../../constants/container-constants'
import {
  getContainerName,
  getContainerSettingsModel,
  getMinerTypeFromContainerType,
  isAntminerContainer,
  isAntspaceHydro,
  isAntspaceImmersion,
  isAvalonContainer,
  isBitdeer,
  isBitmainImmersion,
  isContainerOffline,
  isMicroBT,
  isMicroBTKehua,
  isWhatsminerContainer,
} from '../container-utils'

const GET_CONTAINER_NAME_TEST_ARGS = {
  bitdeer: { type: 'container-bd-d40-m56', container: 'bitdeer-5a' },
  bitmainImmersion: { type: 'container-as-immersion', container: 'antspace-immersion-2' },
  bitmainHydro: { type: 'container-as-hk3', container: 'bitmain-hydro-1' },
  microBT: { type: 'container-mbt-kehua', container: 'microbt-1' },
}

describe('container utils', () => {
  describe('getContainerName', () => {
    it('should get the proper container name', () => {
      expect(
        getContainerName(
          GET_CONTAINER_NAME_TEST_ARGS.bitdeer.container,
          GET_CONTAINER_NAME_TEST_ARGS.bitdeer.type,
        ),
      ).toBe('Bitdeer 5a M56')

      expect(
        getContainerName(
          GET_CONTAINER_NAME_TEST_ARGS.bitmainImmersion.container,
          GET_CONTAINER_NAME_TEST_ARGS.bitmainImmersion.type,
        ),
      ).toBe('Antspace Immersion 2')

      expect(
        getContainerName(
          GET_CONTAINER_NAME_TEST_ARGS.bitmainHydro.container,
          GET_CONTAINER_NAME_TEST_ARGS.bitmainHydro.type,
        ),
      ).toBe('Bitmain Hydro 1')

      expect(
        getContainerName(
          GET_CONTAINER_NAME_TEST_ARGS.microBT.container,
          GET_CONTAINER_NAME_TEST_ARGS.microBT.type,
        ),
      ).toBe('MicroBT 1 Kehua')
    })
  })

  describe('isContainerOffline', () => {
    it('should detect offline status properly', () => {
      expect(
        isContainerOffline({
          stats: {
            status: 'offline',
          },
        }),
      ).toBe(true)

      expect(
        isContainerOffline({
          stats: {
            status: 'other',
          },
        }),
      ).toBe(false)

      expect(
        isContainerOffline({
          stats: {},
        }),
      ).toBe(false)

      expect(isContainerOffline({})).toBe(false)
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      expect(isContainerOffline()).toBe(false)
    })
  })

  describe('isBitdeer', () => {
    it('should detect Bitdeer containers', () => {
      expect(isBitdeer('bitdeer-5a')).toBe(true)
      expect(isBitdeer('bd-something')).toBe(true)
      expect(isBitdeer('BITDEER-1')).toBe(true)
      expect(isBitdeer('antspace-1')).toBe(false)
      expect(isBitdeer('microbt-1')).toBe(false)
      expect(isBitdeer(undefined)).toBe(false)
    })
  })

  describe('isAntspaceHydro', () => {
    it('should detect Antspace Hydro containers', () => {
      expect(isAntspaceHydro('antspace-hydro-1')).toBe(true)
      expect(isAntspaceHydro('as-hk3')).toBe(true)
      expect(isAntspaceHydro('bitmain-hydro-1')).toBe(true)
      expect(isAntspaceHydro('bitdeer-1')).toBe(false)
      expect(isAntspaceHydro('microbt-1')).toBe(false)
    })
  })

  describe('isMicroBT', () => {
    it('should detect MicroBT containers', () => {
      expect(isMicroBT('microbt-1')).toBe(true)
      expect(isMicroBT('mbt-something')).toBe(true)
      expect(isMicroBT('MICROBT-1')).toBe(true)
      expect(isMicroBT('bitdeer-1')).toBe(false)
      expect(isMicroBT('antspace-1')).toBe(false)
      expect(isMicroBT(undefined)).toBe(false)
    })
  })

  describe('isMicroBTKehua', () => {
    it('should detect MicroBT Kehua containers', () => {
      expect(isMicroBTKehua('container-mbt-kehua')).toBe(true)
      expect(isMicroBTKehua('container-mbt-kehua-1')).toBe(true)
      expect(isMicroBTKehua('microbt-wonderint')).toBe(false)
      expect(isMicroBTKehua('bitdeer-1')).toBe(false)
    })
  })

  describe('isAntspaceImmersion', () => {
    it('should detect Antspace Immersion containers', () => {
      expect(isAntspaceImmersion('antspace-immersion-1')).toBe(true)
      expect(isAntspaceImmersion('as-immersion')).toBe(true)
      expect(isAntspaceImmersion('bitmain-immersion')).toBe(true)
      expect(isAntspaceImmersion('bitmain-imm')).toBe(true)
      expect(isAntspaceImmersion('bitdeer-1')).toBe(false)
    })
  })

  describe('isBitmainImmersion', () => {
    it('should detect Bitmain Immersion containers', () => {
      expect(isBitmainImmersion('bitmain-immersion')).toBe(true)
      expect(isBitmainImmersion('bitmain-imm')).toBe(true)
      expect(isBitmainImmersion('container-as-immersion')).toBe(true)
      expect(isBitmainImmersion('bitdeer-1')).toBe(false)
      expect(isBitmainImmersion('microbt-1')).toBe(false)
    })
  })

  describe('getContainerName edge cases', () => {
    it('should handle maintenance container', () => {
      expect(getContainerName('maintenance')).toBe('Maintenance')
    })

    it('should handle empty container', () => {
      expect(getContainerName('')).toBe('')
      expect(getContainerName(undefined)).toBe('')
    })

    it('should handle container without type', () => {
      expect(getContainerName('bitdeer-1')).toBe('Bitdeer 1')
      expect(getContainerName('microbt-1')).toBe('Microbt 1')
    })

    it('should handle MicroBT Wonderint', () => {
      expect(getContainerName('microbt-1', 'container-mbt-wonderint')).toBe('MicroBT 1 Wonder')
    })

    it('should handle MicroBT without matching type', () => {
      expect(getContainerName('microbt-1', 'container-mbt-unknown')).toBe('MicroBT 1')
    })

    it('should handle generic three-part names', () => {
      expect(getContainerName('some-test-1')).toBe('Some Test 1')
    })

    it('should handle Bitdeer with type variations', () => {
      expect(getContainerName('bitdeer-1a', 'container-bd-d40-m30')).toContain('Bitdeer')
      expect(getContainerName('bitdeer-1a', 'container-bd-d40-m30')).toContain('M30')
      expect(getContainerName('bitdeer-2b', 'container-bd-d40-s19xp')).toContain('S19XP')
    })

    it('should handle MicroBT Kehua with full type', () => {
      const result = getContainerName('microbt-2', 'container-mbt-kehua')
      expect(result).toContain('MicroBT')
      expect(result).toContain('2')
      expect(result).toContain('Kehua')
    })

    it('should handle case sensitivity in container detection', () => {
      expect(getContainerName('BITDEER-1')).toContain('Bitdeer')
      expect(getContainerName('MICROBT-1')).toContain('Microbt')
    })

    it('should return empty string for null-ish values', () => {
      expect(getContainerName(null as any)).toBe('')
      expect(getContainerName('' as any)).toBe('')
    })
  })

  describe('type detection edge cases', () => {
    it('should handle mixed case in type detection', () => {
      expect(isBitdeer('BITDEER-1')).toBe(true)
      expect(isBitdeer('BiTdEeR-1')).toBe(true)
      expect(isMicroBT('MICROBT-1')).toBe(true)
      expect(isMicroBT('MiCrObT-1')).toBe(true)
    })

    it('should handle container type patterns', () => {
      expect(isBitdeer('container-bd-d40-m30')).toBe(true)
      expect(isMicroBT('container-mbt-kehua')).toBe(true)
      expect(isAntspaceHydro('container-as-hk3')).toBe(true)
    })

    it('should handle different container variations', () => {
      expect(isBitdeer('bd-1')).toBe(true)
      expect(isMicroBT('mbt-1')).toBe(true)
      expect(isAntspaceHydro('as-hk3')).toBe(true)
    })
  })

  describe('getContainerSettingsModel', () => {
    it('returns null for empty type', () => {
      expect(getContainerSettingsModel('')).toBeNull()
    })

    it('returns bitdeer model', () => {
      expect(getContainerSettingsModel('container-bd-d40')).toBe(CONTAINER_SETTINGS_MODEL.BITDEER)
    })

    it('returns microbt model', () => {
      expect(getContainerSettingsModel('container-mbt-100')).toBe(CONTAINER_SETTINGS_MODEL.MICROBT)
    })

    it('returns hydro model', () => {
      expect(getContainerSettingsModel('container-as-hk3')).toBe(CONTAINER_SETTINGS_MODEL.HYDRO)
    })

    it('returns immersion model for bitmain', () => {
      expect(getContainerSettingsModel('container-bitmain-immersion')).toBe(
        CONTAINER_SETTINGS_MODEL.IMMERSION,
      )
    })

    it('returns immersion model for antspace', () => {
      expect(getContainerSettingsModel('container-as-immersion')).toBe(
        CONTAINER_SETTINGS_MODEL.IMMERSION,
      )
    })

    it('returns null for unknown type', () => {
      expect(getContainerSettingsModel('unknown-type')).toBeNull()
    })
  })
  describe('isAvalonContainer', () => {
    it('returns false when isContainer is false', () => {
      expect(isAvalonContainer('containerttt-a1346')).toBe(false)
    })

    it('returns true when isContainer is true and type includes A1346 token', () => {
      expect(isAvalonContainer('container-a1346')).toBe(true)
    })

    it('returns false when isContainer is true but type does not include A1346 token', () => {
      expect(isAvalonContainer('container-m56')).toBe(false)
    })

    it('returns false when type is undefined', () => {
      expect(isAvalonContainer(undefined)).toBe(false)
    })
  })

  describe('isWhatsminerContainer', () => {
    it('returns false when isContainer is false', () => {
      expect(isWhatsminerContainer('containerrrr-m56')).toBe(false)
    })

    it('returns true when type includes M56 token', () => {
      expect(isWhatsminerContainer('container-m56')).toBe(true)
    })

    it('returns true when type includes M30 token', () => {
      expect(isWhatsminerContainer('container-m30')).toBe(true)
    })

    it('returns true when isMicroBT returns true', () => {
      expect(isWhatsminerContainer('container-microbt')).toBe(true)
    })

    it('returns false when no whatsminer condition matches', () => {
      expect(isWhatsminerContainer('container-s19xp')).toBe(false)
    })

    it('returns false when type is undefined', () => {
      expect(isWhatsminerContainer(undefined)).toBe(false)
    })
  })

  describe('isAntminerContainer', () => {
    it('returns false when isContainer is false', () => {
      expect(isAntminerContainer('containerrr-s19xp')).toBe(false)
    })

    it('returns true when type includes S19XP token', () => {
      expect(isAntminerContainer('container-s19xp')).toBe(true)
    })

    it('returns true when isAntspaceImmersion returns true', () => {
      expect(isAntminerContainer('container-as-immersion')).toBe(true)
    })

    it('returns true when isAntspaceHydro returns true', () => {
      expect(isAntminerContainer('container-as-hk3')).toBe(true)
    })

    it('returns false when no antminer condition matches', () => {
      expect(isAntminerContainer('container-m56')).toBe(false)
    })

    it('returns false when type is undefined', () => {
      expect(isAntminerContainer(undefined)).toBe(false)
    })
  })

  describe('getMinerTypeFromContainerType', () => {
    it('returns AVALON when isAvalonContainer matches', () => {
      expect(getMinerTypeFromContainerType('container-a1346')).toBe('av')
    })

    it('returns WHATSMINER when isWhatsminerContainer matches via M56', () => {
      expect(getMinerTypeFromContainerType('container-m56')).toBe('wm')
    })

    it('returns WHATSMINER when isWhatsminerContainer matches via M30', () => {
      expect(getMinerTypeFromContainerType('container-m30')).toBe('wm')
    })

    it('returns WHATSMINER when isMicroBT returns true', () => {
      expect(getMinerTypeFromContainerType('container-microbt')).toBe('wm')
    })

    it('returns ANTMINER when isAntminerContainer matches via S19XP', () => {
      expect(getMinerTypeFromContainerType('container-s19xp')).toBe('am')
    })

    it('returns ANTMINER when isAntspaceImmersion returns true', () => {
      expect(getMinerTypeFromContainerType('container-as-immersion')).toBe('am')
    })

    it('returns ANTMINER when isAntspaceHydro returns true', () => {
      expect(getMinerTypeFromContainerType('container-as-hk3')).toBe('am')
    })

    it('returns undefined when no type matches', () => {
      expect(getMinerTypeFromContainerType('container-unknown')).toBeUndefined()
    })

    it('returns undefined when isContainer is false for all checks', () => {
      expect(getMinerTypeFromContainerType('containerrr-a1346')).toBeUndefined()
    })

    it('AVALON takes priority over WHATSMINER when type matches both', () => {
      // type contains both a1346 and m56 tokens
      expect(getMinerTypeFromContainerType('container-a1346-m56')).toBe('av')
    })

    it('WHATSMINER takes priority over ANTMINER when type matches both', () => {
      expect(getMinerTypeFromContainerType('container-m56-s19xp')).toBe('wm')
    })
  })
})
