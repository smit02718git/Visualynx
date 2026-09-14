import { NextResponse } from 'next/server'

const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'

export async function POST(request: Request) {
  try {
    const response = await fetch(`${backendUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: await request.text(),
      cache: 'no-store',
    })

    const body = await response.text()

    return new NextResponse(body, {
      status: response.status,
      headers: { 'Content-Type': response.headers.get('Content-Type') || 'application/json' },
    })
  } catch {
    return NextResponse.json(
      { detail: 'The chat backend is unavailable. Start the FastAPI server on port 8000.' },
      { status: 503 },
    )
  }
}