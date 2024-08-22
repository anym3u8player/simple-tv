import { buttonVariants } from '@/components/ui/button'
import { BASE_URL } from '@/lib/constants'
import type { VideoItem, VideoList } from '@/types'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import VideoCard from '../../components/VideoCard'
import { useEffect, useState } from 'react'

interface Props {
  id: number
  name: string
}

export default function Latest({ id, name }: Props) {
  const [data, setData] = useState<VideoItem[]>([])

  useEffect(() => {
    fetch(`${BASE_URL}/template/vod?categoryPid=${id}&limit=12`)
      .then((res) => res.json() as unknown as VideoList)
      .then((data) => data.list)
      .then(setData)
  }, [id])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>最新{name}</h2>
        <Link
          className={buttonVariants({ variant: 'link' })}
          to={`/channel/${id}`}
        >
          更多
          <ChevronRight />
        </Link>
      </div>
      <div className="video-list">
        {data.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  )
}
