import { app, session } from 'electron'
import * as path from 'path'
import * as os from 'os'

/** @link https://www.electronjs.org/zh/docs/latest/tutorial/devtools-extension */
export function loadDevTools() {
  // on windows
  const reactDevToolsPath = path.join(
    os.homedir(),
    '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.28.0_0'
  )
  app.whenReady().then(async () => {
    try {
      await session.defaultSession.loadExtension(reactDevToolsPath)
    } catch (error) {
      console.error('loadDevTools Error', error)
    }
  })
}
