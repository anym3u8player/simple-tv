import React from 'react'
import type { VideoItem } from '../../../types'
import LazyImage from '@/components/LazyImage'

interface Props {
  video: VideoItem
}

const VideoCard: React.FC<Props> = ({ video }) => {
  return (
    <div
      className="card rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300"
      onClick={() => window.electronAPI.playVideo(video.id)}
    >
      <div className="relative">
        <LazyImage
          src={video.verticalPoster}
          alt={video.title}
          className="rounded-t-lg object-cover h-full w-full aspect-[2/3]"
        />
        {/* <div className="absolute top-0 left-0 text-sm text-foreground bg-primary rounded-br-lg px-1 py-0.5">
          {dayjs(video.shelfDate * 1000).fromNow()}
        </div> */}
        {video.note && (
          <div className="absolute top-0 left-0 text-sm bg-muted text-muted-foreground rounded-br-lg px-1 py-0.5 max-w-full truncate">
            {video.note}
          </div>
        )}
        <div className="hidden group-hover:line-clamp-6 absolute bottom-0 left-0 text-sm bg-secondary/60 text-secondary-foreground px-3 pt-2 max-w-full">
          {video.introduce}
        </div>
      </div>
      <div className="p-1 truncate font-semibold text-base md:text-lg">
        {video.title}
      </div>
    </div>
  )
}

export default VideoCard
