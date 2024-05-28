import { BrowserWindow, nativeTheme } from 'electron'
import * as path from 'node:path'
import { DARK_BACK_COLOR, ROOT } from '../constants'

let win: BrowserWindow = null!

export function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
      symbolColor: '#f8fafc',
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
    e.preventDefault()
    win.hide()
  })

  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5174/player')
  } else {
    win.loadFile(path.join(__dirname, 'renderer/player.html'))
  }
}

export function setPlayerTitleBarOverlay() {
  if (win && process.platform === 'win32') {
    win.setTitleBarOverlay({
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
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
