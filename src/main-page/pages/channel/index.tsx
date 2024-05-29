import { BASE_URL } from '@/lib/constants'
import Pagination from '@/components/Pagination'
import VideoCard from '@/main-page/components/VideoCard'
import { VideoList } from '@/types'
import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'

export const channelLoader: LoaderFunction = ({ params, request }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const query = new URLSearchParams()
  if (params.channelId) query.append('categoryPid', params.channelId)
  if (params.categoryId) query.append('categoryId', params.categoryId)
  const pageStr = searchParams.get('page') || '1'
  const page = Number(pageStr)
  query.append('page', pageStr)
  return fetch(`${BASE_URL}/template/vod?${query.toString()}`)
    .then((res) => res.json())
    .then((data) => ({
      ...data,
      page,
    }))
}

const ChannelPage: React.FC = () => {
  const { page, list, total } = useLoaderData() as VideoList & { page: number }
  return (
    <div>
      <div className="grid grid-cols-6 gap-2">
        {list.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <Pagination total={total} current={page} size={100} />
    </div>
  )
}

export default ChannelPage
