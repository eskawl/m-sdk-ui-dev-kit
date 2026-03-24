import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { cn } from '../../utils'
import { Checkbox } from '../checkbox'
import { Input } from '../input'

// Re-export Radix primitives
const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub

// Types
type DropdownMenuSize = 'sm' | 'md' | 'lg'

type BaseStaticItemProps = {
  disabled?: boolean
  active?: boolean
}

// Context for size propagation
const DropdownMenuSizeContext = React.createContext<DropdownMenuSize>('md')

// Content
type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> & {
  /** @default 'md' */
  size?: DropdownMenuSize
  /** Aligns the dropdown width to the trigger width */
  alignWidth?: boolean
}

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, alignWidth = false, align, size = 'md', ...props }, ref) => (
  <DropdownMenuSizeContext.Provider value={size}>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align ?? (alignWidth ? 'start' : undefined)}
        className={cn(
          'mdk-dropdown-menu__content',
          alignWidth && 'mdk-dropdown-menu__content--align-width',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuSizeContext.Provider>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

type DropdownMenuStaticContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /** @default 'md' */
  size?: DropdownMenuSize
}

const DropdownMenuStaticContent = React.forwardRef<HTMLDivElement, DropdownMenuStaticContentProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <DropdownMenuSizeContext.Provider value={size}>
      <div ref={ref} className={cn('mdk-dropdown-menu__content', className)} {...props} />
    </DropdownMenuSizeContext.Provider>
  ),
)
DropdownMenuStaticContent.displayName = 'DropdownMenuStaticContent'

// Item
type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  icon?: React.ReactNode
}

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn('mdk-dropdown-menu__item', className)}
    {...props}
  >
    {icon && <span className="mdk-dropdown-menu__item-icon">{icon}</span>}
    {children}
  </DropdownMenuPrimitive.Item>
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

type DropdownMenuStaticItemProps = React.HTMLAttributes<HTMLDivElement> &
  BaseStaticItemProps & {
    icon?: React.ReactNode
  }

const DropdownMenuStaticItem = React.forwardRef<HTMLDivElement, DropdownMenuStaticItemProps>(
  ({ className, icon, disabled, active, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mdk-dropdown-menu__item', className)}
      data-disabled={disabled || undefined}
      data-active={active || undefined}
      {...props}
    >
      {icon && <span className="mdk-dropdown-menu__item-icon">{icon}</span>}
      {children}
    </div>
  ),
)
DropdownMenuStaticItem.displayName = 'DropdownMenuStaticItem'

type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn('mdk-dropdown-menu__checkbox-item', className)}
    checked={checked}
    {...props}
  >
    <Checkbox checked={checked === true} size="xs" />
    {children}
    <DropdownMenuPrimitive.ItemIndicator className="mdk-dropdown-menu__item-indicator">
      <CheckIcon />
    </DropdownMenuPrimitive.ItemIndicator>
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

type DropdownMenuStaticCheckboxItemProps = React.HTMLAttributes<HTMLDivElement> &
  BaseStaticItemProps & {
    checked?: boolean
  }

const DropdownMenuStaticCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuStaticCheckboxItemProps
>(({ className, checked, disabled, active, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mdk-dropdown-menu__item', className)}
    data-disabled={disabled || undefined}
    data-active={active || undefined}
    {...props}
  >
    <Checkbox checked={checked} size="xs" />
    {children}
  </div>
))
DropdownMenuStaticCheckboxItem.displayName = 'DropdownMenuStaticCheckboxItem'

/**
 * DropdownMenuRadioItem - A menu item with radio state
 */
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn('mdk-dropdown-menu__radio-item', className)}
    {...props}
  >
    {children}
    <DropdownMenuPrimitive.ItemIndicator className="mdk-dropdown-menu__item-indicator">
      <CheckIcon />
    </DropdownMenuPrimitive.ItemIndicator>
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

