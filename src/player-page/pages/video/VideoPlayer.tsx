import Player from '@/components/Player'
import { Button } from '@/components/ui/button'
import useLocalStorage from '@/hooks/useLocalStorage'
import React from 'react'
import VideoTabs from './VideoTabs'
import { useVideoPlayer } from './VideoPlayerContext'

function getSeek(key: string) {
  const localData = localStorage.getItem(key)
  if (localData) {
    return Number(localData)
  }
  return undefined
}

const VideoPlayer: React.FC = () => {
  const [open, setOpen] = useLocalStorage('video_tab_open', true)
  const { playUrl, videoInfo, playLineIndex, ep, setEp, setPlayUrl } =
    useVideoPlayer()

  const onEnd = () => {
    if (videoInfo.playLines[playLineIndex].addr[ep + 1]) {
      setEp(ep + 1)
      setPlayUrl(videoInfo.playLines[playLineIndex].addr[ep + 1].url)
    }
    localStorage.removeItem(`video_seek_${videoInfo.id}_${playLineIndex}_${ep}`)
  }
  const onTimeUpdate = (seek: number) => {
    localStorage.setItem(
      `video_seek_${videoInfo.id}_${playLineIndex}_${ep}`,
      seek.toString()
    )
  }

  const seek = getSeek(`video_seek_${videoInfo.id}_${playLineIndex}_${ep}`)

  return (
    <div className="flex items-center h-full overflow-hidden">
      <div className="grow h-full flex items-center">
        <Player
          liveUrl={playUrl}
          onTimeUpdate={onTimeUpdate}
          onEnd={onEnd}
          seek={seek}
        />
      </div>
      <div className="relative">
        <Button
          className="w-8 py-6 text-2xl absolute -left-8 top-0 rounded-r-none"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '❯' : '❮'}
        </Button>
      </div>
      <div
        className={`h-full rounded-l-lg relative border-l bg-card overflow-y-auto overflow-x-hidden scrollbar transition-all ${
          open ? 'w-[500px]' : 'w-0'
        }`}
      >
        <div className="p-2">
          <h3>{videoInfo.name}</h3>
          <p className="line-clamp-2">{videoInfo.introduce}</p>
          <VideoTabs />
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
