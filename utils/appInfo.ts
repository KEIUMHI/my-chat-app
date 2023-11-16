import { getStorage, setStorage } from './storage'
import type { IKnowledgeItem } from '@/types/app'

const appInfoKey = 'appInfo'

export const getAppInfoFromStorage = (): IKnowledgeItem => {
  const ret = getStorage(appInfoKey)
  return ret
}
export const setCurrAppInfo = (value: IKnowledgeItem) => {
  setStorage(appInfoKey, value)
}
