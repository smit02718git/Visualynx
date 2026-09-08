import { redirect } from 'next/navigation'
import { SubjectWorkspacePage, getSubjectPageConfig } from '@/components/subject-workspace-page'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const config = getSubjectPageConfig('chemistry')

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
