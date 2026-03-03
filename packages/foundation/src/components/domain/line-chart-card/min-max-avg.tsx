import _map from 'lodash/map'
import _reject from 'lodash/reject'

const ITEM_DEFAULT_VALUE = ''

export const MinMaxAvg = ({
  min = ITEM_DEFAULT_VALUE,
  max = ITEM_DEFAULT_VALUE,
  avg = ITEM_DEFAULT_VALUE,
}): JSX.Element => {
  const rows = _reject(
    [
      {
        label: 'Min',
        value: min,
      },
      {
        label: 'Max',
        value: max,
      },
      {
        label: 'Avg',
        value: avg,
      },
    ],
    { value: ITEM_DEFAULT_VALUE },
  )

  return (
    <>
      {_map(rows, (item: { label: string; value: string | number }) => (
        <div className="mining-sdk-line-chart-card-footer-row" key={item.label}>
          <div className="mining-sdk-line-chart-card-footer__text--primary">{item.label}</div>
          <div className="mining-sdk-line-chart-card-footer__text--secondary">
            {avg === '-' ? '-' : item.value}
          </div>
        </div>
      ))}
    </>
  )
}

export default MinMaxAvg
