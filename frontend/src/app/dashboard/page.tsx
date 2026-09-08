import { BrandMark } from '@/components/brand-mark'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const subjects = [
  {
    id: 'physics',
    label: 'PHYSICS',
    url: '/workspace/physics',
    description: 'Explore motion, forces, energy, waves, electricity and more.',
    accent: 'from-[#dfeeff] to-[#cfe5f5]',
    text: 'text-[#2a5a8d]',
    button: 'text-[#2a5a8d]',
    visual: 'physics',
  },
  {
    id: 'chemistry',
    label: 'CHEMISTRY',
    url: '/workspace/chemistry',
    description: 'Visualize atoms, molecules, reactions, bonding and chemical behavior.',
    accent: 'from-[#f6e6d7] to-[#f1d8c0]',
    text: 'text-[#b7793d]',
    button: 'text-[#b7793d]',
    visual: 'chemistry',
  },
  {
    id: 'math',
    label: 'MATHEMATICS',
    url: '/workspace/maths',
    description: 'Explore geometry, algebra, calculus and mathematical relationships.',
    accent: 'from-[#daeede] to-[#cfe7d0]',
    text: 'text-[#3a7b62]',
    button: 'text-[#3a7b62]',
    visual: 'math',
  },
] as const

function SubjectVisual({ type }: { type: 'physics' | 'chemistry' | 'math' }) {
  if (type === 'physics') {
    return (
      <svg viewBox="0 0 420 220" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="physicsBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#e8f5ff" />
            <stop offset="100%" stopColor="#cfe9f9" />
          </linearGradient>
          <radialGradient id="ballGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f8fbff" />
            <stop offset="55%" stopColor="#dfeffc" />
            <stop offset="100%" stopColor="#a7c9e8" />
          </radialGradient>
        </defs>
        <rect width="420" height="220" fill="url(#physicsBg)" rx="26" />
        <g opacity="0.45" stroke="#d5e9f7">
          <path d="M0 30 H420" />
          <path d="M0 60 H420" />
          <path d="M0 90 H420" />
          <path d="M0 120 H420" />
          <path d="M0 150 H420" />
          <path d="M0 180 H420" />
          <path d="M0 210 H420" />
        </g>
        <g opacity="0.4" stroke="#c9d9ee" fill="none">
          <path d="M40 180 Q110 150 190 180 T340 180" />
          <path d="M60 120 Q120 80 180 120 T300 120" />
        </g>
        <g transform="translate(210 140)">
          <circle r="54" fill="url(#ballGlow)" stroke="#cfe2f3" strokeWidth="2" />
          <path d="M-20 42 Q0 70 24 42" fill="none" stroke="#bedcf0" strokeWidth="2" />
        </g>
        <g opacity="0.38" stroke="#9ec3ea" strokeWidth="2" fill="none">
          <path d="M115 100 C180 60, 240 60, 300 100" />
          <path d="M110 140 C186 110, 236 110, 300 145" />
        </g>
      </svg>
    )
  }

  if (type === 'chemistry') {
    return (
      <svg viewBox="0 0 420 220" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="chemBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f7e7d8" />
            <stop offset="100%" stopColor="#f0d3b5" />
          </linearGradient>
        </defs>
        <rect width="420" height="220" fill="url(#chemBg)" rx="26" />
        <g transform="translate(210 110)">
          <circle r="52" fill="none" stroke="#d4a85c" strokeWidth="1.5" opacity="0.8" />
          <circle r="66" fill="none" stroke="#d4a85c" strokeWidth="1.5" opacity="0.7" />
          <circle r="82" fill="none" stroke="#d4a85c" strokeWidth="1.5" opacity="0.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x = Math.cos(rad) * 90
            const y = Math.sin(rad) * 90
            return (
              <g key={angle}>
                <circle cx={x} cy={y} r="7" fill="#d8a87b" />
                <circle cx={-x} cy={-y} r="7" fill="#d8a87b" opacity="0.88" />
              </g>
            )
          })}
          <circle r="10" fill="#f8f0ea" stroke="#b77c44" strokeWidth="2" />
        </g>
        <g opacity="0.24" stroke="#c69267" strokeWidth="1.5" fill="none">
          <path d="M50 20 L160 80" />
          <path d="M260 80 L370 20" />
          <path d="M60 190 L150 140" />
          <path d="M270 140 L360 190" />
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 420 220" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="mathBg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#e2f1e5" />
          <stop offset="100%" stopColor="#bedcbe" />
        </linearGradient>
      </defs>
      <rect width="420" height="220" fill="url(#mathBg)" rx="26" />
      <g opacity="0.25" stroke="#98b89f" strokeWidth="1.2">
        {Array.from({ length: 12 }).map((_, index) => (
          <path key={`h-${index}`} d={`M30 ${30 + index * 15} H390`} />
        ))}
        {Array.from({ length: 13 }).map((_, index) => (
          <path key={`v-${index}`} d={`M${30 + index * 28} 20 V200`} />
        ))}
      </g>
      <path d="M20 160 L90 150 L120 130 L170 120 L210 90 L260 105 L330 60 L390 30" fill="none" stroke="#65c57e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 160 L90 150 L120 130 L170 120 L210 90 L260 105 L330 60 L390 30 L390 210 L20 210 Z" fill="#7ed59c" opacity="0.14" />
      <g opacity="0.35" stroke="#6fbf85" strokeWidth="1.3">
        <path d="M20 180 H390" />
        <path d="M20 150 H390" />
        <path d="M20 120 H390" />
      </g>
    </svg>
  )
}

