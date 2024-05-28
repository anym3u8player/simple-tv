import Player from '@/components/Player'
import { Button } from '@/components/ui/button'
import useLocalStorage from '@/hooks/useLocalStorage'
import { BASE_URL } from '@/lib/constants'
import { VideoInfoDetail } from '@/types'
import React, { useState } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import VideoList from './VideoList'

export const videoLoader: LoaderFunction = ({ params }) => {
  return fetch(`${BASE_URL}/template/vod/brief/${params.id}`).then((res) =>
    res.json()
  )
}

const Video: React.FC = () => {
  const { info } = useLoaderData() as VideoInfoDetail
  const [open, setOpen] = useLocalStorage('video_tab_open', true)

  const { name } = info

  const [playUrl, setPlayUrl] = useState('')

  return (
    <div className="flex items-center h-full overflow-hidden">
      <div className="grow">
        <Player liveUrl={playUrl} />
      </div>
      <div
        className=" bg-secondary h-full text-card-foreground relative"
        style={{
          width: open ? '300px' : '0px',
        }}
      >
        <Button
          onClick={() => setOpen((o) => !o)}
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 py-6 text-xl"
        >
          {open ? '❯' : '❮'}
        </Button>
        <div>
          <h3>{name}</h3>
          <VideoList addrList={info.playLines[0].addr} />
        </div>
      </div>
    </div>
  )
}

export default Video
