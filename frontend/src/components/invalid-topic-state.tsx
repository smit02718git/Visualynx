import Link from 'next/link'

type InvalidTopicStateProps = {
  subject: string
  returnPath: string
  accentClass: string
  message?: string
}

export function InvalidTopicState({ subject, returnPath, accentClass, message }: InvalidTopicStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center">
      <div className="max-w-lg rounded-2xl border border-[#e1e7ef] bg-white p-8 shadow-sm">
        <p className="text-lg font-semibold text-[#1d2433]">
          {message || `This concept is not related to ${subject}.`}
        </p>
        <Link href={returnPath} className={`mt-6 inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white ${accentClass}`}>
          Choose another concept
        </Link>
      </div>
    </main>
  )
}
