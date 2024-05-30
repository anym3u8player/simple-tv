import Player from '@/components/Player'
import { Button } from '@/components/ui/button'
import useLocalStorage from '@/hooks/useLocalStorage'
import { SPORT_LIVE_BASE_URL } from '@/lib/constants'
import emitter from '@/player-page/utils/emitter'
import type { LiveInfo, MatchData } from '@/types/live'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { redirect, useLoaderData, type LoaderFunction } from 'react-router-dom'

export const liveLoader: LoaderFunction = ({ params }) => {
  const query = new URLSearchParams({
    mid: params.id!,
    type: params.type!,
    isnew: '1',
    pid: '1',
    langtype: 'zh',
    test: '1',
    zoneId: 'Asia/Shanghai',
  })
  return fetch(`${SPORT_LIVE_BASE_URL}/match/detail?${query.toString()}`)
    .then((res) => res.json())
    .then((res) => res.data)
    .then((data: MatchData) => {
      if (data.matchinfo.status === 0) {
        emitter.emit(
          'title',
          `${data.matchinfo.hteam_name} VS ${data.matchinfo.ateam_name} - 直播`
        )
        return data
      }
      return redirect(`/match/${params.id}/${params.type}`)
    })
}

const Live: React.FC = () => {
  const match = useLoaderData() as MatchData

  const { matchinfo: matchInfo } = match

  const [open, setOpen] = useLocalStorage('live_tab_open', true)

  const [currentLive, setCurrentLive] = useState<LiveInfo>(() => {
    const cur = match.matchinfo.live_urls.find(
      (l) => l.name === '腾讯' || l.name.includes('清')
    )
    return cur || match.matchinfo.live_urls[0]
  })

  return (
    <div className="flex items-center h-full overflow-hidden">
      <div className="grow h-full">
        <Player liveUrl={currentLive?.url} />
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
          <div className="mx-auto my-4 p-2 max-w-lg rounded-lg lg:rounded-2xl shadow-xl text-center flex items-center justify-between gap-1 lg:gap-4">
            <div className="w-24 flex flex-col items-center">
              <img
                src={matchInfo.hteam_logo}
                alt={matchInfo.hteam_name}
                className="w-10 h-10"
              />
              <div className="truncate w-full">{matchInfo.hteam_name}</div>
            </div>
            <div>
              <div className="font-semibold text-lg">{matchInfo.score}</div>
              <div>{matchInfo.status_up_name}</div>
              <div>{dayjs(matchInfo.matchtime).format('YYYY-MM-DD HH:mm')}</div>
            </div>
            <div className="w-24 flex flex-col items-center">
              <img
                src={matchInfo.ateam_logo}
                alt={matchInfo.ateam_name}
                className="w-10 h-10"
              />
              <div className="truncate w-full">{matchInfo.ateam_name}</div>
            </div>
          </div>
          <div className="flex">
            {match.matchinfo.live_urls.map((l) => (
              <Button
                key={l.room_num}
                variant={
                  l.index === currentLive.index ? 'default' : 'secondary'
                }
                onClick={() => setCurrentLive(l)}
              >
                {l.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Live
