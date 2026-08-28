'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react'
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await createClient().auth.signInWithPassword({ email: email.trim(), password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    window.location.replace(new URL('/dashboard', window.location.origin).toString())
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to continue to Visualynx.</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <label className="block space-y-2 text-sm font-medium">Email<Input required type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} icon={<Mail />} /></label>
        <div className="flex items-center justify-between text-sm font-medium">
          <label htmlFor="password">Password</label>
          <Link href="/reset-password" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
        </div>
        <div className="-mt-5">
          <div className="relative"><Input id="password" required type={visible ? 'text' : 'password'} autoComplete="current-password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} icon={<Lock />} /><button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(value => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div>
        </div>
        {error && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={loading} className="h-11 w-full">{loading && <Loader2 className="size-4 animate-spin" />}{loading ? 'Signing in...' : 'Sign in'}</Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">New to Visualynx? <Link href="/signup" className="font-medium text-primary hover:underline">Create an account</Link></p>
    </AuthLayout>
  )
}
