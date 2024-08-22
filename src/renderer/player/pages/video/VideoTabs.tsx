import React from 'react'
import { Button } from '@/components/ui/button'
import VideoList from './VideoList'
import { useVideoPlayer } from './VideoPlayerContext'

const VideoTabs: React.FC = () => {
  const { videoInfo, playLineIndex, setPlayLineIndex } = useVideoPlayer()

  return (
    <div>
      <div className="flex py-2 flex-wrap">
        {videoInfo.playLines.map((playLine, index) => (
          <Button
            key={playLine.id}
            variant={playLineIndex === index ? 'default' : 'ghost'}
            onClick={() => setPlayLineIndex(index)}
          >
            {playLine.name}
          </Button>
        ))}
      </div>
      <VideoList />
    </div>
  )
}

export default VideoTabs
