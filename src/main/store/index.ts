import { create } from 'zustand'
import {
  type StateStorage,
  persist,
  createJSONStorage,
} from 'zustand/middleware'
import type { Video, VideoRecord } from '../types'
import { fetchVideoList } from '../api'

interface VideoRecordState {
  records: VideoRecord[]
  updateVideoRecord: (r: VideoRecord) => void
  removeVideoRecord: (r: VideoRecord) => void
}

const MAX_VIDEO_RECORD_COUNT = 24
const VIDEO_STORAGE_KEY = 'video_record'

const storage: (stateKey: string) => StateStorage = (stateKey: string) => ({
  getItem: async (name: string): Promise<string | null> => {
    try {
      const localData = localStorage.getItem(name)
      if (localData) {
        const storageValue = JSON.parse(localData)
        const data = storageValue.state[stateKey]
        const ids = data.map((v: Video) => v.vod_id)
        if (ids.length > 0) {
          const list = await fetchVideoList(ids)
          list.sort((a, b) => ids.indexOf(a.vod_id) - ids.indexOf(b.vod_id))
          const recordData = list.map((item, index) => {
            return {
              ...item,
              date: data[index].date,
              seek: data[index].seek,
              index: data[index].index,
            }
          })
          return JSON.stringify({ state: { [stateKey]: recordData } })
        } else {
          return null
        }
      }
      return null
    } catch (error) {
      console.error(error)
      return null
    }
  },
  setItem: (name: string, value: string) => {
    // console.log(name, 'with value', value, 'has been saved')
    localStorage.setItem(name, value)
  },
  removeItem: localStorage.removeItem,
})

export const useVideoRecordStore = create(
  persist<VideoRecordState>(
    (set) => ({
      records: [],
      updateVideoRecord: (r: VideoRecord) =>
        set((state) => ({
          records: [
            { ...r, vod_play_url: '', vod_content: '', vod_actor: '' },
            ...state.records.filter((v) => r.vod_id !== v.vod_id),
          ].slice(0, MAX_VIDEO_RECORD_COUNT),
        })),
      removeVideoRecord: (r: VideoRecord) =>
        set((state) => ({
          records: state.records.filter((record) => r.vod_id !== record.vod_id),
        })),
    }),
    {
      name: VIDEO_STORAGE_KEY,
      storage: createJSONStorage(() => storage('records')),
    }
  )
)

interface LikesState {
  likes: Video[]
  addLike: (v: Video) => void
  removeLike: (v: Video) => void
}
const LIKE_LOCAL_KEY = 'likes'

export const useLikesStore = create(
  persist<LikesState>(
    (set) => ({
      likes: [],
      addLike: (v: Video) =>
        set((state) => ({
          likes: [v, ...state.likes],
        })),
      removeLike: (like: Video) =>
        set((state) => ({
          likes: state.likes.filter((v) => v.vod_id !== like.vod_id),
        })),
    }),
    {
      name: LIKE_LOCAL_KEY,
      storage: createJSONStorage(() => storage('likes')),
    }
  )
)
