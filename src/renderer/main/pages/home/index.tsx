import { BASE_URL, CATEGORY_LIST } from '@/lib/constants'
import type { VideoList } from '@/types'
import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import VideoCard from '@/renderer/main/components/VideoCard'
import Latest from './Latest'
import Carousels from '@/components/Carousels'

export const homeLoader: LoaderFunction = () => {
  const banner = fetch(`${BASE_URL}/template/vod?banner=1`).then((res) =>
    res.json()
  )
  const hots = fetch(`${BASE_URL}/template/vod?hots=1`).then((res) =>
    res.json()
  )
  return Promise.all([banner, hots])
}

const Home: React.FC = () => {
  const [bannerList, hots] = useLoaderData() as [VideoList, VideoList]
  const banners = bannerList.list.filter((b) => b.cycleImg !== '')
  return (
    <section>
      <Carousels items={banners} />
      <div className="space-y-2 page">
        <div>
          <h2>热门推荐</h2>
          <div className="video-list">
            {hots.list.map((v) => (
              <VideoCard video={v} key={v.id} />
            ))}
          </div>
        </div>
        {CATEGORY_LIST.map((c) => (
          <Latest key={c.id} id={c.id} name={c.name} />
        ))}
      </div>
    </section>
  )
}

export default Home
