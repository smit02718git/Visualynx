import { AlertTriangle, ArrowUpRight } from 'lucide-react'

export function DiagnosticsSection({
  title = 'Smarter learning by exposing false mental models',
  body = 'Students don’t just fail exams because they forget equations — they fail because they harbor incorrect intuitive assumptions. Visualynx specifically challenges these misconceptions using real-time graphical counter-proofs.',
  misconception = 'An object in vacuum falls faster if it weighs more',
  explanation = 'Gravitational pull scales directly with mass, but so does the inertial resistance to movement. Both terms cancel out precisely, achieving uniform acceleration (g ≈ 9.81 m/s²) for all objects regardless of mass.',
  proofNote = 'Proved dynamically in kinematic modules',
  ctaLabel = 'Open Galileo Sandbox',
  ctaHref = '#',
}: {
  title?: string
  body?: string
  misconception?: string
  explanation?: string
  proofNote?: string
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <section id="diagnostics" className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <span className="rounded-sm bg-primary/20 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
            Diagnostic Prevention
          </span>
          <h2 className="mt-6 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-[13px] leading-relaxed text-deep-muted">{body}</p>
        </div>

        <article className="rounded-lg border border-destructive/60 bg-destructive/5 p-6">
          <p className="flex items-center gap-2 font-mono text-[9px] tracking-[0.14em] text-destructive uppercase">
            <AlertTriangle className="size-3.5" aria-hidden="true" />
            Diagnostic alert: common misconception
          </p>
          <blockquote className="mt-4 text-base font-medium text-deep-foreground">
            &ldquo;{misconception}&rdquo;
          </blockquote>

          <div className="mt-6 border-t border-destructive/30 pt-4">
            <p className="font-mono text-[9px] tracking-[0.14em] text-destructive uppercase">
              Why this fails intuitive mechanics
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-deep-muted">{explanation}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] text-deep-muted">{proofNote}</p>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
            >
              {ctaLabel}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
