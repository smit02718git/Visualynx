'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, Check, CircleX, Clock3, Flag, LoaderCircle, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'

type QuizQuestion = {
  question: string
  options: string[]
  answer: number
  explanation: string
}

type QuizExperienceProps = {
  subject: string
  concept: string
  returnTo: string
}

const fallbackQuestions = (subject: string, concept: string): QuizQuestion[] => [
  {
    question: `Which statement best describes ${concept || 'this concept'} in ${subject || 'this subject'}?`,
    options: ['It is a measurable relationship or idea', 'It only applies in a laboratory', 'It is unrelated to observations', 'It never changes with conditions'],
    answer: 0,
    explanation: `${concept || 'The concept'} is used to describe a meaningful relationship that can be understood and applied in ${subject || 'the subject'}.`,
  },
  {
    question: `What is the best first step when solving a problem about ${concept || 'this topic'}?`,
    options: ['Ignore the given information', 'Identify the known quantities and target', 'Guess the final answer', 'Change the units randomly'],
    answer: 1,
    explanation: 'Organizing the known information and identifying the target makes the governing relationship easier to choose.',
  },
  {
    question: `Why are units important when working with ${concept || 'this concept'}?`,
    options: ['They make every answer larger', 'They replace the need for reasoning', 'They show whether quantities are consistent', 'They only matter in chemistry'],
    answer: 2,
    explanation: 'Consistent units help catch invalid operations and confirm that the result represents the requested quantity.',
  },
  {
    question: `Which approach usually demonstrates real understanding of ${concept || 'the topic'}?`,
    options: ['Memorizing one answer', 'Explaining the reasoning and checking the result', 'Skipping diagrams or definitions', 'Using the longest equation available'],
    answer: 1,
    explanation: 'A clear explanation and a quick check show whether the idea has been applied correctly, not merely recalled.',
  },
  {
    question: `If a result for ${concept || 'this concept'} seems unreasonable, what should you do?`,
    options: ['Submit it immediately', 'Check assumptions, units, and arithmetic', 'Delete the work', 'Change the question'],
    answer: 1,
    explanation: 'Reviewing assumptions, units, and arithmetic is the fastest way to locate a surprising result.',
  },
]

