/**
 * Static content for the marketing site.
 *
 * Every section component receives its data via props and falls back to these
 * defaults, so a backend/CMS can be wired in later by fetching in a Server
 * Component and passing the payload down — no component edits required.
 */

export type NavLink = { label: string; href: string }

export type Challenge = { title: string; body: string }

export type PipelineStep = { step: string; title: string; body: string }

export type Subject = {
  name: string
  icon: 'physics' | 'chemistry' | 'mathematics'
  body: string
  modules: string[]
}

export type FooterColumn = { heading: string; links: NavLink[] }

export const navLinks: NavLink[] = [
  { label: 'How it Works', href: '#pipeline' },
  { label: 'Subjects', href: '#subjects' },
  { label: 'Features', href: '#workspace' },
]

export const challenges: Challenge[] = [
  {
    title: 'Static limits',
    body: 'Flat textbook charts fail to explain dynamic systems. True spatial relationships cannot be captured on dead paper.',
  },
  {
    title: 'Rote fatigue',
    body: 'Memorizing formula lists replaces actual conceptual mastery. Once variables shift, the memorized solution fails entirely.',
  },
  {
    title: 'Isolation of systems',
    body: 'Physics, chemistry, and math are treated as disjointed files rather than interconnected, beautiful geometry.',
  },
]

export const pipelineSteps: PipelineStep[] = [
  {
    step: '01',
    title: 'Learn',
    body: 'Upload or read core theories. Visualynx isolates the crucial conceptual geometry automatically.',
  },
  {
    step: '02',
    title: 'Visualize',
    body: 'Interact with instant simulations. Manipulate constants in real-time, observing system dynamics.',
  },
  {
    step: '03',
    title: 'Avoid Mistakes',
    body: 'Our diagnostic radar flags historical misconceptions and common math translation traps before exams.',
  },
  {
    step: '04',
    title: 'Practice',
    body: 'Solidify skills with interactive quizzes featuring fully parameterized diagnostic feedback.',
  },
]

export const subjects: Subject[] = [
  {
    name: 'Physics',
    icon: 'physics',
    body: 'Trace velocity fields, gravity orbits, and Maxwell wave equations.',
    modules: ['Classical Mechanics', 'Harmonic Waves', "Maxwell's Electrodynamics"],
  },
  {
    name: 'Chemistry',
    icon: 'chemistry',
    body: 'Simulate organic reactions, molecular shapes, and transition state thresholds.',
    modules: ['Molecular Orbitals', 'Reaction Kinetics', 'Thermodynamics'],
  },
  {
    name: 'Mathematics',
    icon: 'mathematics',
    body: 'Observe dynamic tangents, vector subspaces, and integral volume bounds.',
    modules: ['Differential Calculus', '3D Linear Algebra', 'Fourier Analysis'],
  },
]

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Curriculum',
    links: [
      { label: 'Mechanics Sandbox', href: '#' },
      { label: 'Wave Oscillators', href: '#' },
      { label: 'Bond Geometries', href: '#' },
      { label: 'Calculus Tangents', href: '#' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'Interactive Workspace', href: '#workspace' },
      { label: 'Mistake Diagnostics', href: '#diagnostics' },
      { label: 'Pricing Plans', href: '#' },
      { label: 'Educator Accounts', href: '#' },
    ],
  },
  {
    heading: 'Compliance',
    links: [
      { label: 'Academic Integrity', href: '#' },
      { label: 'Research Studies', href: '#' },
      { label: 'Privacy Code', href: '#' },
      { label: 'Terms of Use', href: '#' },
    ],
  },
]
