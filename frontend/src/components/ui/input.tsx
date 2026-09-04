import * as React from 'react'
import { cn } from '@/lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => (
    <div className="relative w-full">
      {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">{icon}</span>}
      <input
        ref={ref}
        {...props}
        className={cn(
          'h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50',
          icon && 'pl-10',
          className,
        )}
      />
    </div>
  ),
)
Input.displayName = 'Input'
