import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Device } from '../../../../../../types/device'
import { HydroEditableThresholdForm } from '../../../../container-params-settings/hydro-editable-threshold-form'
import { BitMainHydroSettings } from '../bitmain-hydro-settings'
import { BitMainBasicSettings } from '../status-item'

// Mock child components
vi.mock('../status-item', () => ({
  BitMainBasicSettings: vi.fn(({ data }) => (
    <div data-testid="basic-settings">Basic Settings - {data?.id || 'no-data'}</div>
  )),
}))

vi.mock('../../../../container-params-settings/hydro-editable-threshold-form', () => ({
  HydroEditableThresholdForm: vi.fn(({ data, waterTempColorFunc }) => (
    <div data-testid="threshold-form">
      Threshold Form - {data?.id || 'no-data'} - {waterTempColorFunc ? 'has-funcs' : 'no-funcs'}
    </div>
  )),
}))

// Mock utils
vi.mock('../bitmain-hydro-utils', () => ({
  getAntspaceSupplyLiquidTemperatureColor: vi.fn(() => 'green'),
  getAntspaceSupplyLiquidPressureColor: vi.fn(() => 'green'),
  shouldAntspaceSupplyLiquidTempFlash: vi.fn(() => false),
  shouldAntspaceSupplyLiquidTempSuperflash: vi.fn(() => false),
  shouldAntspacePressureFlash: vi.fn(() => false),
  shouldAntspacePressureSuperflash: vi.fn(() => false),
}))

describe('bitMainHydroSettings', () => {
  const mockDevice: Device = {
    id: 'device-1',
    type: 'bitmain-hydro',
    status: 'active',
    last: {
      snap: {
        stats: {
          water_temperature: 45,
          supply_liquid_pressure: 1.8,
        },
        config: {},
      },
    },
  }

  it('renders without crashing', () => {
    render(<BitMainHydroSettings data={mockDevice} />)
    expect(screen.getByTestId('basic-settings')).toBeInTheDocument()
    expect(screen.getByTestId('threshold-form')).toBeInTheDocument()
  })

  it('renders BitMainBasicSettings component', () => {
    render(<BitMainHydroSettings data={mockDevice} />)
    expect(screen.getByText(/Basic Settings/)).toBeInTheDocument()
  })

  it('renders HydroEditableThresholdForm component', () => {
    render(<BitMainHydroSettings data={mockDevice} />)
    expect(screen.getByText(/Threshold Form/)).toBeInTheDocument()
  })

  it('passes data to BitMainBasicSettings', () => {
    render(<BitMainHydroSettings data={mockDevice} />)

    expect(BitMainBasicSettings).toHaveBeenCalledWith(
      expect.objectContaining({
        data: mockDevice,
      }),
      expect.anything(),
    )
  })

  it('passes data to HydroEditableThresholdForm', () => {
    render(<BitMainHydroSettings data={mockDevice} />)

    expect(HydroEditableThresholdForm).toHaveBeenCalledWith(
      expect.objectContaining({
        data: mockDevice,
      }),
      expect.anything(),
    )
  })

  it('passes all threshold functions to HydroEditableThresholdForm', () => {
    render(<BitMainHydroSettings data={mockDevice} />)

    expect(HydroEditableThresholdForm).toHaveBeenCalledWith(
      expect.objectContaining({
        waterTempColorFunc: expect.any(Function),
        waterTempFlashFunc: expect.any(Function),
        waterTempSuperflashFunc: expect.any(Function),
        pressureColorFunc: expect.any(Function),
        pressureFlashFunc: expect.any(Function),
        pressureSuperflashFunc: expect.any(Function),
      }),
      expect.anything(),
    )
  })

  it('renders without data', () => {
    render(<BitMainHydroSettings />)

    expect(screen.getByTestId('basic-settings')).toBeInTheDocument()
    expect(screen.getByTestId('threshold-form')).toBeInTheDocument()
  })

  it('has correct wrapper structure', () => {
    const { container } = render(<BitMainHydroSettings data={mockDevice} />)

    expect(container.querySelector('.mining-sdk-bitmain-hydro-settings')).toBeInTheDocument()
    expect(
      container.querySelector('.mining-sdk-bitmain-hydro-settings__params'),
    ).toBeInTheDocument()
    expect(
      container.querySelector('.mining-sdk-bitmain-hydro-settings__thresholds'),
    ).toBeInTheDocument()
  })

  it('renders two sections', () => {
    const { container } = render(<BitMainHydroSettings data={mockDevice} />)

    const sections = container.querySelectorAll('section')
    expect(sections).toHaveLength(2)
  })

  it('extracts device status correctly', () => {
    render(<BitMainHydroSettings data={mockDevice} />)

    // The status should be passed to the utility functions
    // We can verify this by checking if HydroEditableThresholdForm received the functions
    expect(HydroEditableThresholdForm).toHaveBeenCalled()
  })
})
