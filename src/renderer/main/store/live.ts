import { create } from 'zustand'
import type { Channel } from '../types'
import { persist } from 'zustand/middleware'

interface LiveState {
  playChannel: Channel
  channels: Channel[]
  init: (list: Channel[]) => void
  setPlayChannel: (c: Channel) => void
  toggleChannel: (c: Channel) => void
  removeChannel: (c: Channel) => void
}

let initialized = false

export const useLiveStore = create<LiveState>()(
  persist(
    (set) => ({
      playChannel: {
        url: '',
        name: '',
        groupTitle: '',
      },
      channels: [],
      init: (list: Channel[]) =>
        set((state) => {
          if (!initialized) {
            const current = state.channels.find(
              (c) => c.name === state.playChannel.name
            )
            if (current) {
              if (current.url !== state.playChannel.url) {
                const channelNames = state.channels.map((c) => c.name)
                const nextChannels = list.filter((c) =>
                  channelNames.includes(c.name)
                )
                set({ playChannel: current, channels: nextChannels })
              }
            } else {
              set({ playChannel: list[0], channels: [] })
            }
            initialized = true
          }
          return {}
        }),
      setPlayChannel: (c: Channel) => set(() => ({ playChannel: c })),
      toggleChannel: (c: Channel) =>
        set((state) => {
          const index = state.channels.findIndex((ch) => ch.name === c.name)
          if (index === -1) {
            return { channels: [c, ...state.channels] }
          } else {
            return {
              channels: [
                ...state.channels.slice(0, index),
                ...state.channels.slice(index + 1),
              ],
            }
          }
        }),
      removeChannel: (c: Channel) =>
        set((state) => ({
          channels: state.channels.filter((ch) => ch.url !== c.url),
        })),
    }),
    {
      name: 'local_channel',
    }
  )
)
