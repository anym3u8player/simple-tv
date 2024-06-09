import { BrowserWindow, nativeTheme } from 'electron'
import * as path from 'node:path'
import { DARK_BACK_COLOR, ROOT } from '../constants'

let win: BrowserWindow = null!
let quit = false

export function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden',
    backgroundColor: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
      symbolColor: nativeTheme.shouldUseDarkColors ? '#fff' : '#000',
      height: 40,
    },
    webPreferences: {
      preload: path.join(ROOT, 'player-preload.cjs'),
      webSecurity: import.meta.env.PROD,
    },
  })
  win.once('ready-to-show', () => {
    if (import.meta.env.DEV || process.argv.includes('--dev')) {
      win.webContents.openDevTools({ mode: 'bottom' })
    }
  })

  win.on('close', (e) => {
    if (!quit) {
      e.preventDefault()
      win.hide()
      win.webContents.send('ON_PLAYER_CLOSE')
    }
  })

  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5174/player')
  } else {
    win.loadFile(path.join(ROOT, 'renderer/player.html'))
  }
}

export function setPlayerTitleBarOverlay() {
  if (win && process.platform === 'win32') {
    win.setTitleBarOverlay({
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
      symbolColor: nativeTheme.shouldUseDarkColors ? '#fff' : '#000',
    })
  }
}

export function sendToPlayer(channel: string, ...args: unknown[]) {
  win.webContents.send(channel, ...args)
}

export function focusPlayer() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.show()
    win.focus()
  }
}

export function setPlayerAlwaysOnTop(flag: boolean) {
  win.setAlwaysOnTop(flag)
}

export function beforeAppQuit() {
  quit = true
}
