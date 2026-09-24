import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing Supabase environment variables.' }, { status: 500 })
  }

  const response = new NextResponse(null, {
    status: 303,
    headers: { Location: '/login' },
  })
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  const { error } = await supabase.auth.signOut({ scope: 'local' })

  if (error) {
    return NextResponse.json({ error: 'Unable to sign out.' }, { status: 500 })
  }

  return response
}