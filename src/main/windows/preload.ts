import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../../package.json'
import type { OpenDialogOptions } from 'electron'

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
  showItemInFolder: (fullPath: string) =>
    ipcRenderer.invoke('SHOW_ITEM_IN_FOLDER', fullPath),
  openPath: (fullPath: string) => ipcRenderer.invoke('OPEN_PATH', fullPath),
  showOpenDialog: (options: OpenDialogOptions) =>
    ipcRenderer.invoke('OPEN_DIALOG', options),
  setMainTitleBarOverlay: (options: Electron.TitleBarOverlayOptions) =>
    ipcRenderer.invoke('SET_MAIN_TITLE_BAR_OVERLAY', options),
})

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
})
