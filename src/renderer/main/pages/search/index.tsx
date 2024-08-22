import { BASE_URL } from '@/lib/constants'
import { VideoList } from '@/types'
import React from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import SearchRow from './SearchRow'
import Pagination from '@/components/Pagination'

export const searchLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const pageStr = searchParams.get('page')
  const keyword = searchParams.get('keyword')
  return fetch(`${BASE_URL}/template/vod?${searchParams.toString()}`)
    .then((res) => res.json())
    .then((data) => ({
      ...data,
      keyword,
      page: Number(pageStr) || 1,
    }))
}

const Search: React.FC = () => {
  const { list, keyword, page, total } = useLoaderData() as VideoList & {
    page: number
    keyword: string
  }
  return (
    <div className="page">
      <div className="py-4">
        <h2 className="text-lg font-bold mb-2">
          {keyword ? '搜索结果' : '最新视频'}
        </h2>
        <div className="divide-y">
          {list.length > 0 ? (
            list.map((v) => <SearchRow key={v.id} video={v} />)
          ) : (
            <h2>暂无数据</h2>
          )}
        </div>
        <Pagination total={total} current={page} size={100} />
      </div>
    </div>
  )
}

export default Search
