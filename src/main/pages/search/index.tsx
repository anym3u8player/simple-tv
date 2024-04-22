import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/SearchInput'
import { fetchSearchData } from '../../api'
import type { Video } from '../../types'
import SearchItem from '../../components/SearchItem'
import Pagination from '../../components/Pagination'
import { useSearchParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import Empty from '../../components/Empty'

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [list, setList] = useState<Video[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [param, setParam] = useState({
    keyword: '',
    page: 1,
  })

  const onSearch = (value: string) => {
    console.log(value)
    setParam({ keyword: value, page: 1 })
  }

  useEffect(() => {
    setLoading(true)
    fetchSearchData(param)
      .then((data) => {
        const { list, total } = data
        setTotal(total)
        setList(list)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [param])

  return (
    <div className="page">
      <div className="text-center mb-1 lg:mb-2">
        <SearchInput
          className="w-full max-w-md"
          defaultValue={searchParams.get('q') || ''}
          size="md"
          onSearch={onSearch}
        />
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : list.length > 0 ? (
          <div>
            <div className="divide-y">
              {list.map((v) => (
                <SearchItem key={v.vod_id} video={v} />
              ))}
            </div>
            <div className="text-center py-2">
              <Pagination
                total={total}
                current={param.page}
                onChange={(page) => setParam((p) => ({ ...p, page }))}
              />
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}

export default SearchPage
