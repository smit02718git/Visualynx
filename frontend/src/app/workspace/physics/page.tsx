import { redirect } from 'next/navigation'
import { SubjectWorkspacePage } from '@/components/subject-workspace-page'
import { getSubjectPageConfig } from '@/components/subject-workspace-config'
import { createClient } from '@/lib/supabase/server'
import VizSandbox from "@/components/simulation-renderer";
import type { VisualizationConfig } from "@/types/visualization";
import { BrandMark } from '@/components/brand-mark'
import Link from 'next/link'
import ConceptCard from "@/components/learn-section";
import WorkspaceSectionNav from "@/components/workspace-section-nav";
import type { ConceptExplanationData } from "@/types/explaination";

interface PageProps {
  searchParams: Promise<{ concept?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const concept = resolvedParams.concept;

  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  // Check if a specific concept query parameter is passed
  if (concept) {

    async function getVisualizationData() {
      // Call the specific FastAPI visualization endpoint
      const res = await fetch('http://127.0.0.1:8000/api/visualization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: "physics",
          topic: concept
        }),
        cache: 'no-store', // Ensures fresh data calculation on every render
      });

      if (!res.ok) {
        throw new Error('Failed to fetch visualization payload');
      }

      return res.json();
    }

    async function getExplainationData() {
      // Call the specific FastAPI visualization endpoint
      const res = await fetch('http://127.0.0.1:8000/api/learn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: "physics",
          topic: concept
        }),
        cache: 'no-store', // Ensures fresh data calculation on every render
      });

      if (!res.ok) {
        throw new Error('Failed to fetch visualization payload');
      }

      return res.json();
    }

    const visualization: VisualizationConfig = await getVisualizationData();
    const explaination: ConceptExplanationData = await getExplainationData();
    const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
    const emailAddress = user.email || 'No email available'

    return (
      <main className="zoom-[0.8]">
        <header className="border-b border-[#dfe4ec] bg-[#f3f4f6]/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
            <div className="flex items-center gap-3">
              <BrandMark className="scale-130 origin-left" />
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-lg font-bold text-[#1d2433]">{visualization.concept_name}</p>
              <p className="text-sm text-[#5d6982]">physics</p>
            </div>

            <div className="flex gap-4 items-center">
              <Link href="/workspace/physics">
                <button className="rounded-xl border border-[#dfe4ec] bg-[#f8fafc] px-3 py-2 text-sm font-medium text-[#1d2433] transition hover:bg-[#eef3fb]">change concept</button>
              </Link>
              <details className="relative">
                <summary className="list-none cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d5dce8] bg-linear-to-br from-[#f4e9d7] to-[#dfeafc] text-sm font-semibold text-[#3d4a5f] shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                </summary>

                <div className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl border border-[#dfe4ec] bg-white p-4 shadow-xl shadow-slate-200/70">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#f4e9d7] to-[#dfeafc] text-sm font-semibold text-[#3d4a5f]">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1d2433]">{displayName}</p>
                      <p className="truncate text-xs text-[#5d6982]">{emailAddress}</p>
                    </div>
                  </div>

                  <form
                    action={async () => {
                      'use server'
                      const supabase = await createClient()
                      await supabase.auth.signOut()
                      redirect('/login')
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full rounded-xl border border-[#dfe4ec] bg-[#f8fafc] px-3 py-2 text-sm font-medium text-[#1d2433] transition hover:bg-[#eef3fb]"
                    >
                      Logout
                    </button>
                  </form>
                </div>
              </details>
            </div>
          </div>
        </header>
        <main className="flex min-h-screen justify-left bg-slate-50 p-6 gap-7">
          <VizSandbox config={visualization} />
          <WorkspaceSectionNav learnContent={<ConceptCard data={explaination} />} />
        </main>
      </main>
    );
  }

  // Default behavior when no concept query parameter is present
  const config = getSubjectPageConfig('physics')

  return (
    <SubjectWorkspacePage
      {...config}
      user={{
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email || 'No email available',
      }}
    />
  )
}