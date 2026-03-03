import { RadioCard, RadioGroup } from '@mining-sdk/core'
import _map from 'lodash/map'
import _noop from 'lodash/noop'

export type Timeline = '5m' | '30m' | '3h' | '1D'

export type RadioButton = {
  label?: string
  value: string
  text: string
  disabled?: boolean
}

export type TimelineToggleProps = {
  value?: string
  disabled?: boolean
  radioButtons?: RadioButton[]
  onChange?: (value: Timeline) => void
}

export const TimelineToggle = ({
  radioButtons = [],
  value = '',
  disabled = false,
  onChange = _noop,
}: TimelineToggleProps): JSX.Element => {
  return (
    <RadioGroup
      className="mining-sdk-timeline-toggle"
      defaultValue="5min"
      orientation="horizontal"
      noGap
      onValueChange={onChange}
      value={value}
      disabled={disabled}
    >
      {_map(radioButtons, (button: RadioButton) => (
        <RadioCard
          key={button.value}
          value={button.value}
          disabled={button.disabled}
          label={button.text}
        />
      ))}
    </RadioGroup>
  )
}

export default TimelineToggle
