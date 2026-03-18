import React from 'react'
import type { ButtonIconPosition, ButtonVariant } from '../../types'
import { Spinner } from '../spinner'
import { cn } from '../../utils'

export type ButtonProps = Partial<
  {
    loading: boolean
    fullWidth: boolean
    icon: React.ReactNode
    variant: ButtonVariant
    contentClassName: string
    iconPosition: ButtonIconPosition
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      icon,
      disabled,
      children,
      className,
      fullWidth,
      type = 'button',
      loading = false,
      contentClassName,
      variant = 'secondary',
      iconPosition = 'left',
      ...props
    },
    ref,
  ) => {
    const leftIcon = icon && iconPosition === 'left'
    const rightIcon = icon && iconPosition === 'right'

    const buttonClasses = cn(
      'mining-sdk-button',
      `mining-sdk-button--variant-${variant}`,
      fullWidth && 'mining-sdk-button--full-width',
      loading && 'mining-sdk-button--loading',
      className,
    )

    const contentClasses = cn(
      'mining-sdk-button__content',
      `mining-sdk-button__content--${variant}`,
      contentClassName,
    )

    return (
      <button
        ref={ref}
        type={type}
        data-variant={variant}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <span className="mining-sdk-button__loading" aria-hidden="true">
            <Spinner size="sm" type="circle" />
          </span>
        ) : (
          <span className={contentClasses}>
            {leftIcon && <span className="mining-sdk-button__icon">{icon}</span>}
            {children && <span className="mining-sdk-button__children">{children}</span>}
            {rightIcon && <span className="mining-sdk-button__icon">{icon}</span>}
          </span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
