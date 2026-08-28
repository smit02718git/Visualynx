'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Loader2, Mail } from 'lucide-react'
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setLoading(true)
    const { error } = await createClient().auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password/update`,
    })
    setMessage(error ? { type: 'error', text: error.message } : { type: 'success', text: 'Check your email for a password reset link.' })
    setLoading(false)
  }

  return <AuthLayout><h1 className="text-3xl font-semibold tracking-tight">Reset your password</h1><p className="mt-2 text-sm text-muted-foreground">Enter your email and we&apos;ll send you a reset link.</p><form onSubmit={submit} className="mt-8 space-y-5"><label className="block space-y-2 text-sm font-medium">Email<Input required type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} icon={<Mail />} /></label>{message && <p role="status" className={message.type === 'error' ? 'rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive' : 'rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-primary'}>{message.text}</p>}<Button type="submit" disabled={loading} className="h-11 w-full">{loading && <Loader2 className="size-4 animate-spin" />}{loading ? 'Sending link...' : 'Send reset link'}</Button></form><p className="mt-8 text-center text-sm text-muted-foreground"><Link href="/login" className="font-medium text-primary hover:underline">Back to sign in</Link></p></AuthLayout>
}
