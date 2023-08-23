import React, { useEffect, useState } from 'react'
import { fetchVideoList } from '../../api'
import type { Video } from '../../types'
import VideoCard from '../../components/VideoCard'
import Loading from '../../components/Loading'

interface Props {
  ids: number[]
}

const ChoiceBox: React.FC<Props> = ({ ids }) => {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Video[]>([])
  useEffect(() => {
    setLoading(false)
    fetchVideoList(ids)
      .then(setList)
      .finally(() => {
        setLoading(false)
      })
  }, [ids])

  if (loading) {
    return <Loading />
  }

  return (
    <section>
      <div className="grid gap-2 grid-cols-6">
        {list.map((v) => (
          <VideoCard key={v.vod_id} video={v} />
        ))}
      </div>
    </section>
  )
}

export default ChoiceBox