/**
 * DropdownMenuLabel - Non-interactive label for a group
 */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('mdk-dropdown-menu__label', className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('mdk-dropdown-menu__separator', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

/**
 * DropdownMenuShortcut - Keyboard shortcut display (e.g. ⌘C)
 */
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): React.ReactElement => (
  <span className={cn('mdk-dropdown-menu__item-shortcut', className)} {...props} />
)
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

type DropdownMenuSearchProps = React.ComponentPropsWithoutRef<typeof Input>

const DropdownMenuSearch = React.forwardRef<HTMLInputElement, DropdownMenuSearchProps>(
  ({ className, placeholder = 'Search', ...props }, ref) => (
    <div className="mdk-dropdown-menu__search">
      <Input
        ref={ref}
        variant="search"
        placeholder={placeholder}
        className={cn('mdk-dropdown-menu__search-input', className)}
        {...props}
      />
    </div>
  ),
)
DropdownMenuSearch.displayName = 'DropdownMenuSearch'

type DropdownMenuEmptyProps = React.HTMLAttributes<HTMLDivElement> & {
  /** @default 'No matching results found' */
  message?: string
}

/**
 * DropdownMenuSubTrigger - Opens a submenu
 */
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn('mdk-dropdown-menu__sub-trigger', className)}
    {...props}
  >
    {children}
    <ChevronRightIcon className="mdk-dropdown-menu__item-icon" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

/**
 * DropdownMenuSubContent - Submenu panel
 */
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn('mdk-dropdown-menu__sub-content', className)}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuEmpty = React.forwardRef<HTMLDivElement, DropdownMenuEmptyProps>(
  ({ className, message = 'No matching results found', children, ...props }, ref) => (
    <div ref={ref} className={cn('mdk-dropdown-menu__empty', className)} {...props}>
      {children || message}
    </div>
  ),
)
DropdownMenuEmpty.displayName = 'DropdownMenuEmpty'

type SearchableItem = {
  label: string
  icon?: React.ReactNode
} & BaseStaticItemProps

type DropdownMenuSearchableProps = {
  items: SearchableItem[]
  /** @default 'Search' */
  placeholder?: string
  /** @default 'No matching results found' */
  emptyMessage?: string
  onItemSelect?: (item: SearchableItem) => void
}

const DropdownMenuSearchable: React.FC<DropdownMenuSearchableProps> = ({
  items,
  placeholder = 'Search',
  emptyMessage = 'No matching results found',
  onItemSelect,
}) => {
  const [search, setSearch] = React.useState('')

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      <DropdownMenuSearch
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <DropdownMenuStaticItem
            key={item.label}
            disabled={item.disabled}
            active={item.active}
            icon={item.icon}
            onClick={() => onItemSelect?.(item)}
          >
            {item.label}
          </DropdownMenuStaticItem>
        ))
      ) : (
        <DropdownMenuEmpty message={emptyMessage} />
      )}
    </>
  )
}
DropdownMenuSearchable.displayName = 'DropdownMenuSearchable'

export {
  // Aliases
  DropdownMenuCheckboxItem as CheckboxItem,
  DropdownMenuContent as Content,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioItem,
  DropdownMenuSearch,
  DropdownMenuSearchable,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuStaticCheckboxItem,
  DropdownMenuStaticContent,
  DropdownMenuStaticItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuEmpty as Empty,
  DropdownMenuGroup as Group,
  DropdownMenuItem as Item,
  DropdownMenuLabel as Label,
  DropdownMenuPortal as Portal,
  DropdownMenuRadioItem as RadioItem,
  DropdownMenu as Root,
  DropdownMenuSearch as Search,
  DropdownMenuSearchable as Searchable,
  DropdownMenuSeparator as Separator,
  DropdownMenuShortcut as Shortcut,
  DropdownMenuStaticCheckboxItem as StaticCheckboxItem,
  DropdownMenuStaticContent as StaticContent,
  DropdownMenuStaticItem as StaticItem,
  DropdownMenuSub as Sub,
  DropdownMenuSubContent as SubContent,
  DropdownMenuSubTrigger as SubTrigger,
  DropdownMenuTrigger as Trigger,
}
