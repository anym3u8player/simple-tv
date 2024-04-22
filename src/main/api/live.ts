import { Channel } from '../types'
import { parseLiveChannel } from '../utils'

const now = Date.now()

export function fetchChannelList(): Promise<Channel[]> {
  return fetch(`https://live.fanmingming.com/tv/m3u/global.m3u?t=${now}`, {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'text/plain',
    },
  })
    .then((res) => res.text())
    .then(parseLiveChannel)
}
