import type { ReactNode } from 'react'
import Link from 'next/link'
import { BrandMark } from '@/components/brand-mark'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-dvh bg-background text-foreground lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
      <aside className="relative hidden overflow-hidden bg-deep p-10 text-deep-foreground lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--deep-border)_1px,transparent_1px),linear-gradient(90deg,var(--deep-border)_1px,transparent_1px)] [background-size:52px_52px]" />
        <Link href="/" className="relative z-10"><BrandMark className="text-deep-foreground" /></Link>
        <div className="relative z-10 max-w-md pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Visual learning lab</p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight">Make difficult ideas click.</h2>
          <p className="mt-5 text-sm leading-7 text-deep-muted">Explore STEM concepts through interactive visual simulations built for understanding.</p>
        </div>
      </aside>
      <section className="flex min-h-dvh items-center px-5 py-8 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mb-10 inline-flex lg:hidden"><BrandMark /></Link>
          {children}
        </div>
      </section>
    </main>
  )
}
