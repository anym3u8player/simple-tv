import React, { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Channel } from '../../types'
import { fetchChannelList } from '../../api/live'
import { useLiveStore } from '../../store/live'
import {
  FluentPlay,
  MaterialSymbolsClose,
  PlayIcon,
} from '../../components/Icons'
import Loading from '../../components/Loading'
import Player from '../../components/Player'
import { DEFALUT_TITLE } from '../../utils/constants'

type TabKey = 'like' | 'list'

const TABS: { label: string; value: TabKey }[] = [
  {
    label: '收藏',
    value: 'like',
  },
  {
    label: '收藏',
    value: 'list',
  },
]

const LivePage: React.FC = () => {
  const [showTab, setShowTab] = useLocalStorage('local_live_tab', true)
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Channel[]>([])
  const [tab, setTab] = useState<TabKey>('like')

  const channels = useLiveStore((state) => state.channels)
  const channelNames = channels.map((c) => c.name)
  const playChannel = useLiveStore((state) => state.playChannel)
  const toggleChannel = useLiveStore((state) => state.toggleChannel)
  const init = useLiveStore((state) => state.init)
  const removeChannel = useLiveStore((state) => state.removeChannel)
  const setPlayChannel = useLiveStore((state) => state.setPlayChannel)

  useEffect(() => {
    setLoading(true)
    fetchChannelList()
      .then((list) => {
        init(list)
        setList(list)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [init])

  useEffect(() => {
    document.title = `${playChannel.name}-${DEFALUT_TITLE}`
    return () => {
      document.title = DEFALUT_TITLE
    }
  }, [playChannel.name])

  return (
    <div className="flex items-center h-full dark:bg-black">
      <div className="overflow-hidden flex-1 h-full flex items-center">
        <Player liveUrl={playChannel.url} isLive />
      </div>
      <div
        className={`${
          showTab ? 'w-[640px] py-4 px-3' : 'w-0 '
        } relative rounded-l-lg bg-base-300 h-full duration-100 ease-in-out`}
        style={{
          transitionProperty: 'width',
        }}
      >
        <button
          onClick={() => setShowTab((s) => !s)}
          className="absolute z-50 top-1/2 translate-y-1/2 -left-6 w-6 bg-base-300 text-4xl p-1 rounded-l-lg"
        >
          {showTab ? '❮' : '❯'}
        </button>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="tabs tabs-boxed">
              {TABS.map((t) => (
                <button
                  key={t.value}
                  className={`tab flex-1 ${
                    tab === t.value ? 'tab-active' : ''
                  }`}
                  onClick={() => setTab(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="live-table">
              <div className={tab === 'like' ? 'block' : 'hidden'}>
                <table className="table table-xs table-zebra">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>名称</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channels.map((c) => (
                      <tr key={c.url} className="hover cursor-pointer">
                        <td className="w-4">
                          {playChannel.url === c.url && <PlayIcon />}
                        </td>
                        <td
                          className="truncate flex items-center gap-1"
                          title="点击播放"
                          onClick={() => setPlayChannel(c)}
                        >
                          {c.tvgLogo && (
                            <img
                              className="w-8"
                              src={c.tvgLogo}
                              alt={c.tvgName}
                            />
                          )}
                          {c.name}
                        </td>
                        <td>
                          <button
                            title="播放"
                            className="join-item btn btn-xs"
                            onClick={() => setPlayChannel(c)}
                          >
                            <FluentPlay className="w-5 h-5" />
                          </button>
                          <button
                            title="取消收藏"
                            onClick={() => removeChannel(c)}
                            className="join-item btn btn-xs"
                          >
                            <MaterialSymbolsClose className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={tab === 'list' ? 'block' : 'hidden'}>
                <table className="table table-xs table-zebra">
                  <thead>
                    <tr>
                      <th>名称</th>
                      <th>分组</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((c, index) => (
                      <tr key={c.url} className="hover">
                        <td className="truncate flex items-center gap-1">
                          {c.tvgLogo && (
                            <img
                              className="w-8"
                              src={c.tvgLogo}
                              alt={c.tvgName}
                            />
                          )}
                          {c.name}
                        </td>
                        <td>
                          <div className="join">
                            <button
                              title="收藏"
                              onClick={() => toggleChannel(c)}
                              className="join-item btn btn-xs"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </button>
                            <button
                              title="播放"
                              className="join-item btn btn-xs"
                              onClick={() => setPlayChannel(c)}
                            >
                              <FluentPlay className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                        {/* <td>
                        <div className="flex items-center gap-4">
                          {c.tvgLogo && (
                            <img
                              className="w-8"
                              src={c.tvgLogo}
                              alt={c.tvgName}
                            />
                          )}
                          <span>{c.tvgName}</span>
                        </div>
                      </td> */}
                        <td className="truncate">{c.groupTitle}</td>
                        <td>
                          <div className="join">
                            <button
                              title="收藏"
                              onClick={() => toggleChannel(c)}
                              className={`join-item btn btn-xs ${
                                channelNames.includes(c.name)
                                  ? 'text-red-400'
                                  : ''
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </button>
                            <button
                              title="播放"
                              className="join-item btn btn-xs"
                              onClick={() => setPlayChannel(c)}
                            >
                              <FluentPlay className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LivePage
