import Pagination from '@/components/Pagination'
import { SPORT_LIVE_BASE_URL } from '@/lib/constants'
import MatchCard from '@/main-page/components/MatchCard'
import type { HotPageData } from '@/types/live'
import React from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'

export const hotLoader: LoaderFunction = ({ params, request }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const pageStr = searchParams.get('page')
  const query = new URLSearchParams({
    isfanye: '1',
    type: params.type || '0',
    cid: '0',
    ishot: '1',
    pn: pageStr || '1',
    ps: searchParams.get('size') || '20',
    level: '',
    name: '',
    langtype: 'zh',
    pid: '1',
    zoneId: 'Asia/Shanghai',
  })
  return fetch(`${SPORT_LIVE_BASE_URL}/match/list/new?${query.toString()}`)
    .then((res) => res.json())
    .then((res) => res.data)
}

const LivePage: React.FC = () => {
  const { total, topList, dataList, currentPage } =
    useLoaderData() as HotPageData
  return (
    <div>
      {topList.length > 0 && (
        <>
          <h3>热门</h3>
          <div className="grid grid-cols-2 gap-2">
            {topList.map((m) => (
              <MatchCard key={m.id} match={m} isHot />
            ))}
          </div>
        </>
      )}
      <div className="grid grid-cols-2 gap-2">
        {dataList.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>

      <Pagination total={total} size={20} current={currentPage} />
    </div>
  )
}

export default LivePage
