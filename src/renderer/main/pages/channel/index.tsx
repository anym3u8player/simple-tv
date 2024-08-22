import { BASE_URL } from '@/lib/constants'
import type { VideoList } from '@/types'
import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import Carousels from '@/components/Carousels'
import CategoryVideoList from './CategoryVideoList'

export const channelLoader: LoaderFunction = ({ params }) => {
  return fetch(
    `${BASE_URL}/template/vod?banner=1&categoryPid=${params.channelId}`
  )
    .then((res) => res.json())
    .then((data) => ({
      ...data,
      channelId: params.channelId,
    }))
}

const ChannelPage: React.FC = () => {
  const { list, channelId } = useLoaderData() as VideoList & {
    channelId: string
  }
  return (
    <>
      {list.length > 0 && <Carousels items={list} />}
      <CategoryVideoList parentId={channelId} />
    </>
  )
}

export default ChannelPage
