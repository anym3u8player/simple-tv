import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageData } from '../../types'
import { CHANNEL_DATA } from '../../utils/constants'
import { fetchChannelData } from '../../api'
import VideoCard from '../../components/VideoCard'
import Pagination from '../../components/Pagination'
import Loading from '../../components/Loading'

const Channel: React.FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [param, setParam] = useState({
    page: 1,
    channel: id || '14',
  })
  const [pageData, setPageData] = useState<PageData>({
    total: 0,
    list: [],
  })

  useEffect(() => {
    setLoading(true)
    fetchChannelData(param)
      .then(setPageData)
      .finally(() => {
        setLoading(false)
      })
  }, [param])

  return (
    <div className="page">
      <div>
        {CHANNEL_DATA.map((c) => (
          <div key={c.value} className="flex items-center mb-1 lg:mb-2">
            <div className="w-12">{c.label}</div>
            <div className="flex gap-1">
              {c.children.map((s) => (
                <button
                  className={`btn btn-sm ${
                    s.value === param.channel ? 'btn-primary' : ''
                  }`}
                  key={s.value}
                  onClick={() => setParam({ channel: s.value, page: 1 })}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-5 gap-1">
              {pageData.list.map((v) => (
                <VideoCard key={v.vod_id} video={v} />
              ))}
            </div>
            <div className="py-2 text-center">
              <Pagination
                current={param.page}
                total={pageData.total}
                onChange={(page) => setParam((p) => ({ ...p, page }))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Channel
