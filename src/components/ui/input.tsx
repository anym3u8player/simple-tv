import * as React from 'react'

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { Button } from './button'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export interface InputBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showClear?: boolean
  onClear?: () => void
}

const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(
  ({ className, type, showClear, onClear, ...props }, ref) => {
    return (
      <div className={`relative w-full ${className}`}>
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          variant="outline"
          className={`${
            showClear ? 'inline-flex' : 'hidden'
          } absolute right-1 top-2 h-5 w-5 p-1 rounded-full`}
          onClick={onClear}
        >
          <X />
        </Button>
      </div>
    )
  }
)

InputBox.displayName = 'InputBox'

export { Input, InputBox }
