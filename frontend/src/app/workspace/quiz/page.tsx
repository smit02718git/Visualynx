import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import QuizExperience from '@/components/quiz-experience'

interface PageProps {
  searchParams: Promise<{
    subject?: string
    concept?: string
    returnTo?: string
  }>
}

export default async function QuizPage({ searchParams }: PageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) redirect('/login')

  const safeReturnTo = params.returnTo?.startsWith('/workspace/') ? params.returnTo : '/dashboard'

  return (
    <QuizExperience
      subject={params.subject || ''}
      concept={params.concept || ''}
      returnTo={safeReturnTo}
    />
  )
}
