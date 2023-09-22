import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { Banner } from '../types'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

interface Props {
  bannerData: Banner[]
}

const BannerSwiper: React.FC<Props> = ({ bannerData }) => {
  const navigate = useNavigate()
  return (
    <Swiper
      navigation={true}
      loop
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {bannerData.map((v) => (
        <SwiperSlide
          key={v.id}
          className="cursor-pointer"
          onClick={() => navigate(`/v/${v.id}`)}
        >
          <BannerSlide {...v} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const BannerSlide: React.FC<Banner> = (banner) => (
  <div className="relative max-h-[600px]">
    <img
      className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
      src={banner.banner}
      width={1920}
      height={720}
      alt={banner.name}
    />
    <div className="absolute text-center bottom-7 w-full text-white">
      <div className="text-lg md:text-xl lg:text-2xl font-bold">
        {banner.name}
      </div>
      <div className="text-base">{banner.intro}</div>
    </div>
  </div>
)

export default memo(BannerSwiper)
