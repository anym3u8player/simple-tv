import type { Video, VideoResponse } from '../types'
import request from './request'

export function fetchVideoList(ids: number[]): Promise<Video[]> {
  return request({
    ac: 'detail',
    ids: ids.join(),
  }).then((res) => res.list)
}

export function fetchVideo(id: string | number): Promise<Video> {
  return request({
    ac: 'detail',
    ids: id,
  }).then((res) => {
    if (Array.isArray(res.list) && res.list.length > 0) {
      return res.list[0]
    }
    throw new Error('请求错误')
  })
}

export function fetchSearchData(param: {
  keyword: string
  page: number
}): Promise<VideoResponse> {
  return request({
    ac: 'detail',
    wd: param.keyword,
    pg: param.page || 1,
  })
}

export function fetchChannelData(param: {
  channel: string
  page: number
}): Promise<VideoResponse> {
  return request({
    ac: 'detail',
    t: param.channel,
    pg: param.page || 1,
  })
}
