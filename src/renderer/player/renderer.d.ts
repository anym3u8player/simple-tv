interface ElectronAPI {
  toggleDevtools: () => Promise<void>
  setPlayerAlwaysOnTop: (alwaysOnTop: boolean) => Promise<void>
}

type RemoveListener = () => void

interface MessageAPI {
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
  }
}