function prettyLabel(value: string) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export default function QuizExperience({ subject: initialSubject, concept: initialConcept, returnTo }: QuizExperienceProps) {
  const router = useRouter()
  const [quizSubject, setQuizSubject] = useState(initialSubject || '')
  const [quizConcept, setQuizConcept] = useState(initialConcept || '')
  const [questionCount, setQuestionCount] = useState(10)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isStarted, setIsStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const currentQuestion = questions[currentIndex]
  const score = useMemo(
    () => questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0),
    [answers, questions],
  )

  const subject = quizSubject || 'physics'
  const concept = quizConcept.trim()

  async function startQuiz() {
    if (!quizSubject || !concept) return
    setIsLoading(true)
    setValidationError(null)
    try {
      if (!returnTo.startsWith('/workspace/')) {
        const validationResponse = await fetch('/api/validate-topic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject, topic: concept }),
        })
        const validation = await validationResponse.json() as { is_related?: boolean; message?: string; detail?: string }
        if (!validationResponse.ok) {
          throw new Error(validation.detail || validation.message || 'Topic validation failed')
        }
        if (!validation.is_related) {
          setValidationError(validation.message || `This concept is not related to ${subject}.`)
          return
        }
      }
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, topic: concept || 'core concepts', count: questionCount }),
      })
      if (!response.ok) throw new Error('Quiz generation failed')
      const data = await response.json() as { questions?: QuizQuestion[] }
      if (data.questions?.length) setQuestions(data.questions.slice(0, questionCount))
      else throw new Error('No questions returned')
    } catch {
      const fallback = fallbackQuestions(subject, concept)
      setQuestions(Array.from({ length: questionCount }, (_, index) => fallback[index % fallback.length]))
    } finally {
      setCurrentIndex(0)
      setAnswers({})
      setSelectedAnswer(null)
      setIsStarted(true)
      setIsFinished(false)
      setIsLoading(false)
    }
  }

  function chooseAnswer(answer: number) {
    if (!currentQuestion || selectedAnswer !== null) return
    setSelectedAnswer(answer)
    setAnswers((previous) => ({ ...previous, [currentIndex]: answer }))
  }

  function nextQuestion() {
    if (currentIndex === questions.length - 1) setIsFinished(true)
    else {
      setCurrentIndex((index) => index + 1)
      setSelectedAnswer(answers[currentIndex + 1] ?? null)
    }
  }

  if (!isStarted) {
    return (
      <main className="min-h-screen bg-[#f4f5f7] px-5 py-8 text-[#1d2433] sm:px-10">
        <div className="mx-auto max-w-4xl">
          <button type="button" onClick={() => router.push(returnTo)} className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#526078] hover:text-[#2563eb]"><ArrowLeft className="h-4 w-4" /> Back</button>
          <div className="rounded-[24px] border border-[#e1e4e9] bg-white p-8 shadow-[0_18px_45px_rgba(70,83,104,0.08)] sm:p-12">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8efff] text-[#2f64dc]"><Trophy className="h-7 w-7" /></div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#3b6fe5] uppercase">Practice quiz</p>
            <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#1d2433]">Test your understanding</h1>
            <p className="mt-3 max-w-2xl leading-7 text-[#647089]">Build a focused quiz for {concept ? <strong className="text-[#33415d]">{prettyLabel(concept)}</strong> : 'any concept'} in {prettyLabel(subject)}.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-[#34415b]">Subject
                <select value={quizSubject} onChange={(event) => setQuizSubject(event.target.value)} disabled={Boolean(initialSubject)} className="mt-2 h-12 w-full rounded-xl border border-[#dce3ef] bg-white px-4 font-normal text-[#34415b] outline-none focus:border-[#386ee8] focus:ring-2 focus:ring-[#dce8ff] disabled:cursor-not-allowed disabled:bg-[#f3f5f8] disabled:text-[#59667d]">
                  <option value="">Choose a subject</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="maths">Mathematics</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-[#34415b]">Concept
                <input value={quizConcept} onChange={(event) => setQuizConcept(event.target.value)} readOnly={Boolean(initialConcept)} placeholder="Enter concept name" className="mt-2 h-12 w-full rounded-xl border border-[#dce3ef] px-4 font-normal text-[#34415b] outline-none focus:border-[#386ee8] focus:ring-2 focus:ring-[#dce8ff] read-only:cursor-not-allowed read-only:bg-[#f3f5f8] read-only:text-[#59667d]" />
              </label>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <label className="block text-sm font-semibold text-[#34415b]">Number of questions<span className="mt-2 flex items-center gap-3"><input type="range" min="5" max="30" step="1" value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value))} className="w-full accent-[#386ee8]" /><output className="flex h-11 w-14 items-center justify-center rounded-xl border border-[#dce3ef] bg-[#f8faff] text-lg text-[#2d5ed3]">{questionCount}</output></span></label>
              <button type="button" onClick={startQuiz} disabled={isLoading || !quizSubject || !concept} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#386ee8] px-7 font-semibold text-white shadow-[0_10px_20px_rgba(56,110,232,0.25)] transition hover:bg-[#2c5ed0] disabled:opacity-60">{isLoading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Building quiz</> : 'Start quiz'} <span aria-hidden="true">→</span></button>
            </div>
            {validationError && <p className="mt-4 text-sm font-medium text-red-600" role="alert">{validationError}</p>}
          </div>
        </div>
      </main>
    )
  }

  if (isFinished) {
    return (
      <main className="min-h-screen bg-[#f4f5f7] px-5 py-8 text-[#1d2433] sm:px-10"><div className="mx-auto max-w-3xl rounded-[24px] border border-[#e1e4e9] bg-white p-8 text-center shadow-[0_18px_45px_rgba(70,83,104,0.08)] sm:p-14"><Trophy className="mx-auto h-12 w-12 text-[#e2a62a]" /><p className="mt-6 text-xs font-bold tracking-[0.18em] text-[#3b6fe5] uppercase">Quiz complete</p><h1 className="mt-3 text-4xl font-bold">{score} / {questions.length}</h1><p className="mt-3 text-[#647089]">You finished your {prettyLabel(subject)} quiz{concept ? ` on ${prettyLabel(concept)}` : ''}.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={() => setIsStarted(false)} className="rounded-xl border border-[#dce3ef] px-6 py-3 font-semibold text-[#34415b] hover:bg-[#f7f9fc]">Try again</button><button type="button" onClick={() => router.push(returnTo)} className="rounded-xl bg-[#386ee8] px-6 py-3 font-semibold text-white hover:bg-[#2c5ed0]">Return to {returnTo === '/dashboard' ? 'dashboard' : 'workspace'}</button></div></div></main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f5f7] px-5 py-6 text-[#1d2433] sm:px-10"><div className="mx-auto max-w-4xl"><header className="mb-8 flex items-center justify-between"><button type="button" onClick={() => router.push(returnTo)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#526078] hover:text-[#2563eb]"><ArrowLeft className="h-4 w-4" /> Quit quiz</button><div className="flex items-center gap-2 text-sm font-semibold text-[#647089]"><Clock3 className="h-4 w-4" /> {currentIndex + 1} of {questions.length}</div></header><div className="mb-3 h-2 overflow-hidden rounded-full bg-[#e2e4e8]"><div className="h-full rounded-full bg-[#386ee8] transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} /></div><p className="mb-8 text-right text-xs font-semibold text-[#647089]">{Math.round(((currentIndex + 1) / questions.length) * 100)}% complete</p><section className="rounded-[24px] border border-[#e1e4e9] bg-white p-7 shadow-[0_18px_45px_rgba(70,83,104,0.08)] sm:p-10"><p className="text-xs font-bold tracking-[0.16em] text-[#3b6fe5] uppercase">{prettyLabel(subject)}{concept ? ` / ${prettyLabel(concept)}` : ''}</p><h1 className="mt-5 text-2xl font-semibold leading-9 text-[#1d2433] sm:text-3xl">{currentQuestion.question}</h1><div className="mt-8 grid gap-3 sm:grid-cols-2">{currentQuestion.options.map((option, index) => { const isSelected = selectedAnswer === index; const isCorrect = currentQuestion.answer === index; const state = selectedAnswer === null ? 'border-[#e1e4e9] hover:border-[#8aaaf3] hover:bg-[#f7f9ff]' : isCorrect ? 'border-[#2b9b63] bg-[#eaf7ef] text-[#17653e]' : isSelected ? 'border-[#df493c] bg-[#fff0ee] text-[#a32f27]' : 'border-[#eceef1] bg-[#fafafa] text-[#9aa1ae]'; return <button key={option} type="button" onClick={() => chooseAnswer(index)} className={`flex min-h-16 items-center gap-4 rounded-xl border px-4 text-left text-sm font-medium transition ${state}`}><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f1f2f4] text-xs font-bold text-[#657089]">{String.fromCharCode(65 + index)}</span><span>{option}</span>{selectedAnswer !== null && isCorrect && <Check className="ml-auto h-5 w-5" />}{selectedAnswer !== null && isSelected && !isCorrect && <CircleX className="ml-auto h-5 w-5" />}</button>})}</div>{selectedAnswer !== null && <div className={`mt-7 rounded-xl border-l-4 p-5 ${selectedAnswer === currentQuestion.answer ? 'border-[#2b9b63] bg-[#eef9f2]' : 'border-[#df493c] bg-[#fff3f1]'}`}><p className="text-xs font-bold tracking-[0.14em] uppercase">{selectedAnswer === currentQuestion.answer ? 'Correct' : 'Review this idea'}</p><p className="mt-2 text-sm leading-6 text-[#526078]">{currentQuestion.explanation}</p></div>}<div className="mt-8 flex justify-end"><button type="button" disabled={selectedAnswer === null} onClick={nextQuestion} className="inline-flex items-center gap-2 rounded-xl bg-[#386ee8] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2c5ed0] disabled:cursor-not-allowed disabled:opacity-40">{currentIndex === questions.length - 1 ? 'Finish quiz' : 'Next question'} <Flag className="h-4 w-4" /></button></div></section></div></main>
  )
}
