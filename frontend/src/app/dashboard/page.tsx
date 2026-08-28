import { redirect } from 'next/navigation'
import { LogOut, BookOpen, FlaskConical, Sigma } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  async function signOut() {
    'use server'
    const client = await createClient()
    await client.auth.signOut()
    redirect('/')
  }

  const name = (user.user_metadata?.full_name as string) || user.email?.split('@')[0] || 'Learner'
  const subjects = [
    { name: 'Physics', description: 'Mechanics, waves, and motion', icon: FlaskConical },
    { name: 'Chemistry', description: 'Reactions, bonds, and matter', icon: FlaskConical },
    { name: 'Mathematics', description: 'Algebra, calculus, and geometry', icon: Sigma },
  ]

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border bg-card"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8"><BrandMark /><form action={signOut}><Button type="submit" variant="outline" size="sm"><LogOut /> Sign out</Button></form></div></header>
      <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8"><section className="rounded-2xl bg-deep p-7 text-deep-foreground sm:p-10"><p className="font-mono text-xs uppercase tracking-[0.2em] text-deep-muted">Your workspace</p><h1 className="mt-3 text-3xl font-semibold">Welcome, {name}.</h1><p className="mt-3 max-w-lg text-sm leading-6 text-deep-muted">Choose a subject and turn abstract ideas into something you can see.</p></section><section className="mt-10"><h2 className="text-xl font-semibold">Start exploring</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{subjects.map(({ name: subject, description, icon: Icon }) => <button key={subject} className="rounded-xl border border-border bg-card p-5 text-left transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"><Icon className="size-5 text-primary" /><h3 className="mt-5 font-semibold">{subject}</h3><p className="mt-1 text-sm text-muted-foreground">{description}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-primary"><BookOpen className="size-3.5" /> Begin a lesson</span></button>)}</div></section></div>
    </main>
  )
}
