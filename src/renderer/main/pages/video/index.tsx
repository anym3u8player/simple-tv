import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { fetchVideo } from '../../api'
import { PlayItem, Video } from '../../types'
import { parseVideoPlayUrl } from '../../utils'
import Player from '../../components/Player'
import { HeartIcon } from '../../components/Icons'
import LiveList from './LiveList'

const VideoPage: React.FC = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const [index, setIndex] = useState(() => {
    const ep = searchParams.get('ep')
    if (ep) {
      return Number(ep)
    }
    return 0
  })

  const [loading, setLoading] = useState(false)
  const [showIntro, setShowIntro] = useState(false)

  const [current, setCurrent] = useState<Video>()

  const [liveList, setLiveList] = useState<PlayItem[]>([])

  const liveUrl = useMemo(() => {
    if (liveList.length > 0) {
      const live = liveList[index]
      if (live) {
        return live.url
      }
    }
    return ''
  }, [index, liveList])

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchVideo(id)
        .then((v) => {
          setCurrent(v)
          const { m3u8List } = parseVideoPlayUrl(
            v.vod_play_from,
            v.vod_play_url
          )
          setLiveList(m3u8List)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [id])

  useEffect(() => {
    if (current) {
      document.title = current.vod_name
    }
    return () => {
      document.title = 'TV'
    }
  }, [current])

  if (current) {
    return (
      <div className="flex h-full">
        <div className="flex-1">{/* <Player liveUrl={liveUrl} /> */}</div>
        <div className="w-80 py-4 px-3 rounded-l-lg bg-slate-600 relative overflow-hidden h-full">
          <div className="flex items-center justify-between  mb-1 lg:mb-2">
            <h3 className="text-primary-content text-2xl font-medium">
              {current.vod_name}
            </h3>
            <HeartIcon />
          </div>
          <div className=" mb-1 lg:mb-2">
            {current.vod_remarks}&nbsp;&nbsp;·&nbsp;&nbsp;
            <button onClick={() => setShowIntro(true)}>简介 ❯</button>
          </div>
          <h5 className="text-xl font-medium text-primary-content mb-1 lg:mb-2">
            剧集
          </h5>
          <LiveList items={liveList}  onItemClick={setIndex} />
          <div
            className={`absolute top-0 left-0 py-4 px-3 flex flex-col h-full w-full text-primary-content bg-gray-800 ${
              showIntro ? 'block' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between mb-1 lg:mb-2">
              <h4 className="text-2xl font-medium">简介</h4>
              <button
                className="btn btn-circle btn-sm btn-outline"
                onClick={() => setShowIntro(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <img
                src={current.vod_pic}
                alt={current.vod_name + '封面'}
                className="w-40 mb-1 lg:mb-2"
              />
              <div className="row">
                <div className="info-label">导演</div>
                <div className="value">{current.vod_director}</div>
              </div>
              <div className="mb-1 lg:mb-2mb-1 lg:mb-2 truncate">
                {current.vod_sub}
              </div>
              <div className="mb-1 lg:mb-2">
                {current.vod_remarks} · {current.vod_douban_score} ·{' '}
                {current.type_name}
              </div>
              <div className="mb-1 lg:mb-2">
                {current.vod_year} · {current.vod_tag.split(',').join('·')} ·{' '}
                {current.vod_area} · {current.vod_lang}
              </div>
              <h5 className="text-xl font-medium mb-1 lg:mb-2">演员</h5>
              <div className="mb-1 lg:mb-2">{current.vod_actor}</div>
              <div>{current.vod_content}</div>
            </div>
            LiveList
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    )
  }

  return <div>暂无数据</div>
}

export default VideoPage
