import { GitBranch, Globe, MessageCircle } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { footerColumns as defaultColumns, type FooterColumn } from '@/lib/content'

export function SiteFooter({
  columns = defaultColumns,
  blurb = 'The AI-powered conceptual laboratory for advanced physics, chemistry, and mathematics comprehension.',
}: {
  columns?: FooterColumn[]
  blurb?: string
}) {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <BrandMark className="text-base" />
            <p className="mt-4 max-w-xs text-[11px] leading-relaxed text-deep-muted">{blurb}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <p className="font-mono text-[9px] tracking-[0.16em] text-deep-foreground uppercase">
                  {column.heading}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[11px] text-deep-muted transition-colors hover:text-deep-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-deep-border pt-6 sm:flex-row sm:items-center">
          <p className="text-[10px] text-deep-muted">
            © {new Date().getFullYear()} Visualynx Inc. Scientific-editorial visual learning engines.
            All rights reserved.
          </p>
          <ul className="flex items-center gap-4">
            {[
              { Icon: MessageCircle, label: 'Community' },
              { Icon: GitBranch, label: 'Open research' },
              { Icon: Globe, label: 'Global programs' },
            ].map(({ Icon, label }) => (
              <li key={label}>
                <a href="#" className="text-deep-muted transition-colors hover:text-deep-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
