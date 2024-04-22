import { BrowserWindow, app } from 'electron'
import { loadDevTools } from './dev'
import {
  beforeQuit,
  create as createMainWindow,
  focus as focusMainWindow,
} from './windows/main'
import handleIPC from './ipc'
import log from 'electron-log/main'
import path from 'node:path'
import type { LogFile } from 'electron-log'
import fsp from 'node:fs/promises'

log.initialize()

// 日志文件设置
if (import.meta.env.PROD) {
  log.transports.file.archiveLogFn = (oldLogFile: LogFile) => {
    const file = oldLogFile.toString()
    const info = path.parse(file)
    fsp
      .rename(
        file,
        path.join(info.dir, info.name + new Date().toLocaleString() + info.ext)
      )
      .then(() => {
        log.info(`Log file archived: ${file}`)
      })
      .catch((err) => {
        log.error(err)
      })
  }
  log.transports.file.resolvePathFn = () =>
    path.join(app.getAppPath(), 'logs/app.log')
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到Window这个窗口
    focusMainWindow()
  })
  app.whenReady().then(() => {
    createMainWindow()
    handleIPC()
  })
}

if (import.meta.env.DEV) {
  loadDevTools()
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  } else {
    focusMainWindow()
  }
})

app.on('before-quit', beforeQuit)
