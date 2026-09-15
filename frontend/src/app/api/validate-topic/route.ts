import { proxyBackendRequest } from '@/lib/backend-proxy'

export async function POST(request: Request) {
  return proxyBackendRequest(request, '/api/validate-topic', { unavailableMessage: 'The topic validation backend is unavailable.' })
}