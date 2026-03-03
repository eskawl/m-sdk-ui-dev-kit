import _isEmpty from 'lodash/isEmpty'
import { TimelineToggle } from '../timeline-toggle'
import type { RadioButton, Timeline } from '../timeline-toggle'

type LineChartCardToggleProps = {
  title?: string
  timeline?: string
  radioButtons?: RadioButton[]
  onChangeTimeline?: (value: Timeline) => void
}

export const LineChartCardToggle = ({
  title,
  timeline,
  onChangeTimeline,
  radioButtons = [],
}: LineChartCardToggleProps): JSX.Element => (
  <div className="mining-sdk-line-chart-card__toggle">
    {title && <div className="mining-sdk-line-chart-card__toggle-title">{title}</div>}
    {!_isEmpty(radioButtons) && (
      <div className="mining-sdk-line-chart-card__toggle-header">
        <div className="mining-sdk-line-chart-card__toggle-header-content">
          <TimelineToggle
            radioButtons={radioButtons.map((btn) => ({
              value: btn.value,
              disabled: btn.disabled ?? false,
              text: btn.text || btn.label || '',
            }))}
            value={timeline}
            onChange={onChangeTimeline}
          />
        </div>
      </div>
    )}
  </div>
)

export default LineChartCardToggle
