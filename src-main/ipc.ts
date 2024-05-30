import { ipcMain, nativeTheme, shell } from 'electron'
import { setMainTitleBarOverlay } from './windows/main'
import { checkForUpdates } from './updater'
import { Theme } from './types'
import {
  setPlayerTitleBarOverlay,
  sendToPlayer,
  focusPlayer,
  setPlayerAlwaysOnTop,
} from './windows/player'

export default function handleIPC() {
  ipcMain.handle('TOGGLE_DEVTOOLS', (event) => {
    event.sender.toggleDevTools()
  })

  ipcMain.handle('CHECK_FOR_UPDATE', () => {
    return checkForUpdates().then((res) => (res ? res.updateInfo.version : ''))
  })

  ipcMain.handle('SET_THEME', (e, theme: Theme) => {
    nativeTheme.themeSource = theme
    setMainTitleBarOverlay()
    setPlayerTitleBarOverlay()
    sendToPlayer('ON_THEME_CHANGE')
  })

  ipcMain.handle('OPEN_EXTERNAL', (_e, url: string) => {
    return shell.openExternal(url)
  })

  ipcMain.handle('PLAY_VIDEO', (_e, id: number) => {
    focusPlayer()
    sendToPlayer('ON_PLAY_VIDEO', id)
  })

  ipcMain.handle('SET_PLAYER_ALWAYS_ON_TOP', (_e, alwaysOnTop: boolean) => {
    setPlayerAlwaysOnTop(alwaysOnTop)
  })

  ipcMain.handle('PLAY_SPORT_LIVE', (_e, id: number, type: number) => {
    focusPlayer()
    sendToPlayer('ON_PLAY_SPORT_LIVE', id, type)
  })
}
