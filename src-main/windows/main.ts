import { BrowserWindow, app, dialog, nativeTheme } from 'electron'
import * as path from 'node:path'
import type { OpenDialogOptions } from 'electron'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let win: BrowserWindow = null!
let quit = false

const DARK_BACK_COLOR = '#141414'

export function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
      symbolColor: '#1890FF',
      height: 40,
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      webSecurity: import.meta.env.PROD,
      sandbox: false,
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
        .showMessageBox(null, {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Quit',
          message: 'Do you want to quit?',
        })
        .then((res) => {
          if (res.response === 0) {
            quit = true
            app.quit()
          }
        })
        .catch((err) => {
          /** empty */
        })
    }
  })

  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5174')
  } else {
    win.loadFile(path.join(__dirname, 'renderer/index.html'))
  }
}

export function focus() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.show()
    win.focus()
  }
}

export function send(channel: string, ...args: any[]) {
  win.webContents.send(channel, ...args)
}

export function showOpenDialog(options: OpenDialogOptions) {
  return dialog.showOpenDialog(win, options)
}

export function setMainTitleBarOverlay() {
  if (win) {
    win.setTitleBarOverlay({
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
    })
  }
}

export function beforeQuit() {
  quit = true
}
