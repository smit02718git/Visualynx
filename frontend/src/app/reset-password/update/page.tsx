'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Lock, Loader2 } from 'lucide-react'
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    if (password !== confirmation) {
      setMessage({ type: 'error', text: 'Passwords do not match.' })
      return
    }
    setLoading(true)
    const { error } = await createClient().auth.updateUser({ password })
    if (error) setMessage({ type: 'error', text: error.message })
    else setMessage({ type: 'success', text: 'Your password has been updated.' })
    setLoading(false)
  }

  return <AuthLayout><h1 className="text-3xl font-semibold tracking-tight">Choose a new password</h1><p className="mt-2 text-sm text-muted-foreground">Use at least 6 characters for your new password.</p><form onSubmit={submit} className="mt-8 space-y-5"><label className="block space-y-2 text-sm font-medium">New password<Input required minLength={6} type="password" autoComplete="new-password" placeholder="At least 6 characters" value={password} onChange={e => setPassword(e.target.value)} icon={<Lock />} /></label><label className="block space-y-2 text-sm font-medium">Confirm password<Input required minLength={6} type="password" autoComplete="new-password" placeholder="Repeat your password" value={confirmation} onChange={e => setConfirmation(e.target.value)} icon={<Lock />} /></label>{message && <p role="status" className={message.type === 'error' ? 'rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive' : 'rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-primary'}>{message.text}</p>}<Button type="submit" disabled={loading} className="h-11 w-full">{loading && <Loader2 className="size-4 animate-spin" />}{loading ? 'Updating password...' : 'Update password'}</Button></form><p className="mt-8 text-center text-sm text-muted-foreground"><Link href="/login" className="font-medium text-primary hover:underline">Back to sign in</Link></p></AuthLayout>
}
