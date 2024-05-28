import Electron from 'electron'

interface IElectronAPI {}

type RemoveListener = () => void

interface IMessageAPI {
  onThemeChange: (callback: () => void) => RemoveListener
  onPlayVideo: (callback: (id: number) => void) => RemoveListener
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
    messageAPI: IMessageAPI
  }
}
