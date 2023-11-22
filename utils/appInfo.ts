import { getStorage, setStorage } from './storage'
import type { IKnowledgeItem } from '@/types/app'

const appInfoKey = 'appInfo'
const appIdKey = 'appId'

export const getAppInfoFromStorage = (): IKnowledgeItem => {
  const ret = getStorage(appInfoKey)
  return ret
}
export const setCurrAppInfo = (value: IKnowledgeItem) => {
  setStorage(appInfoKey, value)
}

export const getAppIdFromStorage = (): string => {
  return getStorage(appIdKey)
}
export const setCurrAppId = (value: string) => {
  setStorage(appIdKey, value)
}
