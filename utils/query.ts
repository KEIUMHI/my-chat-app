export function getParameterFromURL(url: string, name: string) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`)
  const results = regex.exec(url)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export function removeParamsFromURL(url: string, paramsToRemove: string[]) {
  const urlObject = new URL(url)
  const searchParams = new URLSearchParams(urlObject.search)

  paramsToRemove.forEach((param) => {
    searchParams.delete(param)
  })

  urlObject.search = searchParams.toString()

  return urlObject.toString()
}
