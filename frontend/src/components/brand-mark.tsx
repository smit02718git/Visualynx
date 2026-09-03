import { Triangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BrandMark({
  className,
  label = 'Visualynx',
}: {
  className?: string
  label?: string
}) {
  return (
    <span className={cn('flex items-center gap-2 font-semibold tracking-tight', className)}>
      <Triangle className="size-4 text-primary" strokeWidth={2} aria-hidden="true" />
      {label}
    </span>
  )
}
