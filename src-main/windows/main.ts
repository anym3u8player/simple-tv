import { BrowserWindow, app, dialog, nativeTheme } from 'electron'
import * as path from 'node:path'
import type { OpenDialogOptions } from 'electron'
import { DARK_BACK_COLOR, ROOT } from '../constants'

let win: BrowserWindow = null!
let quit = false

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
      preload: path.join(ROOT, 'main-preload.cjs'),
      webSecurity: import.meta.env.PROD,
    },
  })
  win.once('ready-to-show', () => {
    win.show()
    if (import.meta.env.DEV || process.argv.includes('--dev')) {
      win.webContents.openDevTools({ mode: 'bottom' })
    }
  })

  win.on('close', (e) => {
    if (!quit) {
      e.preventDefault()
      dialog
        .showMessageBox({
          type: 'question',
          buttons: ['是', '否'],
          title: '退出',
          message: '确定退出?',
        })
        .then((res) => {
          if (res.response === 0) {
            quit = true
            app.quit()
          }
        })
        .catch(() => {
          /** empty */
        })
    }
  })

  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5174')
  } else {
    win.loadFile(path.join(ROOT, 'renderer/index.html'))
  }
}

export function focus() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.show()
    win.focus()
  }
}

export function send(channel: string, ...args: unknown[]) {
  win.webContents.send(channel, ...args)
}

export function showOpenDialog(options: OpenDialogOptions) {
  return dialog.showOpenDialog(win, options)
}

export function setMainTitleBarOverlay() {
  if (win && process.platform === 'win32') {
    win.setTitleBarOverlay({
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
    })
  }
}

export function beforeQuit() {
  quit = true
}
