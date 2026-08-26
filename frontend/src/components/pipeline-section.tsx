import { SectionHeading } from '@/components/section-heading'
import { pipelineSteps as defaultSteps, type PipelineStep } from '@/lib/content'

export function PipelineSection({ steps = defaultSteps }: { steps?: PipelineStep[] }) {
  return (
    <section id="pipeline" className="bg-deep text-deep-foreground">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="The Pipeline"
          title="How Visualynx transforms comprehension"
          tone="deep"
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.step}
              className="rounded-lg border border-deep-border bg-deep-card p-5 transition-colors hover:border-primary/50"
            >
              <span className="font-mono text-lg font-semibold text-primary">{step.step}</span>
              <h3 className="mt-3 text-sm font-semibold text-deep-foreground">{step.title}</h3>
              <p className="mt-3 text-[12px] leading-relaxed text-deep-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