export default async function DashboardPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    redirect('/login')
  }

  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const emailAddress = user.email || 'No email available'

  return (
    <div className="[zoom:0.8]">
      <div className="min-h-screen bg-[#f3f4f6] text-[#1d2433]">
        <header className="border-b border-[#dfe4ec] bg-[#f3f4f6]/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
            <div className="flex items-center gap-3">
              <BrandMark className="scale-130 origin-left" />
            </div>

            <nav className="hidden items-center gap-2 rounded-xl border border-[#dfe4ec] bg-white/50 px-3 py-2 md:flex">
              {['Physics', 'Chemistry', 'Maths', 'Quiz'].map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={'rounded-lg px-4 py-2 text-sm text-[#394760] transition hover:bg-[#eef3fb]'}>
                  {item}
                </button>
              ))}
            </nav>

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
        </header>

        <main className="mx-auto max-w-300 px-6 pb-10 pt-8">
          <section className="flex flex-col items-center pt-3 text-center">
            <h1 className="bg-linear-to-tr from-[#2563eb] via-[#cbd5e1] to-[#6366f1] bg-clip-text text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-transparent">
              What do you want to understand?
            </h1>
            <p className="mt-4 text-md text-[#576272]">
              Choose a subject and explore any concept with Visualynx.
            </p>
          </section>

          <section className="mt-10 grid gap-7 md:grid-cols-3">
            {subjects.map((subject) => (
              /* 1. Explicitly defined dimensions and relative positioning */
                <div key={subject.id} className="group relative h-full min-h-112.5 w-full isolation-auto">
                  <Link href={subject.url}>

                  {/* 2. Will-change and transform-gpu prevent layout recalculation during scale */}
                  <article
                    className={`absolute inset-0 overflow-hidden rounded-[28px] border border-[#dfe7f2] bg-linear-to-br ${subject.accent} p-0 shadow-lg transition-all duration-300 ease-out transform-gpu will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:shadow-2xl backface-hidden`}
                  >
                    <div className="h-51.25 w-full border-b border-[#d9e2ec] bg-white/10 p-0">
                      <SubjectVisual type={subject.visual} />
                    </div>

                    <div className="px-6 pb-6 pt-5">
                      <h2 className={`mt-4 text-[2rem] font-semibold tracking-tighter ${subject.text}`}>
                        {subject.label}
                      </h2>
                      <p className="mt-4 text-[1.04rem] leading-7 text-[#53637a]">
                        {subject.description}
                      </p>
                      <button
                        type="button"
                        className={`mt-5 inline-flex items-center gap-2 text-[1.04rem] font-semibold ${subject.button}`}
                      >
                        Explore{' '}
                        {subject.label
                          .replace('MATHEMATICS', 'Mathematics')
                          .replace('CHEMISTRY', 'Chemistry')
                          .replace('PHYSICS', 'Physics')}
                        <span aria-hidden="true"></span>
                      </button>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </section>

          <section className="mt-12 flex items-center justify-between gap-6 rounded-[28px] border border-[#dbe2ea] bg-[#e9edf2] px-8 py-5 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
            <div>
              <h3 className="text-3xl font-semibold tracking-[-0.065em] text-[#232e42]">
                Test your understanding
              </h3>
              <p className="mt-2 text-[1.05rem] text-[#5d6982]">
                Practice STEM questions and discover where you need another look.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-[#2f6de0] to-[#2d4ce0] px-6 py-4 text-[1.08rem] font-semibold text-white shadow-lg transition duration-300 hover:brightness-80"
            >
              Start a Quick Quiz <span className="ml-2 text-lg">→</span>
            </button>
          </section>
        </main>
      </div>
    </div>
  )
}
