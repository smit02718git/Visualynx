'use client'

import type { ReactNode } from 'react'
import {
    BookOpen,
    Calculator,
    CircleAlert,
    CirclePlay,
    MessageCircleDashed,
} from 'lucide-react'
import { useState } from 'react'

type WorkspaceSection = 'learn' | 'formulas' | 'mistakes' | 'ask-ai' | 'quiz'

type WorkspaceSectionNavProps = {
    learnContent: ReactNode
    formulasContent: ReactNode
    mistakesContent: ReactNode
}

const sections: Array<{
    id: WorkspaceSection
    label: string
    icon: typeof BookOpen
}> = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'formulas', label: 'Formulas', icon: Calculator },
    { id: 'mistakes', label: 'Mistakes', icon: CircleAlert },
    { id: 'ask-ai', label: 'Ask AI', icon: MessageCircleDashed },
]

const placeholderContent: Record<Exclude<WorkspaceSection, 'learn' | 'quiz'>, string> = {
    formulas: 'This is the formulas section.',
    mistakes: 'This is the mistakes section.',
    'ask-ai': 'This is the Ask AI section.',
}

export default function WorkspaceSectionNav({ learnContent, formulasContent, mistakesContent }: WorkspaceSectionNavProps) {
    const [activeSection, setActiveSection] = useState<WorkspaceSection>('learn')

    return (
        <section className="flex min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:justify-end">
            <div className="min-w-0 flex-1 rounded-2xl border border-[#e1e7ef] bg-white p-3 shadow-[0_12px_28px_rgba(135,155,185,0.12)]">
                {activeSection === 'learn' ? learnContent : activeSection === 'formulas' ? formulasContent : activeSection === 'mistakes' ? mistakesContent : activeSection === 'quiz' ?(
                    <div className="flex min-h-64 items-center justify-center text-center text-sm text-[#5d6982]">
                        This is the quiz section.
                    </div>
                ) : (
                    <div className="flex min-h-64 items-center justify-center text-center text-sm text-[#5d6982]">
                        {placeholderContent[activeSection]}
                    </div>
                )}
            </div>
            <nav
                aria-label="Learning sections"
                className="flex h-fit shrink-0 flex-row items-center justify-center gap-1 rounded-[24px] border border-[#e1e7ef] bg-white p-3 shadow-[0_12px_28px_rgba(135,155,185,0.16)] lg:w-24 lg:flex-col lg:justify-start lg:gap-2 lg:self-start"
            >
                {sections.map(({ id, label, icon: Icon }) => (
                    <div key={id} className="contents">
                        <button
                            type="button"
                            aria-current={activeSection === id ? 'page' : undefined}
                            onClick={() => setActiveSection(id)}
                            className={`flex min-h-16 min-w-16 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[0.68rem] font-medium transition lg:w-full ${
                                activeSection === id
                                    ? 'bg-[#eaf1ff] text-[#2563eb]'
                                    : 'text-[#44516a] hover:bg-[#f5f7fa]'
                            }`}
                        >
                            <Icon className="h-5 w-5" strokeWidth={activeSection === id ? 2.4 : 2} />
                            <span>{label}</span>
                        </button>
                    </div>
                ))}

                <div className="hidden h-px w-12 bg-[#e4e8ef] lg:block" />
                <button
                    type="button"
                    aria-current={activeSection === 'quiz' ? 'page' : undefined}
                    onClick={() => setActiveSection('quiz')}
                    className={`mt-1 flex min-h-16 min-w-16 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[0.68rem] font-medium transition lg:w-full ${
                        activeSection === 'quiz'
                            ? 'bg-[#2563eb] text-white'
                            : 'bg-[#f4f7fb] text-[#44516a] hover:bg-[#eaf1ff]'
                    }`}
                >
                    <CirclePlay className="h-5 w-5" strokeWidth={2.2} />
                    <span>Take Quiz</span>
                </button>
            </nav>
        </section>
    )
}
