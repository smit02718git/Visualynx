import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  tone?: 'light' | 'deep'
  className?: string
}) {
  const deep = tone === 'deep'

  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <span
        className={cn(
          'rounded-sm px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.18em] uppercase',
          deep ? 'bg-primary/20 text-primary' : 'bg-accent text-accent-foreground',
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          'mt-6 max-w-3xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl',
          deep ? 'text-deep-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-pretty text-sm leading-relaxed',
            deep ? 'text-deep-muted' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
