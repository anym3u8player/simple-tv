import React from 'react'
import type { Video } from '../types'
import { Link } from 'react-router-dom'

interface Props {
  video: Video
}

const SearchItem: React.FC<Props> = ({ video }) => {
  return (
    <Link className="flex py-1 lg:py-2" to={`/v/${video.vod_id}`}>
      <div className="w-36 md:w-40 lg:w-52 text-center flex-shrink-0 mr-1 lg:mr-2 relative">
        <img
          src={video.vod_pic}
          width={270}
          height={300}
          alt={`${video.vod_name}封面`}
        />
        <div className="absolute top-0 right-0 px-1 text-xs lg:text-sm bg-neutral-700/80">
          {video.vod_remarks}
        </div>
      </div>
      <div className="text-sm md:text-base">
        <div className="text-lg md:text-xl font-semibold mb-1 lg:mb-2">
          {video.vod_name}
        </div>
        <div className="mb-1 lg:mb-2 flex flex-wrap gap-2">
          <div className="rounded border border-blue-700/50 text-blue-700 px-2 py-0.5">
            {video.type_name}
          </div>
          {video.vod_douban_score && (
            <div className="rounded border border-amber-500/50 text-amber-500 px-2 py-0.5">
              豆瓣:{video.vod_douban_score}
            </div>
          )}
          {video.vod_year && (
            <div className="rounded border border-lime-500/50 text-lime-500 px-2 py-0.5">
              {video.vod_year}
            </div>
          )}
          {video.vod_area && (
            <div className="rounded border border-purple-600/50 text-purple-600 px-2 py-0.5">
              {video.vod_area}
            </div>
          )}
          {video.vod_lang && (
            <div className="rounded border border-cyan-500/50 text-cyan-500 px-2 py-0.5">
              {video.vod_lang}
            </div>
          )}
        </div>
        {video.vod_tag && (
          <div className="row">
            <div className="info-label">标签</div>
            <div className="info-content">{video.vod_tag}</div>
          </div>
        )}
        {video.vod_actor && (
          <div className="row">
            <div className="info-label">演员</div>
            <div className="info-content text-ellipsis" title={video.vod_actor}>
              {video.vod_actor}
            </div>
          </div>
        )}
        <div className="hidden md:block">
          <div className="row ">
            <div className="info-label">简介</div>
            <div className="info-content">{video.vod_content}</div>
          </div>
        </div>
        <button className="w-fit outline outline-1 px-4 py-1 text-blue-500 hover:text-blue-600/90 flex items-center gap-2 rounded">
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z"
              fill="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <span>播放</span>
        </button>
      </div>
    </Link>
  )
}

export default SearchItem
