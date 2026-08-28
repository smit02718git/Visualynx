'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, Loader2, User } from 'lucide-react'
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setLoading(true)
    const { data, error } = await createClient().auth.signUp({ email: email.trim(), password, options: { data: { full_name: name.trim() }, emailRedirectTo: `${window.location.origin}/auth/callback` } })
    if (error) setMessage({ type: 'error', text: error.message })
    else if (data.session) window.location.replace(new URL('/dashboard', window.location.origin).toString())
    else setMessage({ type: 'success', text: 'Check your email for a confirmation link, then sign in.' })
    setLoading(false)
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">Start learning STEM visually in less than a minute.</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <label className="block space-y-2 text-sm font-medium">Full name<Input required autoComplete="name" placeholder="Ada Lovelace" value={name} onChange={e => setName(e.target.value)} icon={<User />} /></label>
        <label className="block space-y-2 text-sm font-medium">Email<Input required type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} icon={<Mail />} /></label>
        <label className="block space-y-2 text-sm font-medium">Password
          <div className="relative"><Input required minLength={6} type={visible ? 'text' : 'password'} autoComplete="new-password" placeholder="At least 6 characters" value={password} onChange={e => setPassword(e.target.value)} icon={<Lock />} /><button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(value => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div>
        </label>
        {message && <p role="status" className={message.type === 'error' ? 'rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive' : 'rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-primary'}>{message.text}</p>}
        <Button type="submit" disabled={loading} className="h-11 w-full">{loading && <Loader2 className="size-4 animate-spin" />}{loading ? 'Creating account...' : 'Create account'}</Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link></p>
    </AuthLayout>
  )
}
