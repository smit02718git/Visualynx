import { NextResponse } from 'next/server'

const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'

type ProxyOptions = {
  unavailableMessage: string
}

export async function proxyBackendRequest(
  request: Request,
  endpoint: string,
  { unavailableMessage }: ProxyOptions,
) {
  try {
    const response = await fetch(`${backendUrl}${endpoint}`, {
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
    return NextResponse.json({ detail: unavailableMessage }, { status: 503 })
  }
}
