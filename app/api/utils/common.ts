import { type NextRequest } from 'next/server'
import { v4 } from 'uuid'
import { ChatClient } from 'dify-client'
// import axios from 'axios'
import { APP_ID } from '@/config'
import knowledgeLib from '@/libs/knowledge'
import type { IKnowledgeItem } from '@/types/app'

const userPrefix = `user_${APP_ID}:`

// export const getInfo = (request: NextRequest) => {
//   const sessionId = request.cookies.get('session_id')?.value || v4()
//   const user = userPrefix + sessionId
//   return {
//     sessionId,
//     user,
//   }
// }

export const getInfo = (request: NextRequest, body?: any) => {
  const { searchParams } = new URL(request.url)
  const appId = searchParams.get('appId')
  const _userPrefix = appId ? `user_${appId}` : userPrefix
  const sessionId = request.cookies.get('session_id')?.value || v4()
  const user = _userPrefix + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = (() => {
  const clients: Record<IKnowledgeItem['appId'], any> = {}
  knowledgeLib.forEach((lib) => {
    clients[lib.appId] = new ChatClient(lib.apiKey, lib.apiUrl || undefined)
  })
  return (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const appId = searchParams.get('appId') || APP_ID
    console.log('hit', appId, clients[appId])
    return clients[appId]
  }
})()
