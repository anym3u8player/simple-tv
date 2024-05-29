import { BASE_IMAGE_URL, BASE_URL } from '@/lib/constants'
import type { Category, VideoList } from '@/types'
import React from 'react'
import {
  NavLink,
  Outlet,
  useLoaderData,
  type LoaderFunction,
} from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import LazyImage from '@/main-page/components/LazyImage'

export const channelLayoutLoader: LoaderFunction = ({ params }) => {
  const category = fetch(
    `${BASE_URL}/template/vod/category?parentId=${params.channelId}`
  ).then((res) => res.json())
  const banner = fetch(
    `${BASE_URL}/template/vod?categoryPid=${params.channelId}&banner=1`
  ).then((res) => res.json())

  return Promise.all([category, banner])
}

const ChannelLayout: React.FC = () => {
  const [categoryList, bannerList] = useLoaderData() as [Category[], VideoList]

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
        <nav className="flex flex-wrap">
          <NavLink
            to={''}
            relative="route"
            end
            className={({ isActive }) =>
              buttonVariants({
                variant: isActive ? 'default' : 'ghost',
              })
            }
          >
            全部
          </NavLink>
          {categoryList.map((c) => (
            <NavLink
              key={c.id}
              to={String(c.id)}
              relative="route"
              className={({ isActive }) =>
                buttonVariants({
                  variant: isActive ? 'default' : 'ghost',
                })
              }
            >
              {c.name}
            </NavLink>
          ))}
        </nav>
        <div className="py-2">
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default ChannelLayout
