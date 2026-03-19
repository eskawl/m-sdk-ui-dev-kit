import type { UnknownRecord } from '@mining-sdk/core'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ContainerParamsSettings,
  EditableThresholdForm,
} from '../../../../../container-params-settings'
import { BitdeerSettings } from '../bitdeer-settings'
import {
  getBitdeerOilTemperatureColor,
  getBitdeerTankPressureColor,
  shouldBitdeerOilTemperatureFlash,
  shouldBitdeerOilTemperatureSuperflash,
  shouldBitdeerTankPressureFlash,
  shouldBitdeerTankPressureSuperflash,
} from '../bitdeer-settings-utils'

// Mock child components
vi.mock('../../../../../container-params-settings', () => ({
  ContainerParamsSettings: vi.fn(({ data }) => (
    <div data-testid="container-params-settings">Container Type: {data?.type || 'no-type'}</div>
  )),
  EditableThresholdForm: vi.fn(
    ({
      data,
      oilTempColorFunc,
      oilTempFlashFunc,
      oilTempSuperflashFunc,
      tankPressureColorFunc,
      tankPressureFlashFunc,
      tankPressureSuperflashFunc,
    }) => (
      <div data-testid="editable-threshold-form">
        <div data-testid="data-type">{data?.type || 'no-type'}</div>
        <div data-testid="oil-temp-color">{oilTempColorFunc?.(42)}</div>
        <div data-testid="oil-temp-flash">{String(oilTempFlashFunc?.(42))}</div>
        <div data-testid="oil-temp-superflash">{String(oilTempSuperflashFunc?.(42))}</div>
        <div data-testid="tank-pressure-color">{tankPressureColorFunc?.(2.5)}</div>
        <div data-testid="tank-pressure-flash">{String(tankPressureFlashFunc?.(2.5))}</div>
        <div data-testid="tank-pressure-superflash">
          {String(tankPressureSuperflashFunc?.(2.5))}
        </div>
      </div>
    ),
  ),
}))

// Mock utility functions
vi.mock('../bitdeer-settings-utils', () => ({
  getBitdeerOilTemperatureColor: vi.fn((isOn, value) => {
    if (!isOn) return 'gray'
    if (value < 35) return 'blue'
    if (value > 45) return 'red'
    return 'green'
  }),
  shouldBitdeerOilTemperatureFlash: vi.fn((isOn, value, status) => {
    if (!isOn || status === 'offline') return false
    return value < 35 || value > 45
  }),
  shouldBitdeerOilTemperatureSuperflash: vi.fn((isOn, value, status) => {
    if (!isOn || status === 'offline') return false
    return value > 48
  }),
  getBitdeerTankPressureColor: vi.fn((isOn, value) => {
    if (!isOn) return 'gray'
    if (value < 2) return 'blue'
    if (value > 3) return 'red'
    return 'green'
  }),
  shouldBitdeerTankPressureFlash: vi.fn((isOn, value, status) => {
    if (!isOn || status === 'offline') return false
    return value < 2 || value > 3
  }),
  shouldBitdeerTankPressureSuperflash: vi.fn((isOn, value, status) => {
    if (!isOn || status === 'offline') return false
    return value < 1.5 || value > 3.5
  }),
}))

