import { BASE_URL } from '@/lib/constants'

export default function request<T>(
  url: string,
  init?: RequestInit | undefined
) {
  return fetch(BASE_URL + url, init).then((res) => res.json() as T)
}
