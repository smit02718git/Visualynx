type TopicValidationResult = {
  is_related: boolean
  message?: string
}

export async function validateTopic(subject: string, topic: string): Promise<TopicValidationResult> {
  const response = await fetch('http://127.0.0.1:8000/api/validate-topic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, topic }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null) as { detail?: string } | null
    throw new Error(error?.detail || 'Topic validation failed')
  }
  return response.json() as Promise<TopicValidationResult>
}