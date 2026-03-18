import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../index'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    const { container, rerender } = render(<Button variant="primary">Primary</Button>)
    expect(container.firstChild).toHaveClass('mining-sdk-button--variant-primary')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(container.firstChild).toHaveClass('mining-sdk-button--variant-secondary')

    rerender(<Button variant="danger">Danger</Button>)
    expect(container.firstChild).toHaveClass('mining-sdk-button--variant-danger')

    rerender(<Button variant="tertiary">Tertiary</Button>)
    expect(container.firstChild).toHaveClass('mining-sdk-button--variant-tertiary')

    rerender(<Button variant="link">Link</Button>)
    expect(container.firstChild).toHaveClass('mining-sdk-button--variant-link')
  })

  it('defaults to secondary variant', () => {
    const { container } = render(<Button>Default</Button>)
    expect(container.firstChild).toHaveClass('mining-sdk-button--variant-secondary')
  })

  it('shows loading state', () => {
    const { container } = render(<Button loading>Loading</Button>)
    expect(container.querySelector('.mining-sdk-button__loading')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('mining-sdk-button--loading')
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy')
  })

  it('disables when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders icon left or right', () => {
    const { container } = render(
      <Button icon={<span>icon</span>} iconPosition="left">
        Text
      </Button>,
    )
    expect(container.querySelector('.mining-sdk-button__icon')).toBeInTheDocument()
    expect(container.querySelector('.mining-sdk-button__content')?.firstElementChild).toHaveClass(
      'mining-sdk-button__icon',
    )

    const { container: c2 } = render(
      <Button icon={<span>icon</span>} iconPosition="right">
        Text
      </Button>,
    )
    expect(c2.querySelector('.mining-sdk-button__content')?.lastElementChild).toHaveClass(
      'mining-sdk-button__icon',
    )
  })

  it('defaults to type="button"', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('handles click', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not fire click when disabled', () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    )
    screen.getByRole('button').click()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('merges className', () => {
    const { container } = render(<Button className="custom">Click</Button>)
    expect(container.firstChild).toHaveClass('mining-sdk-button', 'custom')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Click</Button>)
    expect(ref).toHaveBeenCalled()
  })

  it('passes through props', () => {
    render(
      <Button data-testid="btn" aria-label="Label">
        Click
      </Button>,
    )
    expect(screen.getByTestId('btn')).toHaveAttribute('aria-label', 'Label')
  })
})
