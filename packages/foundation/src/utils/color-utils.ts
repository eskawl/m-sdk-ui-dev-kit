import _isString from 'lodash/isString'
import _join from 'lodash/join'
import _map from 'lodash/map'
import _parseInt from 'lodash/parseInt'
import _replace from 'lodash/replace'
import _size from 'lodash/size'
import _slice from 'lodash/slice'
import _split from 'lodash/split'

export const hexToOpacity = (hex: string | unknown, opacity = 0.2): string => {
  if (!_isString(hex)) {
    throw new Error(
      `Expected a string for HEX color, but received ${typeof hex} ${JSON.stringify(hex)}`,
    )
  }

  let cleanedHex = _replace(hex, '#', '')

  if (_size(cleanedHex) === 3) {
    const chars = _split(cleanedHex, '')
    cleanedHex = _join(
      _map(chars, (char: string) => char + char),
      '',
    )
  }

  const r = _parseInt(_join(_slice(cleanedHex, 0, 2), ''), 16)
  const g = _parseInt(_join(_slice(cleanedHex, 2, 4), ''), 16)
  const b = _parseInt(_join(_slice(cleanedHex, 4, 6), ''), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
