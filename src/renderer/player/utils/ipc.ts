import { addThemeClass, getLocalTheme } from '@/lib/theme'
import { useEffect } from 'react'

export function useIPC() {
  useEffect(() => {
    const theme = getLocalTheme()
    addThemeClass(theme)

    const removeListener = window.playerMessageAPI.onThemeChange(() => {
      const theme = getLocalTheme()
      addThemeClass(theme)
    })
    return removeListener
  }, [])
}
