import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Device } from '../../../../../../types'
import { MicroBTCooling } from '../cooling/micro-bt-cooling'

vi.mock('@mining-sdk/core', () => ({
  Indicator: vi.fn(({ color, children }) => <div data-color={color}>{children}</div>),
  UNITS: { PERCENT: '%', FREQUENCY_HERTZ: 'Hz' },
}))

vi.mock('../../../../../../utils/container-utils', () => ({
  isMicroBTKehua: vi.fn((type) => type?.includes('kehua')),
}))

vi.mock('../../../../../../utils/device-utils', () => ({
  getContainerSpecificStats: vi.fn((data) => data?.last?.snap?.stats?.container_specific || {}),
}))

describe('MicroBTCooling', () => {
  const mockDevice: Device = {
    id: '1',
    type: 'microbt',
    status: 'active',
    last: {
      snap: {
        stats: {
          container_specific: {
            cdu: {
              cycle_pump_control: true,
              circulation_pump_speed: 50,
              makeup_water_pump_fault: true,
            },
          },
        },
        config: {},
      },
    },
  }

  it('returns null without data', () => {
    const { container } = render(<MicroBTCooling />)
    expect(container.firstChild).toBeNull()
  })

  it('renders all sections', () => {
    render(<MicroBTCooling data={mockDevice} />)
    expect(screen.getByText('Main Circulation Pump')).toBeInTheDocument()
    expect(screen.getByText('Cooling Fan')).toBeInTheDocument()
    expect(screen.getByText('Make Up Pump')).toBeInTheDocument()
  })

  it('shows running status', () => {
    render(<MicroBTCooling data={mockDevice} />)
    expect(screen.getByText('Running')).toBeInTheDocument()
  })

  it('shows speed with Hz', () => {
    render(<MicroBTCooling data={mockDevice} />)
    expect(screen.getByText(/50.*Hz/)).toBeInTheDocument()
  })

  it('shows speed with % for Kehua', () => {
    const kehua = { ...mockDevice, type: 'microbt-kehua' }
    render(<MicroBTCooling data={kehua} />)
    expect(screen.getByText(/50.*%/)).toBeInTheDocument()
  })

  it('shows fault status', () => {
    render(<MicroBTCooling data={mockDevice} />)
    expect(screen.getByText('Error')).toBeInTheDocument()
  })
})
