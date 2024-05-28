import React from 'react'
import LazyImage from './LazyImage'
import type { VideoItem } from '../../types'

interface Props {
  video: VideoItem
}

const VideoCard: React.FC<Props> = ({ video }) => {
  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer"
      onClick={() => window.electronAPI.playVideo(video.id)}
    >
      <div className="relative">
        <LazyImage
          src={video.verticalPoster}
          alt={video.title}
          className="object-cover h-full w-full aspect-[2/3]"
        />
        {/* <div className="absolute top-0 left-0 text-sm bg-card rounded-br-lg px-1 py-0.5">
          {dayjs(video.shelfDate * 1000).fromNow()}
        </div> */}
        {video.note && (
          <div className="absolute bottom-0 left-0 text-sm bg-card rounded-tr-lg px-1 py-0.5 max-w-full truncate">
            {video.note}
          </div>
        )}
      </div>
      <div className="p-1 truncate font-semibold text-base md:text-lg">
        {video.title}
      </div>
    </div>
  )
}

export default VideoCard
