import React from 'react'
import type { Match } from '@/types/live'
import dayjs from 'dayjs'
import { Flame } from 'lucide-react'

interface Props {
  match: Match
  isHot?: boolean
}
//to={`/match/${match.id}/${match.type}`}
const MatchCard: React.FC<Props> = ({ match, isHot }) => {
  return (
    <div
      onClick={() => window.electronAPI.playSportLive(match.id, match.type)}
      className="cursor-pointer rounded-xl border bg-card text-card-foreground shadow lg:rounded-2xl bg-base-300 text-center flex items-center justify-between gap-1 lg:gap-4"
    >
      <div className="w-24 flex flex-col items-center">
        <img
          src={match.hteam_logo}
          alt={match.hteam_name}
          className="w-10 h-10"
        />
        <div className="truncate w-full">{match.hteam_name}</div>
      </div>
      <div>
        <div className="font-semibold text-lg">{match.score}</div>
        <div className="flex justify-center">
          {isHot && <Flame className="fill-red-400 stroke-red-400" />}
          {match.status_up_name}
        </div>
        <div>{dayjs(match.matchtime).format('YYYY-MM-DD HH:mm')}</div>
      </div>
      <div className="w-24 flex flex-col items-center">
        <img
          src={match.ateam_logo}
          alt={match.ateam_name}
          className="w-10 h-10"
        />
        <div className="truncate w-full">{match.ateam_name}</div>
      </div>
    </div>
  )
}

export default MatchCard
