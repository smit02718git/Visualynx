import { SectionHeading } from '@/components/section-heading'

export function WorkspaceSection({
  moduleName = 'Electromagnetism Module — Lorentz Force Workspace',
  theoryTitle = 'Charged Particles in B-Fields',
  theoryBody = 'When a particle of charge q enters a uniform magnetic field B at velocity v, it experiences the Lorentz force, orthogonal to both velocity and field vector lines.',
  equation = 'F = q · ( v × B )',
}: {
  moduleName?: string
  theoryTitle?: string
  theoryBody?: string
  equation?: string
}) {
  return (
    <section id="workspace" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <SectionHeading eyebrow="Interactive Workspace" title="The visual laboratory on your screen" />

        <div className="mt-14 overflow-hidden rounded-xl border border-deep-border bg-deep shadow-2xl shadow-foreground/10">
          {/* window chrome */}
          <div className="flex items-center justify-between gap-3 border-b border-deep-border px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-2 rounded-full bg-destructive/80" />
                <span className="size-2 rounded-full bg-chart-4/80" />
                <span className="size-2 rounded-full bg-primary/70" />
              </span>
              <span className="truncate text-xs text-deep-muted">{moduleName}</span>
            </div>
            <span className="hidden shrink-0 rounded-sm bg-primary/15 px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-primary uppercase sm:inline">
              Active simulation
            </span>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr]">
            {/* theory panel */}
            <div className="border-b border-deep-border bg-deep-card p-6 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[9px] tracking-[0.16em] text-primary uppercase">
                Theory summary
              </p>
              <h3 className="mt-4 text-lg font-semibold text-deep-foreground">{theoryTitle}</h3>
              <p className="mt-4 text-[12px] leading-relaxed text-deep-muted">{theoryBody}</p>

              <div className="mt-6 rounded-md border border-deep-border bg-deep/70 p-4">
                <p className="text-[10px] text-deep-muted">Lorentz Equation</p>
                <p className="mt-2 font-mono text-sm text-deep-foreground">{equation}</p>
              </div>
            </div>

            {/* field visualization */}
            <div className="relative min-h-[320px] p-6">
              <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden="true" />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <p className="text-[11px] text-deep-foreground">
                  Magnetic Field (B) — vector orientation
                </p>
                <ul className="flex flex-col gap-1.5 rounded-md border border-deep-border bg-deep-card/90 p-2.5">
                  <li className="flex items-center gap-2 text-[9px] text-deep-muted">
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                    Electron path trajectory
                  </li>
                  <li className="flex items-center gap-2 text-[9px] text-deep-muted">
                    <span className="size-1.5 rounded-full bg-destructive" aria-hidden="true" />
                    Force vector (F)
                  </li>
                </ul>
              </div>

              <div className="relative mt-4 flex items-center gap-3" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="size-1.5 rounded-full border border-deep-muted/60" />
                ))}
              </div>

              <div className="relative mt-10 flex items-center justify-center pb-6">
                <div className="relative size-40 rounded-full border border-dashed border-primary/60">
                  <div className="absolute inset-0 animate-[spin_9s_linear_infinite]">
                    <span
                      className="absolute -left-1.5 top-1/2 flex size-3 -translate-y-1/2 items-center justify-center rounded-full bg-destructive"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="absolute left-1/2 top-1/2 h-px w-12 -translate-y-1/2 bg-destructive/50" />
                  <span className="absolute left-1/2 top-1/2 ml-14 -translate-y-1/2 font-mono text-[9px] whitespace-nowrap text-destructive">
                    F_lorentz
                  </span>
                  <span
                    className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
