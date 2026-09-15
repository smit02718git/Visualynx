export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-6 text-[#1d2433]">
      <div className="flex flex-col items-center text-center" role="status" aria-live="polite">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#dfe7f2] border-t-[#2f6fe0]" />
        <p className="mt-5 text-sm text-[#5c6d86]">Loading workspace</p>
      </div>
    </main>
  )
}