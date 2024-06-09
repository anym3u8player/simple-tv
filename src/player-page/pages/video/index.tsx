import useLocalStorage from '@/hooks/useLocalStorage'
import { BASE_URL } from '@/lib/constants'
import { VideoInfoDetail } from '@/types'
import React, { useEffect, useState } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { VideoPlayerContext } from './VideoPlayerContext'
import VideoPlayer from './VideoPlayer'
import emitter from '@/player-page/utils/emitter'

export const videoLoader: LoaderFunction = ({ params }) => {
  return fetch(`${BASE_URL}/template/vod/brief/${params.id}`)
    .then((res) => res.json())
    .then((data: VideoInfoDetail) => {
      const videoId = data.info.id
      const localPlayUrl = localStorage.getItem(`video_play_url_${videoId}`)
      const localPlayLineIndex = localStorage.getItem(
        `video_play_line_index_${videoId}`
      )
      const localEp = localStorage.getItem(`video_ep_${videoId}`)
      const localAddrTabIndex = localStorage.getItem(
        `video_addr_tab_index_${videoId}`
      )

      return {
        ...data,
        playUrl: localPlayUrl || data.info.playLines[0].addr[0].url,
        playLineIndex: localPlayLineIndex ? Number(localPlayLineIndex) : 0,
        ep: localEp ? Number(localEp) : 0,
        addrTabIndex: localAddrTabIndex || '0',
      }
    })
}

const Video: React.FC = () => {
  const data = useLoaderData() as VideoInfoDetail & {
    playUrl: string
    playLineIndex: number
    ep: number
    addrTabIndex: string
  }

  const { info } = data

  const [playUrl, setPlayUrl] = useLocalStorage(
    `video_play_url_${info.id}`,
    info.playLines[0].addr[0].url
  )
  const [playLineIndex, setPlayLineIndex] = useLocalStorage(
    `video_play_line_index_${info.id}`,
    0
  )
  const [ep, setEp] = useLocalStorage(`video_ep_${info.id}`, 0)
  const [addrTabIndex, setAddrTabIndex] = useLocalStorage(
    `video_addr_tab_index_${info.id}`,
    '0'
  )

  useEffect(() => {
    setPlayUrl(data.playUrl)
    setPlayLineIndex(data.playLineIndex)
    setEp(data.ep)
    setAddrTabIndex(data.addrTabIndex)
  }, [
    data.addrTabIndex,
    data.ep,
    data.playLineIndex,
    data.playUrl,
    setAddrTabIndex,
    setEp,
    setPlayLineIndex,
    setPlayUrl,
  ])

  useEffect(() => {
    const title = `${info.name} - ${info.playLines[playLineIndex].addr[ep].name}`
    document.title = title
    emitter.emit('title', title)
  }, [ep, info.name, info.playLines, playLineIndex])

  return (
    <VideoPlayerContext.Provider
      value={{
        videoInfo: info,
        playUrl,
        setPlayUrl,
        playLineIndex,
        setPlayLineIndex,
        ep,
        setEp,
        addrTabIndex,
        setAddrTabIndex,
      }}
    >
      <VideoPlayer />
    </VideoPlayerContext.Provider>
  )
}

export default Video
