import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../package.json'
import type { Theme } from '../types'
/**
 * 不能加载常量,sandbox无法加载
 */
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
})

contextBridge.exposeInMainWorld('devAPI', {
  toggleDevtools: () => ipcRenderer.invoke('TOGGLE_DEVTOOLS'),
})

contextBridge.exposeInMainWorld('electronAPI', {
  setTheme: (theme: Theme) => ipcRenderer.invoke('SET_THEME', theme),
  checkUpdate: () => ipcRenderer.invoke('CHECK_FOR_UPDATE'),
  openExternal: (url: string) => ipcRenderer.invoke('OPEN_EXTERNAL', url),
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
