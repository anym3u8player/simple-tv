import { Button } from '@/components/ui/button'
import { Addr } from '@/types'
import React, { useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {
  addrList: Addr[]
}

const SIZE = 120

const VideoList: React.FC<Props> = ({ addrList }) => {
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

  if (addrList.length < SIZE) {
    return (
      <div className="grid gap-2 grid-cols-4">
        {addrList.map((item, i) => (
          <Button key={item.sort} variant={i === 1 ? 'default' : 'ghost'}>
            {item.name}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue={' '}>
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
                variant={t.index * SIZE + i === 1 ? 'default' : 'ghost'}
              >
                {/* <Link href={`/v/${vid}/${t.index * SIZE + i}`}> */}
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
