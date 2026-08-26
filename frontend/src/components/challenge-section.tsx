import { SectionHeading } from '@/components/section-heading'
import { challenges as defaultChallenges, type Challenge } from '@/lib/content'

export function ChallengeSection({ items = defaultChallenges }: { items?: Challenge[] }) {
  return (
    <section id="challenge" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="The Challenge"
          title="Rote memorization cannot survive real engineering."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <h3 className="text-base font-semibold text-card-foreground">{item.title}</h3>
              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
