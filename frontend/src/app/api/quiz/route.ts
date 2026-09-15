import { proxyBackendRequest } from '@/lib/backend-proxy'

export async function POST(request: Request) {
  return proxyBackendRequest(request, '/api/quiz', { unavailableMessage: 'The quiz backend is unavailable.' })
}
