import Electron from 'electron'

interface IElectronAPI {
  setMainTitleBarOverlay: (options: Electron.TitleBarOverlayOptions) => void
  checkUpdate: () => Promise<string>
  openExternal: (url: string) => Promise<void>
}

interface IDevAPI {
  toggleDevtools: () => Promise<void>
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
    devAPI: IDevAPI
    versions: IVersions
  }
}
