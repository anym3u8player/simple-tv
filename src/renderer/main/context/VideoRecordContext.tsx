import React, {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import type { VideoRecord } from '../types'
import { fetchVideoList } from '../api'

interface VideoRecordProps {
  records: VideoRecord[]
  updateVideoRecord: (r: VideoRecord) => void
  removeVideoRecord: (r: VideoRecord) => void
}

const VideoRecordContext = React.createContext<VideoRecordProps>({
  records: [],
  updateVideoRecord: () => {},
  removeVideoRecord: () => {},
})

export function useVideoRecord() {
  return React.useContext(VideoRecordContext)
}

const MAX_VIDEO_RECORD_COUNT = 24
const VIDEO_STORAGE_KEY = 'video_record'

export const VideoRecordProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [records, setRecords] = useState<VideoRecord[]>([])

  useEffect(() => {
    const localData = localStorage.getItem(VIDEO_STORAGE_KEY)
    if (localData) {
      try {
        const data = JSON.parse(localData) as VideoRecord[]
        setRecords(data)
        const ids = data.map((v) => v.vod_id)
        if (ids.length > 0) {
          fetchVideoList(ids)
            .then((list) => {
              list.sort((a, b) => ids.indexOf(a.vod_id) - ids.indexOf(b.vod_id))
              return list
            })
            .then((list) => {
              if (list.length > 0) {
                const recordData = list.map((item, index) => {
                  // console.log(item.vod_id === data[index].vod_id)
                  return {
                    ...item,
                    date: data[index].date,
                    seek: data[index].seek,
                    index: data[index].index,
                  }
                })
                setRecords(recordData)
              }
            })
            .catch(console.error)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(records))
  }, [records])

  const updateVideoRecord = useCallback(
    (v: VideoRecord) => {
      setRecords((list) => {
        const r = {
          ...v,
          date: Date.now(),
          vod_play_url: '',
          vod_content: '',
          vod_actor: '',
        }
        return [r, ...list.filter((item) => item.vod_id !== r.vod_id)].slice(
          0,
          MAX_VIDEO_RECORD_COUNT
        )
      })
    },
    [setRecords]
  )

  const removeVideoRecord = useCallback(
    (r: VideoRecord) => {
      setRecords((list) => list.filter((item) => item.vod_id !== r.vod_id))
    },
    [setRecords]
  )

  return (
    <VideoRecordContext.Provider
      value={{
        records,
        updateVideoRecord,
        removeVideoRecord,
      }}
    >
      {children}
    </VideoRecordContext.Provider>
  )
}
