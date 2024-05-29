import { Button } from '@/components/ui/button'
import LazyImage from '@/main-page/components/LazyImage'
import type { VideoItem } from '@/types'
import React from 'react'

interface Props {
  video: VideoItem
}

const SearchRow: React.FC<Props> = ({ video }) => {
  return (
    <div className="bg-card text-card-foreground flex items-start py-2 md:py-4">
      <div className="w-36 md:w-40 lg:w-44 text-center flex-shrink-0 mr-1 lg:mr-2 relative rounded-lg">
        <LazyImage
          src={video.verticalPoster}
          alt={video.title}
          className="object-cover w-full h-56 md:h-60 lg:h-64"
        />
        {/* <div className="absolute top-0 left-0 text-sm text-foreground bg-primary rounded-br-lg px-1 py-0.5">
          {dayjs(video.shelfDate * 1000).fromNow()}
        </div> */}
        <div className="absolute bottom-0 left-0 text-sm text-foreground bg-secondary rounded-tr-lg px-1 py-0.5 max-w-full truncate">
          {video.note && `(${video.note})`}
        </div>
      </div>
      <div className="p-1 grid grid-cols-2 text-sm md:text-base gap-1 md:gap-2">
        <div className="col-span-2 flex gap-3 items-center flex-wrap">
          <h3 className="font-semibold text-lg md:text-2xl">{video.title}</h3>
          <span className="text-sm">{video.year}</span>
          <span className="text-sm px-2 py-1 border border-accent rounded-md">
            {video.category[0]?.name}
          </span>
        </div>
        {video.directors.length > 0 && (
          <div className="col-span-2 md:col-span-1">
            <span className="label">导演</span>
            <span>{video.directors.map((d) => d.name).join('/')}</span>
          </div>
        )}
        {video.actors.length > 0 && (
          <div className="col-span-2 md:col-span-1 line-clamp-2">
            <span className="label">演员</span>
            <span>{video.actors.map((d) => d.name).join('/')}</span>
          </div>
        )}
        <div className="col-span-2 line-clamp-4">
          <span className="label">简介</span>
          <span>{video.introduce}</span>
        </div>
        <div className="col-span-2">
          <Button onClick={() => window.electronAPI.playVideo(video.id)}>
            播 放
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchRow
