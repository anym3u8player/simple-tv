export const BASE_URL = 'https://www.maovideo.com/openapi'

export const BASE_IMAGE_URL = 'https://www.maovideo.com'

export default function request<T>(
  url: string,
  init?: RequestInit | undefined
) {
  return fetch(BASE_URL + url, init).then((res) => res.json() as T)
}
