import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../index'

describe('button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { container, rerender } = render(<Button variant="primary">Primary</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--variant-primary')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--variant-secondary')

    rerender(<Button variant="outline">Outline</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--variant-outline')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--variant-ghost')
  })

  it('defaults to secondary variant when not specified', () => {
    const { container } = render(<Button>Default</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--variant-secondary')
  })

  it('applies size classes correctly', () => {
    const { container, rerender } = render(<Button size="sm">Small</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--size-sm')

    rerender(<Button size="md">Medium</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--size-md')

    rerender(<Button size="lg">Large</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--size-lg')
  })

  it('maps antd sizes to standard sizes', () => {
    const { container, rerender } = render(<Button size="small">Small</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--size-sm')

    rerender(<Button size="middle">Middle</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--size-md')

    rerender(<Button size="large">Large</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--size-lg')
  })

  it('defaults to md size when not specified', () => {
    const { container } = render(<Button>Default</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--size-md')
  })

  it('applies fullWidth class when prop is true', () => {
    const { container } = render(<Button fullWidth>Full Width</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--full-width')
  })

  it('applies fullWidth class when block prop is true', () => {
    const { container } = render(<Button block>Block</Button>)
    expect(container.firstChild).toHaveClass('mdk-button--full-width')
  })

  it('shows loading spinner when loading is true', () => {
    const { container } = render(<Button loading>Loading</Button>)
    expect(container.querySelector('.mdk-button__spinner')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('mdk-button--loading')
  })

  it('disables button when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('sets aria-busy when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy')
  })

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders icon on the left by default', () => {
    const { container } = render(
      <Button icon={<span data-testid="icon">👍</span>}>With Icon</Button>,
    )
    const icons = container.querySelectorAll('.mdk-button__icon')
    expect(icons).toHaveLength(1)
    const button = container.firstChild as Element | null
    expect(button?.firstElementChild?.className).toContain('mdk-button__icon')
  })

  it('renders icon on the right when iconPosition is right', () => {
    const { container } = render(
      <Button icon={<span data-testid="icon">👍</span>} iconPosition="right">
        With Icon
      </Button>,
    )
    const icons = container.querySelectorAll('.mdk-button__icon')
    expect(icons).toHaveLength(1)
    const button = container.firstChild as Element | null
    expect(button?.lastElementChild?.className).toContain('mdk-button__icon')
  })

  it('applies icon-only class when icon without children', () => {
    const { container } = render(<Button icon={<span>👍</span>} />)
    expect(container.firstChild).toHaveClass('mdk-button--icon-only')
  })

  it('wraps children in label span', () => {
    const { container } = render(<Button>Click me</Button>)
    expect(container.querySelector('.mdk-button__label')).toBeInTheDocument()
  })

  it('defaults to button type when not specified', () => {
    render(<Button>Default Type</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('applies custom type attribute', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('handles onClick event', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)

    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger onClick when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    )

    screen.getByRole('button').click()
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>)
    expect(container.firstChild).toHaveClass('custom-class')
    expect(container.firstChild).toHaveClass('mdk-button')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>With Ref</Button>)
    expect(ref).toHaveBeenCalled()
  })

  it('passes through additional props', () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom Button">
        Custom Props
      </Button>,
    )
    const button = screen.getByTestId('custom-button')
    expect(button).toHaveAttribute('aria-label', 'Custom Button')
  })

  it('renders loading and icon together', () => {
    const { container } = render(
      <Button loading icon={<span>👍</span>}>
        Loading with Icon
      </Button>,
    )
    expect(container.querySelector('.mdk-button__spinner')).toBeInTheDocument()
    expect(container.querySelector('.mdk-button__icon')).toBeInTheDocument()
  })
})
