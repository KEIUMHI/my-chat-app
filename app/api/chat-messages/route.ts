import { type NextRequest } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    inputs,
    query,
    conversation_id: conversationId,
    response_mode: responseMode,
  } = body
  const { user } = getInfo(request, body)
  const res = await client(request).createChatMessage(inputs, query, user, responseMode, conversationId)
  return new Response(res.data as any)
}
