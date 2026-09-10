export type SubjectFeatureIcon = 'eye' | 'book-open' | 'triangle-alert' | 'pencil-line'

export type SubjectFeature = {
    icon: SubjectFeatureIcon
    title: string
    description: string
    tone: string
}

export const defaultFeatureTiles = [
    {
        icon: 'eye',
        title: 'Visualize',
        description: 'Interactive simulations',
        tone: 'bg-[#eaf3ff]',
    },
    {
        icon: 'book-open',
        title: 'Understand',
        description: 'AI explanations',
        tone: 'bg-[#eaf3ff]',
    },
    {
        icon: 'triangle-alert',
        title: 'Avoid Mistakes',
        description: 'Common misconceptions',
        tone: 'bg-[#eaf3ff]',
    },
    {
        icon: 'pencil-line',
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
