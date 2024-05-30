import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../package.json'
import type { Theme } from '../types'

contextBridge.exposeInMainWorld('electronAPI', {
  setTheme: (theme: Theme) => ipcRenderer.invoke('SET_THEME', theme),
  checkUpdate: () => ipcRenderer.invoke('CHECK_FOR_UPDATE'),
  openExternal: (url: string) => ipcRenderer.invoke('OPEN_EXTERNAL', url),
  toggleDevtools: () => ipcRenderer.invoke('TOGGLE_DEVTOOLS'),
  playVideo: (id: number) => ipcRenderer.invoke('PLAY_VIDEO', id),
  playSportLive: (id: number, type: number) =>
    ipcRenderer.invoke('PLAY_SPORT_LIVE', id, type),
})

// function addListener(channel: string, callback: (...args: unknown[]) => void) {
//   const listener = (_event: Electron.IpcRendererEvent, ...args: unknown[]) =>
//     callback(...args)
//   ipcRenderer.on(channel, listener)
//   return () => ipcRenderer.off(channel, listener)
// }

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
  dev: process.argv.includes('--dev'),
})
