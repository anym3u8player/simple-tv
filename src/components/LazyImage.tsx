import React, { useEffect, useRef } from 'react'

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  placeholderSrc?: string
}

export default function LazyImage({
  placeholderSrc = './loading200x300.svg',
  src,
  ...props
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement
          lazyImage.src = src!
          observer.unobserve(lazyImage) // 观察一次后停止观察
          observer.disconnect() // 停止观察
        }
      })
    })
    const imgEl = imgRef.current
    if (imgEl) {
      lazyImageObserver.observe(imgEl)
    }
    return () => {
      lazyImageObserver.disconnect()
    }
  }, [src])

  if (import.meta.env.DEV) {
    return null
  }

  return (
    <img
      {...props}
      ref={imgRef}
      src={placeholderSrc}
      onError={(e) => {
        console.error('图片加载失败', e)
        ;(e.target as HTMLImageElement).onerror = null
        ;(e.target as HTMLImageElement).src = './error200x300.svg'
      }}
    />
  )
}
