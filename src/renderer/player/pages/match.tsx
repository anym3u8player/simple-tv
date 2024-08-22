import { SPORT_LIVE_BASE_URL } from '@/lib/constants'
import type { MatchData } from '@/types/live'
import dayjs from 'dayjs'
import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'

export const matchLoader: LoaderFunction = ({ params }) => {
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
}

const Match: React.FC = () => {
  const { matchinfo: matchInfo } = useLoaderData() as MatchData

  return (
    <div>
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
      <pre>{JSON.stringify(matchInfo, null, 2)}</pre>
    </div>
  )
}

export default Match
