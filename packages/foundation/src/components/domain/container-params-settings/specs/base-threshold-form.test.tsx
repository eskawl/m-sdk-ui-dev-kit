import { UNITS } from '@mining-sdk/core'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useContainerThresholds } from '../../../../hooks/use-container-thresholds'
import { BaseThresholdForm } from '../base-threshold-form'

// Mock dependencies
vi.mock('../../../../hooks/use-container-thresholds', () => ({
  useContainerThresholds: vi.fn(() => ({
    thresholds: {
      oilTemperature: {
        criticalLow: 33,
        alert: 39,
        normal: 42,
        alarm: 46,
        criticalHigh: 48,
      },
    },
    isEditing: false,
    isSaving: false,
    isSiteLoading: false,
    isSettingsLoading: false,
    handleThresholdChange: vi.fn(),
    handleThresholdBlur: vi.fn(),
    handleSave: vi.fn(),
    handleReset: vi.fn(),
  })),
}))

vi.mock('@mining-sdk/core', async () => {
  const actual = await vi.importActual('@mining-sdk/core')
  return {
    ...actual,
    DataTable: vi.fn(({ data }) => (
      <table data-testid="data-table">
        <tbody>
          {data.map((row: any) => (
            <tr key={row.key}>
              <td>{row.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )),
    Spinner: vi.fn(() => <div data-testid="spinner">Loading...</div>),
    Input: vi.fn(({ value, onChange, onBlur, suffix, placeholder, ...props }) => (
      <input
        data-testid="threshold-input"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        data-suffix={suffix}
        {...props}
      />
    )),
  }
})

describe('baseThresholdForm', () => {
  const mockThresholdConfigs = [
    {
      type: 'oilTemperature',
      title: 'Oil Temperature',
      unit: UNITS.TEMPERATURE_C,
    },
  ]

  const mockData = {
    type: 'container-bd-d40',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<BaseThresholdForm data={mockData} thresholdConfigs={mockThresholdConfigs} />)
    expect(screen.getByText('Oil Temperature')).toBeInTheDocument()
  })

  it('renders loading spinner when settings are loading', async () => {
    vi.mocked(useContainerThresholds).mockReturnValue({
      thresholds: {},
      isEditing: false,
      isSaving: false,
      isSiteLoading: false,
      isSettingsLoading: true,
      handleThresholdChange: vi.fn(),
      handleThresholdBlur: vi.fn(),
      handleSave: vi.fn(),
      handleReset: vi.fn(),
      parameters: {},
      setParameters: vi.fn(),
      setIsEditing: vi.fn(),
    })

    render(<BaseThresholdForm data={mockData} thresholdConfigs={mockThresholdConfigs} />)
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('renders threshold inputs', () => {
    render(<BaseThresholdForm data={mockData} thresholdConfigs={mockThresholdConfigs} />)

    expect(screen.getByText(/Critical Low starts at:/i)).toBeInTheDocument()
    expect(screen.getByText(/Alert starts at:/i)).toBeInTheDocument()
    expect(screen.getByText(/Normal starts at:/i)).toBeInTheDocument()
  })

  it('renders data table', () => {
    render(<BaseThresholdForm data={mockData} thresholdConfigs={mockThresholdConfigs} />)

    expect(screen.getByTestId('data-table')).toBeInTheDocument()
  })

  it('renders action buttons when editing', async () => {
    vi.mocked(useContainerThresholds).mockReturnValue({
      thresholds: { oilTemperature: { criticalLow: 33 } },
      isEditing: true,
      isSaving: false,
      isSiteLoading: false,
      isSettingsLoading: false,
      handleThresholdChange: vi.fn(),
      handleThresholdBlur: vi.fn(),
      handleSave: vi.fn(),
      handleReset: vi.fn(),
      parameters: {},
      setParameters: vi.fn(),
      setIsEditing: vi.fn(),
    })

    render(<BaseThresholdForm data={mockData} thresholdConfigs={mockThresholdConfigs} />)

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Reset Values to Default')).toBeInTheDocument()
    expect(screen.getByText('Save Settings')).toBeInTheDocument()
  })

  it('does not render action buttons when not editing', () => {
    render(<BaseThresholdForm data={mockData} thresholdConfigs={mockThresholdConfigs} />)

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    expect(screen.queryByText('Save Settings')).not.toBeInTheDocument()
  })

  it('calls handleSave when save button clicked', async () => {
    const mockHandleSave = vi.fn()

    vi.mocked(useContainerThresholds).mockReturnValue({
      thresholds: { oilTemperature: { criticalLow: 33 } },
      isEditing: true,
      isSaving: false,
      isSiteLoading: false,
      isSettingsLoading: false,
      handleThresholdChange: vi.fn(),
      handleThresholdBlur: vi.fn(),
      handleSave: mockHandleSave,
      handleReset: vi.fn(),
      parameters: {},
      setParameters: vi.fn(),
      setIsEditing: vi.fn(),
    })

    render(<BaseThresholdForm data={mockData} thresholdConfigs={mockThresholdConfigs} />)

    const saveButton = screen.getByText('Save Settings')
    fireEvent.click(saveButton)

    expect(mockHandleSave).toHaveBeenCalled()
  })

  it('calls handleReset when cancel button clicked', async () => {
    const mockHandleReset = vi.fn()

    vi.mocked(useContainerThresholds).mockReturnValue({
      thresholds: { oilTemperature: { criticalLow: 33 } },
      isEditing: true,
      isSaving: false,
      isSiteLoading: false,
      isSettingsLoading: false,
      handleThresholdChange: vi.fn(),
      handleThresholdBlur: vi.fn(),
      handleSave: vi.fn(),
      handleReset: mockHandleReset,
      parameters: {},
      setParameters: vi.fn(),
      setIsEditing: vi.fn(),
    })

    render(<BaseThresholdForm data={mockData} thresholdConfigs={mockThresholdConfigs} />)

    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    expect(mockHandleReset).toHaveBeenCalled()
  })
  it('renders children when provided', () => {
    render(
      <BaseThresholdForm data={mockData} thresholdConfigs={mockThresholdConfigs}>
        <div data-testid="custom-child">Custom Content</div>
      </BaseThresholdForm>,
    )

    expect(screen.getByTestId('custom-child')).toBeInTheDocument()
  })

  it('renders multiple threshold configs', () => {
    const multipleConfigs = [
      { type: 'oilTemperature', title: 'Oil Temperature' },
      { type: 'tankPressure', title: 'Tank Pressure' },
    ]

    render(<BaseThresholdForm data={mockData} thresholdConfigs={multipleConfigs} />)

    expect(screen.getByText('Oil Temperature')).toBeInTheDocument()
    expect(screen.getByText('Tank Pressure')).toBeInTheDocument()
  })

  it('calls onSave callback when provided', async () => {
    const mockOnSave = vi.fn()

    vi.mocked(useContainerThresholds).mockReturnValue({
      thresholds: { oilTemperature: { criticalLow: 33 } },
      isEditing: true,
      isSaving: false,
      isSiteLoading: false,
      isSettingsLoading: false,
      handleThresholdChange: vi.fn(),
      handleThresholdBlur: vi.fn(),
      handleSave: mockOnSave,
      handleReset: vi.fn(),
      parameters: {},
      setParameters: vi.fn(),
      setIsEditing: vi.fn(),
    })

    render(
      <BaseThresholdForm
        data={mockData}
        thresholdConfigs={mockThresholdConfigs}
        onSave={mockOnSave}
      />,
    )

    const saveButton = screen.getByText('Save Settings')
    fireEvent.click(saveButton)

    expect(mockOnSave).toHaveBeenCalled()
  })
})
