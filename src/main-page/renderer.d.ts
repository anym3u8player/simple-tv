import Electron from 'electron'

interface IElectronAPI {
  setTheme: (theme: Theme) => Promise<void>
  checkUpdate: () => Promise<string>
  openExternal: (url: string) => Promise<void>
  toggleDevtools: () => Promise<void>
  playVideo: (id: number) => Promise<void>
  playSportLive: (id: number, type: number) => Promise<void>
}
interface IVersions {
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

declare global {
  interface Window {
    electronAPI: IElectronAPI
    versions: IVersions
  }
}
