import type { LucideIcon } from 'lucide-react'
import { ArrowLeft, BookOpen, Eye, PencilLine, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { BrandMark } from '@/components/brand-mark'

export type SubjectFeature = {
    icon: LucideIcon
    title: string
    description: string
    tone: string
}

export type SubjectWorkspacePageProps = {
    label: string
    title: string
    workspaceName: string
    accent: string
    accentStrong: string
    accentSoft: string
    ringColor: string
    badgeText: string
    promptPlaceholder: string
    chips: readonly string[]
    features: readonly SubjectFeature[]
    user?: {
        name: string
        email: string
    }
}

export function SubjectWorkspacePage({
    label,
    title,
    workspaceName,
    accent,
    accentStrong,
    accentSoft,
    ringColor,
    badgeText,
    promptPlaceholder,
    chips,
    features,
    user,
}: SubjectWorkspacePageProps) {
    const displayName = user?.name || 'User'
    const emailAddress = user?.email || 'No email available'

    return (
        <div className="zoom-[0.9] bg-[#f3f4f6] text-[#101b2f]">
            <header className="w-full border-b border-[#dfe7f2] bg-[#f4f6f9]/95 backdrop-blur-sm py-4 flex justify-center">
                {/* FIXED: Explicitly grid-cols-3 forces three strict horizontal blocks */}
                <div className='w-[85%] grid grid-cols-3 items-center'>
                    
                    {/* 1. LEFT COLUMN: Back button and Brandmark */}
                    <div className="flex items-center gap-4 justify-self-start">
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-900 hover:underline shrink-0">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="whitespace-nowrap">Back to Dashboard</span>
                        </Link>
                        <div className="h-5 w-px bg-black/20 shrink-0"></div>                     
                        <div className="shrink-0">
                            <BrandMark className="text-[1.1rem] font-semibold tracking-[-0.04em] text-[#1d2d4d]" />
                        </div>
                    </div>

                    {/* 2. CENTER COLUMN: Workspace Name */}
                    {/* FIXED: justify-self-center locks this dead-center of the screen */}
                    <div className="text-md font-semibold text-[#2e405f] justify-self-center text-center whitespace-nowrap">
                        {workspaceName}
                    </div>

                    {/* 3. RIGHT COLUMN: User Menu Dropdown */}
                    {/* FIXED: justify-self-end locks this to the far right edge */}
                    <div className="justify-self-end w-41 justify-center">
                        {user ? (
                            <details className="relative">
                                <summary className="list-none cursor-pointer block">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5dce8] bg-linear-to-br from-[#f4e9d7] to-[#dfeafc] text-sm font-semibold text-[#3d4a5f] shadow-md transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
                                        {displayName.charAt(0).toUpperCase()}
                                    </div>
                                </summary>

                                <div className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl border border-[#dfe4ec] bg-white p-4 shadow-xl shadow-slate-200/70 z-50">
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
                        ) : null}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-295 px-4 pb-10 pt-10 sm:px-6 lg:pb-16 lg:pt-14">
                <div className="mx-auto max-w-235">
                    <div className="text-center">
                        <span className={`inline-flex items-center rounded-full border border-transparent px-3 py-1 text-[0.72rem] font-semibold tracking-[0.24em] text-[#4c7ec2] ${accentSoft}`}>
                            {label}
                        </span>
                    </div>

                    <h1
                        className={
                            `mt-6 bg-linear-to-r ${accent} bg-clip-text text-center text-6xl font-black leading-[0.92] tracking-[-0.07em] text-transparent`
                        }
                    >
                        {title}
                    </h1>

                    <p className="mx-auto mt-4 max-w-190 text-center text-sm leading-7 text-[#5c6d86]">
                        Enter any {label.toLowerCase()} concept and Visualynx will build an interactive learning experience with explanations, visualizations, formulas, common mistakes and practice.
                    </p>

                    <div className={`mt-8 overflow-hidden rounded-[26px] border border-[#dfe7f2] bg-white/80 shadow-[0_12px_28px_rgba(135,155,185,0.12)] backdrop-blur-sm scale-90 focus:outline-none focus-within:ring-2 ${ringColor} transition`}>
                        <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
                            <input
                                aria-label="Search concept"
                                type="text"
                                defaultValue=""
                                placeholder={promptPlaceholder}
                                className={`w-full rounded-[16px] border border-transparent bg-transparent px-4 py-2 text-xl placeholder:text-[0.95rem] text-[#2a3248] placeholder:text-[#8a96ad] focus:outline-none focus:ring-0 ${ringColor}`}
                            />

                            <button
                                type="button"
                                className={`inline-flex items-center justify-center rounded-[16px] px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_22px_rgba(51,95,208,0.28)] transition hover:brightness-90 sm:min-w-60 ${accentStrong}`}
                            >
                                {badgeText}
                            </button>
                        </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        {chips.map((chip) => (
                            <button
                                key={chip}
                                type="button"
                                className="rounded-full border border-[#dfe7f2] bg-white/80 px-3 py-1 text-sm text-[#364a67] shadow-[0_4px_10px_rgba(156,171,196,0.08)] transition hover:border-[#cfe0fb] hover:bg-[#f7faff]"
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mx-auto mt-18 grid max-w-245 gap-4 pt-16 sm:grid-cols-2 xl:grid-cols-4">
                    {features.map(({ icon: Icon, title, description, tone }) => (
                        <div
                            key={title}
                            className="flex items-center gap-3 rounded-[18px] border border-[#dfe7f2] bg-[#f7f9fc] px-4 py-4 shadow-[0_8px_18px_rgba(147,163,190,0.08)] scale-90 transition duration-200 hover:scale-95"
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}>
                                <Icon className="h-5 w-5 text-[#2b6ad9]" />
                            </div>

                            <div className="min-w-0">
                                <div className="text-[0.76rem] font-semibold tracking-[0.18em] text-[#4a648f] uppercase">
                                    {title}
                                </div>
                                <div className="mt-1 text-base font-medium text-[#1b2439]">{description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>

    )
}

export const defaultFeatureTiles = [
    {
        icon: Eye,
        title: 'Visualize',
        description: 'Interactive simulations',
        tone: 'bg-[#eaf3ff]',
    },
    {
        icon: BookOpen,
        title: 'Understand',
        description: 'AI explanations',
        tone: 'bg-[#eaf3ff]',
    },
    {
        icon: TriangleAlert,
        title: 'Avoid Mistakes',
        description: 'Common misconceptions',
        tone: 'bg-[#eaf3ff]',
    },
    {
        icon: PencilLine,
        title: 'Practice',
        description: 'Interactive quizzes',
        tone: 'bg-[#eaf3ff]',
    },
] as const

export function getSubjectPageConfig(subject: 'physics' | 'chemistry' | 'maths') {
    const configs = {
        physics: {
            label: 'PHYSICS',
            title: 'What do you want to understand?',
            workspaceName: 'Physics Workspace',
            accent: 'from-[#6fa9ee] via-[#a9c9f3] to-[#d8efff]',
            accentStrong: 'bg-[#2f6fe0]',
            accentSoft: 'bg-[#eaf4ff]',
            ringColor: 'focus-within:ring-[#2f6fe0]',
            badgeText: 'Build Learning Experience →',
            promptPlaceholder: 'e.g. Projectile Motion, Newton\'s Laws, Circular Motion...',
            chips: ['Projectile Motion', 'Newton\'s Laws', 'Work & Energy', 'Waves', 'Circular Motion', 'Gravity'],
            features: defaultFeatureTiles,
        },
        chemistry: {
            label: 'CHEMISTRY',
            title: 'What do you want to understand?',
            workspaceName: 'Chemistry Workspace',
            accent: 'from-[#efb77c] via-[#f3d3ae] to-[#f9edd5]',
            accentStrong: 'bg-[#d8842d]',
            accentSoft: 'bg-[#fff3e7]',
            ringColor: 'focus-within:ring-[#d8842d]',
            badgeText: 'Build Learning Experience →',
            promptPlaceholder: 'e.g. Acids & Bases, Bonding, Stoichiometry...',
            chips: ['Acids & Bases', 'Bonding', 'Redox', 'Solutions', 'Equilibrium', 'Thermochemistry'],
            features: defaultFeatureTiles,
        },
        maths: {
            label: 'MATHEMATICS',
            title: 'What do you want to understand?',
            workspaceName: 'Maths Workspace',
            accent: 'from-[#7bc09a] via-[#bfe6c9] to-[#ddf3e3]',
            accentStrong: 'bg-[#3b9d74]',
            accentSoft: 'bg-[#ecfaf2]',
            ringColor: 'focus-within:ring-[#3b9d74]',
            badgeText: 'Build Learning Experience →',
            promptPlaceholder: 'e.g. Calculus, Trigonometry, Algebraic Functions...',
            chips: ['Calculus', 'Algebra', 'Geometry', 'Trigonometry', 'Probability', 'Functions'],
            features: defaultFeatureTiles,
        },
    } as const

    return configs[subject]
}
