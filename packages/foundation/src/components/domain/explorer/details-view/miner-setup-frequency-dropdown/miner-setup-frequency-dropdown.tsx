import { Button, DropdownMenu } from '@mdk/core'

type MinerSetupFrequencyDropdownProps = {
  disabled: boolean
  buttonText: string
  onFrequencyToggle: (frequency: string) => void
  selectedFrequency: (string | number)[]
}

const FREQUENCY_COUNT = 10

export const MinerSetupFrequencyDropdown = ({
  disabled,
  buttonText = '',
  onFrequencyToggle,
  selectedFrequency = [],
}: Partial<MinerSetupFrequencyDropdownProps>) => {
  const selectedKeys = selectedFrequency.map(String)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild disabled={disabled}>
        <Button variant="secondary">{buttonText}</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start" side="top">
        <DropdownMenu.Group>
          {Array.from({ length: FREQUENCY_COUNT }, (_, index) => {
            const key = String(index)
            return (
              <DropdownMenu.StaticCheckboxItem
                key={key}
                checked={selectedKeys.includes(key)}
                onClick={() => onFrequencyToggle?.(key)}
              >
                {`Frequency: ${index}`}
              </DropdownMenu.StaticCheckboxItem>
            )
          })}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
