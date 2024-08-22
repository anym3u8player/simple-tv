import { Button } from '@/components/ui/button'
import type { Addr } from '@/types'
import React, { useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useVideoPlayer } from './VideoPlayerContext'

const SIZE = 120

const VideoList: React.FC = () => {
  const {
    videoInfo,
    playLineIndex,
    setPlayUrl,
    playUrl,
    addrTabIndex,
    setAddrTabIndex,
    setEp,
  } = useVideoPlayer()

  const addrList = videoInfo.playLines[playLineIndex].addr

  const tabs = useMemo(() => {
    if (addrList.length < SIZE) {
      return []
    }
    const len = Math.ceil(addrList.length / SIZE)
    return Array.from({ length: len }, (_, i) => ({
      sort: String(i),
      index: i,
      name:
        i < len - 1
          ? `${i * SIZE + 1}-${(i + 1) * SIZE}`
          : `${i * SIZE}-${addrList.length}`,
      items: addrList.slice(i * SIZE, (i + 1) * SIZE),
    }))
  }, [addrList])

  const onClickEp = (addr: Addr, i: number) => {
    setEp(i)
    setPlayUrl(addr.url)
  }

  if (addrList.length < SIZE) {
    return (
      <div className="grid gap-2 grid-cols-4">
        {addrList.map((item, i) => (
          <Button
            key={item.sort}
            variant={item.url === playUrl ? 'default' : 'ghost'}
            onClick={() => onClickEp(item, i)}
            className="truncate"
          >
            {item.name}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <Tabs value={addrTabIndex} onValueChange={setAddrTabIndex}>
      <TabsList className="flex-wrap">
        {tabs.map((t) => (
          <TabsTrigger value={t.sort} key={t.sort}>
            {t.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.sort} value={t.sort}>
          <div className="grid gap-2 grid-cols-4">
            {t.items.map((item, i) => (
              <Button
                key={item.sort}
                variant={item.url === playUrl ? 'default' : 'ghost'}
                onClick={() => onClickEp(item, t.index * SIZE + i)}
                className="truncate"
              >
                {item.name}
              </Button>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default VideoList
