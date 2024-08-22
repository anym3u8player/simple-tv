import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { VideoItem } from '@/types'
import { formatUrl } from '@/lib'
import Autoplay from 'embla-carousel-autoplay'

interface Props {
  items: VideoItem[]
}

const Carousels: React.FC<Props> = ({ items }) => {
  return (
    <Carousel
      className="w-full"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {items.map((b) => (
          <CarouselItem
            key={b.id}
            onClick={() => window.electronAPI.playVideo(b.id)}
          >
            <div className="relative" title={b.title}>
              <img
                src={formatUrl(
                  b.cycleImg || b.horizontalPoster || b.verticalPoster
                )}
                alt={b.title}
                loading="lazy"
                className="object-cover h-full max-h-[500px] w-screen"
              />
              <div className="absolute w-fit mx-auto left-0 right-0 bottom-10 bg-primary-foreground/50 px-4 py-1 rounded">
                {b.name}
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
  )
}

export default Carousels
