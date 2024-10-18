/// <reference types="vite/client" />

export type Theme = 'system' | 'light' | 'dark'

export interface ElectronAPI {
  toggleDevtools: () => Promise<void>
  setPlayerAlwaysOnTop: (alwaysOnTop: boolean) => Promise<void>
}

export interface IElectronAPI {
  setTheme: (theme: Theme) => Promise<void>
  checkUpdate: () => Promise<string>
  openExternal: (url: string) => Promise<void>
  toggleDevtools: () => Promise<void>
  playVideo: (id: number) => Promise<void>
  playSportLive: (id: number, type: number) => Promise<void>
}
export interface IVersions {
  node: string
  chrome: string
  electron: string
  version: string
  platform:
    | 'aix'
    | 'darwin'
    | 'freebsd'
    | 'linux'
    | 'openbsd'
    | 'sunos'
    | 'win32'
}

export type RemoveListener = () => void

export interface MessageAPI {
  onThemeChange: (callback: () => void) => RemoveListener
  onPlayVideo: (callback: (id: number) => void) => RemoveListener
  onPlaySportLive: (
    callback: (id: number, type: number) => void
  ) => RemoveListener
  onPlayClose: (callback: () => void) => RemoveListener
}

declare global {
  interface Window {
    playerElectronAPI: ElectronAPI
    playerMessageAPI: MessageAPI
    electronAPI: IElectronAPI
    versions: IVersions
  }
}
