import { session } from 'electron'
import { app } from 'electron/main'

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://www.maovideo.com/*'],
}

app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived(
    filter,
    (details, callback) => {
      // details.responseHeaders['Cache-Control'] = ['public', 'max-age=3600']
      callback({ responseHeaders: details.responseHeaders })
    }
  )
})
