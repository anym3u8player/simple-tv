import { ipcMain,   nativeTheme } from 'electron'
import {
  send as sendToMain,
  setMainTitleBarOverlay,
} from './windows/main'

export default function handleIPC() {
  nativeTheme.themeSource = 'system'

  ipcMain.handle('TOGGLE_DEVTOOLS', (event) => {
    event.sender.toggleDevTools()
  })

  ipcMain.handle('SEND_TO_MAIN', (e, channel: string, ...args: any[]) => {
    sendToMain(channel, ...args)
  })
  ipcMain.handle(
    'SET_MAIN_TITLE_BAR_OVERLAY',
    (e, options: Electron.TitleBarOverlayOptions) => {
      if (process.platform === 'win32') {
        setMainTitleBarOverlay(options)
      }
    }
  )
}
