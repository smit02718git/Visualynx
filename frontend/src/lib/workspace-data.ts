import { unstable_cache } from 'next/cache'
import type { ConceptExplanationData } from '@/types/explaination'
import type { ConceptFormulasData } from '@/types/formulas'
import type { ConceptMistakesData } from '@/types/mistakes'
import type { VisualizationConfig } from '@/types/visualization'

type WorkspaceData = {
  visualization: VisualizationConfig
  explaination: ConceptExplanationData
  formulas: ConceptFormulasData
  mistakes: ConceptMistakesData
}

async function fetchWorkspaceData(subject: string, concept: string): Promise<WorkspaceData> {
  const request = (endpoint: string) => fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, topic: concept }),
    cache: 'no-store',
  }).then(async (response) => {
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint} data`)
    return response.json()
  })

  const [visualization, explaination, formulas, mistakes] = await Promise.all([
    request('visualization'),
    request('learn'),
    request('formulas'),
    request('mistakes'),
  ])

  return { visualization, explaination, formulas, mistakes } as WorkspaceData
}

export function getWorkspaceData(subject: string, concept: string) {
  return unstable_cache(
    () => fetchWorkspaceData(subject, concept),
    ['workspace-data', subject, concept],
    { revalidate: 3600 },
  )()
}
