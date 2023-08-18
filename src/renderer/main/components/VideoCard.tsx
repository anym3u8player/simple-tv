import React, { memo } from 'react'
import type { Video } from '../types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

dayjs.extend(relativeTime)

interface Props {
  video: Video
}

const VideoCard: React.FC<Props> = ({ video }) => {
  return (
    <Link
      to={`/v/${video.vod_id}`}
      className="card bg-neutral shadow-xl"
      title={video.vod_name}
    >
      <figure className="relative">
        <img
          src={video.vod_pic}
          className="w-full aspect-[3/4] object-cover "
          alt={`${video.vod_name}封面`}
        />
        {video.vod_douban_score && video.vod_douban_score !== '0.0' && (
          <div className="absolute top-1 left-1 badge badge-lg badge-ghost">
            豆瓣 : {video.vod_douban_score}
          </div>
        )}
        <div className="absolute bottom-1 right-1 truncate badge badge-lg badge-ghost">
          {video.vod_remarks}({dayjs(video.vod_time).fromNow()})
        </div>
      </figure>
      <h2 className="pt-1 px-2 truncate text-lg">{video.vod_name}</h2>
    </Link>
  )
}

export default memo(VideoCard)
