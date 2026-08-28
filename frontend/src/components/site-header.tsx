'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { navLinks as defaultNavLinks, type NavLink } from '@/lib/content'

export function SiteHeader({
  links = defaultNavLinks,
  onSignIn,
  onStart,
}: {
  links?: NavLink[]
  onSignIn?: () => void
  onStart?: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-deep-border/70 bg-deep/95 text-deep-foreground backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 lg:px-8">
        <a href="#top" className="text-base">
          <BrandMark />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-deep-muted transition-colors hover:text-deep-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/login"
            onClick={onSignIn}
            className="text-sm text-deep-muted transition-colors hover:text-deep-foreground"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            onClick={onStart}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Learning
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-9 items-center justify-center rounded-md border border-deep-border text-deep-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-deep-border bg-deep md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-deep-muted hover:bg-deep-card hover:text-deep-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-3">
              <Link
                href="/login"
                onClick={onSignIn}
                className="flex-1 rounded-md border border-deep-border px-4 py-2 text-sm"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={onStart}
                className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Start Learning
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
