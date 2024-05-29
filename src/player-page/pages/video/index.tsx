import useLocalStorage from '@/hooks/useLocalStorage'
import { BASE_URL } from '@/lib/constants'
import { VideoInfoDetail } from '@/types'
import React, { useEffect } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { VideoPlayerContext } from './VideoPlayerContext'
import VideoPlayer from './VideoPlayer'
import emitter from '@/player-page/utils/emitter'

export const videoLoader: LoaderFunction = ({ params }) => {
  return fetch(`${BASE_URL}/template/vod/brief/${params.id}`).then((res) =>
    res.json()
  )
}

const Video: React.FC = () => {
  const { info } = useLoaderData() as VideoInfoDetail
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