describe('BitdeerSettings', () => {
  const mockData: UnknownRecord = {
    type: 'container-bd-d40',
    status: 'online',
    oilTemperature: 42,
    tankPressure: 2.5,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<BitdeerSettings data={mockData} />)
      expect(screen.getByTestId('container-params-settings')).toBeInTheDocument()
      expect(screen.getByTestId('editable-threshold-form')).toBeInTheDocument()
    })

    it('renders ContainerParamsSettings component', () => {
      render(<BitdeerSettings data={mockData} />)
      expect(screen.getByText(/Container Type:/)).toBeInTheDocument()
    })

    it('renders EditableThresholdForm component', () => {
      render(<BitdeerSettings data={mockData} />)
      expect(screen.getByTestId('editable-threshold-form')).toBeInTheDocument()
    })

    it('renders with wrapper class', () => {
      const { container } = render(<BitdeerSettings data={mockData} />)
      expect(container.querySelector('.mining-sdk-bitdeer-settings')).toBeInTheDocument()
    })

    it('renders params section', () => {
      const { container } = render(<BitdeerSettings data={mockData} />)
      expect(container.querySelector('.mining-sdk-bitdeer-settings__params')).toBeInTheDocument()
    })

    it('renders thresholds section', () => {
      const { container } = render(<BitdeerSettings data={mockData} />)
      expect(
        container.querySelector('.mining-sdk-bitdeer-settings__thresholds'),
      ).toBeInTheDocument()
    })

    it('renders with default empty object when no data provided', () => {
      render(<BitdeerSettings />)
      expect(screen.getByTestId('container-params-settings')).toBeInTheDocument()
      expect(screen.getByTestId('editable-threshold-form')).toBeInTheDocument()
    })

    it('renders two sections', () => {
      const { container } = render(<BitdeerSettings data={mockData} />)
      const sections = container.querySelectorAll('section')
      expect(sections).toHaveLength(2)
    })
  })

  describe('data passing', () => {
    it('passes data to ContainerParamsSettings', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(ContainerParamsSettings).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockData }),
        expect.anything(),
      )
    })

    it('passes empty object as default data', () => {
      render(<BitdeerSettings />)

      expect(ContainerParamsSettings).toHaveBeenCalledWith(
        expect.objectContaining({ data: {} }),
        expect.anything(),
      )
      expect(EditableThresholdForm).toHaveBeenCalledWith(
        expect.objectContaining({ data: {} }),
        expect.anything(),
      )
    })

    it('passes data to both child components', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(ContainerParamsSettings).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockData }),
        expect.anything(),
      )
      expect(EditableThresholdForm).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockData }),
        expect.anything(),
      )
    })
  })

  describe('function props', () => {
    it('passes all threshold functions to EditableThresholdForm', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(EditableThresholdForm).toHaveBeenCalledWith(
        expect.objectContaining({
          oilTempColorFunc: expect.any(Function),
          oilTempFlashFunc: expect.any(Function),
          oilTempSuperflashFunc: expect.any(Function),
          tankPressureColorFunc: expect.any(Function),
          tankPressureFlashFunc: expect.any(Function),
          tankPressureSuperflashFunc: expect.any(Function),
        }),
        expect.anything(),
      )
    })

    it('all function props are functions', () => {
      render(<BitdeerSettings data={mockData} />)

      const call = vi.mocked(EditableThresholdForm).mock.calls[0][0]

      expect(typeof call.oilTempColorFunc).toBe('function')
      expect(typeof call.oilTempFlashFunc).toBe('function')
      expect(typeof call.oilTempSuperflashFunc).toBe('function')
      expect(typeof call.tankPressureColorFunc).toBe('function')
      expect(typeof call.tankPressureFlashFunc).toBe('function')
      expect(typeof call.tankPressureSuperflashFunc).toBe('function')
    })
  })

  describe('oil temperature functions', () => {
    it('oilTempColorFunc calls getBitdeerOilTemperatureColor with true', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(getBitdeerOilTemperatureColor).toHaveBeenCalledWith(true, 42, mockData)
      expect(screen.getByTestId('oil-temp-color')).toHaveTextContent('green')
    })

    it('oilTempFlashFunc calls shouldBitdeerOilTemperatureFlash with status', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalledWith(true, 42, 'online', mockData)
      expect(screen.getByTestId('oil-temp-flash')).toHaveTextContent('false')
    })

    it('oilTempSuperflashFunc calls shouldBitdeerOilTemperatureSuperflash', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(shouldBitdeerOilTemperatureSuperflash).toHaveBeenCalledWith(
        true,
        42,
        'online',
        mockData,
      )
      expect(screen.getByTestId('oil-temp-superflash')).toHaveTextContent('false')
    })

    it('handles undefined status in oil temperature functions', () => {
      const dataWithoutStatus = { ...mockData, status: undefined }
      render(<BitdeerSettings data={dataWithoutStatus} />)

      expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalledWith(
        true,
        42,
        undefined,
        dataWithoutStatus,
      )
    })
  })

  describe('tank pressure functions', () => {
    it('tankPressureColorFunc calls getBitdeerTankPressureColor with true', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(getBitdeerTankPressureColor).toHaveBeenCalledWith(true, 2.5, mockData)
      expect(screen.getByTestId('tank-pressure-color')).toHaveTextContent('green')
    })

    it('tankPressureFlashFunc calls shouldBitdeerTankPressureFlash with status', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(shouldBitdeerTankPressureFlash).toHaveBeenCalledWith(true, 2.5, 'online', mockData)
      expect(screen.getByTestId('tank-pressure-flash')).toHaveTextContent('false')
    })

    it('tankPressureSuperflashFunc calls shouldBitdeerTankPressureSuperflash', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(shouldBitdeerTankPressureSuperflash).toHaveBeenCalledWith(
        true,
        2.5,
        'online',
        mockData,
      )
      expect(screen.getByTestId('tank-pressure-superflash')).toHaveTextContent('false')
    })

    it('handles undefined status in tank pressure functions', () => {
      const dataWithoutStatus = { ...mockData, status: undefined }
      render(<BitdeerSettings data={dataWithoutStatus} />)

      expect(shouldBitdeerTankPressureFlash).toHaveBeenCalledWith(
        true,
        2.5,
        undefined,
        dataWithoutStatus,
      )
    })
  })

  describe('function return values', () => {
    it('returns correct color values', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(screen.getByTestId('oil-temp-color')).toHaveTextContent('green')
      expect(screen.getByTestId('tank-pressure-color')).toHaveTextContent('green')
    })

    it('returns correct flash states', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(screen.getByTestId('oil-temp-flash')).toHaveTextContent('false')
      expect(screen.getByTestId('tank-pressure-flash')).toHaveTextContent('false')
    })

    it('returns correct superflash states', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(screen.getByTestId('oil-temp-superflash')).toHaveTextContent('false')
      expect(screen.getByTestId('tank-pressure-superflash')).toHaveTextContent('false')
    })

    it('handles different return values for colors', () => {
      vi.mocked(getBitdeerOilTemperatureColor).mockReturnValueOnce('red')
      vi.mocked(getBitdeerTankPressureColor).mockReturnValueOnce('blue')

      render(<BitdeerSettings data={mockData} />)

      expect(screen.getByTestId('oil-temp-color')).toHaveTextContent('red')
      expect(screen.getByTestId('tank-pressure-color')).toHaveTextContent('blue')
    })

    it('handles true flash states', () => {
      vi.mocked(shouldBitdeerOilTemperatureFlash).mockReturnValueOnce(true)
      vi.mocked(shouldBitdeerTankPressureFlash).mockReturnValueOnce(true)

      render(<BitdeerSettings data={mockData} />)

      expect(screen.getByTestId('oil-temp-flash')).toHaveTextContent('true')
      expect(screen.getByTestId('tank-pressure-flash')).toHaveTextContent('true')
    })
  })

  describe('status handling', () => {
    it('handles online status', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalledWith(true, 42, 'online', mockData)
    })

    it('handles offline status', () => {
      const offlineData = { ...mockData, status: 'offline' }
      render(<BitdeerSettings data={offlineData} />)

      expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalledWith(
        true,
        42,
        'offline',
        offlineData,
      )
    })

    it('handles different status values', () => {
      const statuses = ['online', 'offline', 'stopped', 'error', 'maintenance']

      statuses.forEach((status) => {
        vi.clearAllMocks()
        const dataWithStatus = { ...mockData, status }
        render(<BitdeerSettings data={dataWithStatus} />)

        expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalledWith(
          true,
          42,
          status,
          dataWithStatus,
        )
        expect(shouldBitdeerTankPressureFlash).toHaveBeenCalledWith(
          true,
          2.5,
          status,
          dataWithStatus,
        )
      })
    })

    it('extracts status correctly from data', () => {
      const customStatusData = { ...mockData, status: 'custom-status' }
      render(<BitdeerSettings data={customStatusData} />)

      expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalledWith(
        true,
        42,
        'custom-status',
        customStatusData,
      )
    })
  })

  describe('edge cases', () => {
    it('handles empty data object', () => {
      render(<BitdeerSettings data={{}} />)

      expect(screen.getByTestId('container-params-settings')).toBeInTheDocument()
      expect(screen.getByTestId('editable-threshold-form')).toBeInTheDocument()
    })

    it('handles null status', () => {
      const nullStatusData = { ...mockData, status: null }
      render(<BitdeerSettings data={nullStatusData} />)

      expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalledWith(true, 42, null, nullStatusData)
    })

    it('passes true as first argument to all utility functions', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(getBitdeerOilTemperatureColor).toHaveBeenCalledWith(true, expect.any(Number), mockData)
      expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalledWith(
        true,
        expect.any(Number),
        expect.any(String),
        mockData,
      )
      expect(getBitdeerTankPressureColor).toHaveBeenCalledWith(true, expect.any(Number), mockData)
      expect(shouldBitdeerTankPressureFlash).toHaveBeenCalledWith(
        true,
        expect.any(Number),
        expect.any(String),
        mockData,
      )
    })
  })

  describe('component structure', () => {
    it('renders params section before thresholds section', () => {
      const { container } = render(<BitdeerSettings data={mockData} />)

      const sections = container.querySelectorAll('section')
      const paramsSection = sections[0]
      const thresholdsSection = sections[1]

      expect(
        paramsSection.querySelector('[data-testid="container-params-settings"]'),
      ).toBeInTheDocument()
      expect(
        thresholdsSection.querySelector('[data-testid="editable-threshold-form"]'),
      ).toBeInTheDocument()
    })

    it('maintains correct CSS class structure', () => {
      const { container } = render(<BitdeerSettings data={mockData} />)

      const paramsSection = container.querySelector('.mining-sdk-bitdeer-settings__params')
      const thresholdsSection = container.querySelector('.mining-sdk-bitdeer-settings__thresholds')

      expect(
        paramsSection?.querySelector('[data-testid="container-params-settings"]'),
      ).toBeInTheDocument()
      expect(
        thresholdsSection?.querySelector('[data-testid="editable-threshold-form"]'),
      ).toBeInTheDocument()
    })
  })

  describe('integration', () => {
    it('all utility functions receive consistent data', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(getBitdeerOilTemperatureColor).toHaveBeenCalledWith(true, 42, mockData)
      expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalledWith(true, 42, 'online', mockData)
      expect(shouldBitdeerOilTemperatureSuperflash).toHaveBeenCalledWith(
        true,
        42,
        'online',
        mockData,
      )
      expect(getBitdeerTankPressureColor).toHaveBeenCalledWith(true, 2.5, mockData)
      expect(shouldBitdeerTankPressureFlash).toHaveBeenCalledWith(true, 2.5, 'online', mockData)
      expect(shouldBitdeerTankPressureSuperflash).toHaveBeenCalledWith(
        true,
        2.5,
        'online',
        mockData,
      )
    })

    it('functions are called when EditableThresholdForm renders', () => {
      render(<BitdeerSettings data={mockData} />)

      expect(getBitdeerOilTemperatureColor).toHaveBeenCalled()
      expect(shouldBitdeerOilTemperatureFlash).toHaveBeenCalled()
      expect(getBitdeerTankPressureColor).toHaveBeenCalled()
      expect(shouldBitdeerTankPressureFlash).toHaveBeenCalled()
    })
  })
})
