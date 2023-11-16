import type { IOnCompleted, IOnData, IOnError } from './base'
import { get, post, ssePost } from './base'
import type { Feedbacktype } from '@/types/app'
import { getAppInfoFromStorage } from '@/utils/appInfo'

export const sendChatMessage = async (body: Record<string, any>, { onData, onCompleted, onError }: {
  onData: IOnData
  onCompleted: IOnCompleted
  onError: IOnError
}) => {
  return ssePost(`chat-messages?appId=${encodeURIComponent(getAppInfoFromStorage().appId)}`, {
    body: {
      ...body,
      response_mode: 'streaming',
    },
  }, { onData, onCompleted, onError })
}

export const fetchConversations = async () => {
  return get('conversations', { params: { limit: 20, first_id: '', appId: getAppInfoFromStorage().appId } })
  // return get('conversations', { params: { limit: 20, first_id: '' } })
}

export const fetchChatList = async (conversationId: string) => {
  return get('messages', { params: { conversation_id: conversationId, limit: 20, last_id: '', appId: getAppInfoFromStorage().appId } })
  // return get('messages', { params: { conversation_id: conversationId, limit: 20, last_id: '' } })
}

// init value. wait for server update
export const fetchAppParams = async () => {
  return get('parameters', { params: { appId: getAppInfoFromStorage().appId } })
  // return get('parameters')
}

export const updateFeedback = async ({ url, body }: { url: string; body: Feedbacktype }) => {
  return post(url, { body, params: { appId: getAppInfoFromStorage().appId } })
  // return post(url, { body })
}
