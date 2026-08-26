import { Activity, Atom, Sigma } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { subjects as defaultSubjects, type Subject } from '@/lib/content'

const icons = {
  physics: Activity,
  chemistry: Atom,
  mathematics: Sigma,
} as const

export function SubjectsSection({ items = defaultSubjects }: { items?: Subject[] }) {
  return (
    <section id="subjects" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <SectionHeading eyebrow="Curriculum Scope" title="Engineered across core scientific domains" />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((subject) => {
            const Icon = icons[subject.icon]
            return (
              <li
                key={subject.name}
                className="flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-card-foreground">{subject.name}</h3>
                  <span className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                  {subject.body}
                </p>

                <p className="mt-6 font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
                  Target modules:
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {subject.modules.map((module) => (
                    <li
                      key={module}
                      className="rounded-sm border border-border bg-muted px-2 py-1 text-[10px] text-muted-foreground"
                    >
                      {module}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
