import { ArrowRight, GraduationCap } from 'lucide-react'
import { SimulationPanel } from '@/components/simulation-panel'

export function HeroSection({
  headline = ['Learn STEM.', 'Visually.'],
  body = 'Turn complex equations and abstract proofs into interactive visual simulations. Built specifically for deep comprehension in Physics, Chemistry, and Mathematics.',
  trustNote = 'Trusted by students at leading engineering & science programs globally',
}: {
  headline?: [string, string]
  body?: string
  trustNote?: string
}) {
  return (
    <section id="top" className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
            {headline[0]}
            <br />
            {headline[1]}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-deep-muted">{body}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#pipeline"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start Learning
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#workspace"
              className="inline-flex items-center rounded-md border border-deep-border px-5 py-2.5 text-sm text-deep-foreground transition-colors hover:bg-deep-card"
            >
              See how it works
            </a>
          </div>

          <p className="mt-8 flex items-center gap-2 text-[11px] text-deep-muted">
            <GraduationCap className="size-4 text-primary" aria-hidden="true" />
            {trustNote}
          </p>
        </div>

        <SimulationPanel />
      </div>
    </section>
  )
}
