import { buttonVariants } from '@/components/ui/button'
import { BASE_URL } from '@/lib/constants'
import type { Category, VideoItem, VideoList } from '@/types'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import VideoCard from '../../components/VideoCard'
import { useEffect, useRef, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  pid: string
  id: number
  name: string
}

function ChannelVideo({ id, name, pid }: Props) {
  const containerRef = useRef<HTMLDivElement>(null!)

  const [list, setList] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target
          fetch(`${BASE_URL}/template/vod?categoryId=${id}&limit=24`)
            .then((res) => res.json() as unknown as VideoList)
            .then((data) => data.list.slice(0, 12))
            .then(setList)
            .catch((err) => {
              console.error(err)
            })
            .finally(() => setLoading(false))
          observer.unobserve(element) // 观察一次后停止观察
          observer.disconnect() // 停止观察
        }
      })
    })
    const containerEl = containerRef.current
    observer.observe(containerEl)
    return () => {
      observer.disconnect()
    }
  }, [id])

  return (
    <section ref={containerRef}>
      <div className="flex items-center justify-between">
        <h2>{name}</h2>
        <Link
          className={buttonVariants({ variant: 'link' })}
          to={`/list/${pid}/${id}`}
        >
          更多
          <ChevronRight />
        </Link>
      </div>
      <div className="video-list">
        {loading
          ? Array.from({ length: 12 }, (_, i) => (
              <Skeleton key={i} className="h-[300px]" />
            ))
          : list.map((v) => <VideoCard key={v.id} video={v} />)}
      </div>
    </section>
  )
}

const CategoryVideoList: React.FC<{ parentId: string }> = ({ parentId }) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch(`${BASE_URL}/template/vod/category?parentId=${parentId}`)
      .then((res) => res.json() as unknown as Category[])
      .then(setCategories)
  }, [parentId])

  return categories.map((c) => (
    <ChannelVideo key={c.id} id={c.id} name={c.name} pid={parentId} />
  ))
}

export default CategoryVideoList
