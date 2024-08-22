import type { VideoInfo } from '@/types'
import { createContext, useContext } from 'react'

interface VideoPlayerContextProps {
  videoInfo: VideoInfo
  playUrl: string
  setPlayUrl: (url: string) => void
  playLineIndex: number
  setPlayLineIndex: (index: number) => void
  addrTabIndex: string
  setAddrTabIndex: (index: string) => void
  ep: number
  setEp: (index: number) => void
}

export const VideoPlayerContext = createContext<VideoPlayerContextProps>({
  videoInfo: {} as VideoInfo,
  playUrl: '',
  setPlayUrl: () => {},
  playLineIndex: 0,
  setPlayLineIndex: () => {},
  addrTabIndex: '0',
  setAddrTabIndex: () => {},
  ep: 0,
  setEp: () => {},
})

export function useVideoPlayer() {
  return useContext(VideoPlayerContext)
}
