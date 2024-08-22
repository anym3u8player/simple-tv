import type { Category } from '@/types'
import { BASE_IMAGE_URL } from './constants'

export function uniqueCategory(categoryList: Category[]) {
  return categoryList.reduce((acc, cur) => {
    const i = acc.findIndex((item) => item.id === cur.id)
    if (i === -1) {
      acc.push(cur)
    }
    return acc
  }, [] as Category[])
}

export function formatUrl(url: string) {
  if (process.env.NODE_ENV === 'development') {
    return ''
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `${BASE_IMAGE_URL}${url}`
}
