import { BASE_IMAGE_URL, BASE_URL } from '@/lib/constants'
import type { VideoList } from '@/types'
import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import LazyImage from '@/main-page/components/LazyImage'
import VideoCard from '@/main-page/components/VideoCard'

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
      {banners.length > 0 && (
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {banners.map((b) => (
              <CarouselItem
                key={b.id}
                onClick={() => window.electronAPI.playVideo(b.id)}
              >
                <div className="h-96 w-screen relative" title={b.title}>
                  <LazyImage
                    src={
                      b.cycleImg.startsWith('/')
                        ? `${BASE_IMAGE_URL}${b.cycleImg}`
                        : b.cycleImg
                    }
                    alt={b.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-0 bottom-10 w-full text-center font-semibold text-2xl flex justify-center">
                    <div className="px-2 py-1 bg-background/80 rounded">
                      {b.name}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="rounded-none h-1/2 w-10 opacity-50"
            variant="outline"
          />
          <CarouselNext
            className="rounded-none h-1/2 w-10 opacity-50"
            variant="outline"
          />
        </Carousel>
      )}
      <div className="page">
        <h3 className="py-4">热门视频</h3>
        <div className="grid grid-cols-6 gap-2">
          {hots.list.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
