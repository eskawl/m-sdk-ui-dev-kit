import type { LogItemProps } from './types'
import { RightNavigateIcon } from '../icons'

const LogItem = ({ data, onLogClicked }: LogItemProps): JSX.Element => {
  const { title, subtitle, body, uuid } = data

  const handleClick = (): void => {
    onLogClicked?.(uuid)
  }

  const bodyItems = body?.split('|') ?? []

  return (
    <div className="mining-sdk-logs-card__container">
      <div className="mining-sdk-logs-card__log-inner-container" onClick={handleClick}>
        <div className="mining-sdk-logs-card__data-container">
          <div className="mining-sdk-logs-card__header-container">
            <div className="mining-sdk-logs-card__title-text">{title}</div>
          </div>

          <div className="mining-sdk-logs-card__subtitle-text" title={subtitle}>
            {subtitle}
          </div>

          <div className="mining-sdk-logs-card__body-text">
            {bodyItems.map((item, index) => (
              <div key={`${uuid}-${index}`}>{item}</div>
            ))}
          </div>
        </div>

        {onLogClicked && (
          <div className="mining-sdk-logs-card__icon-wrapper">
            <RightNavigateIcon />
          </div>
        )}
      </div>
    </div>
  )
}

LogItem.displayName = 'LogItem'

export { LogItem }
export default LogItem
