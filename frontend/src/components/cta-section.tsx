export function CtaSection({
  title = 'Start seeing science differently',
  body = 'Ditch rote memorization. Elevate conceptual mastery in Physics, Chemistry, and Math using AI-powered interactive models.',
  ctaLabel = 'Start Learning Free',
  ctaHref = '#top',
  note = 'No credit card required. Free onboarding workspace access included.',
}: {
  title?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
  note?: string
}) {
  return (
    <section className="border-b border-deep-border bg-deep text-deep-foreground">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-20 text-center lg:py-28">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mt-5 max-w-lg text-pretty text-[13px] leading-relaxed text-deep-muted">
          {body}
        </p>
        <a
          href={ctaHref}
          className="mt-8 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {ctaLabel}
        </a>
        <p className="mt-5 text-[10px] text-deep-muted">{note}</p>
      </div>
    </section>
  )
}
