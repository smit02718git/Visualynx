import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { ChallengeSection } from '@/components/challenge-section'
import { PipelineSection } from '@/components/pipeline-section'
import { WorkspaceSection } from '@/components/workspace-section'
import { DiagnosticsSection } from '@/components/diagnostics-section'
import { SubjectsSection } from '@/components/subjects-section'
import { CtaSection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ChallengeSection />
        <PipelineSection />
        <WorkspaceSection />
        <DiagnosticsSection />
        <SubjectsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
