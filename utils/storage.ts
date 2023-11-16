export const getStorage = (key: string) => {
  return globalThis.localStorage?.getItem(key) ? JSON.parse(globalThis.localStorage?.getItem(key) || '') : {}
}

export const setStorage = (key: string, value: any) => {
  globalThis.localStorage?.setItem(key, JSON.stringify(value))
}

export const removeStorage = (key: string) => {
  globalThis.localStorage?.removeItem(key)
}
