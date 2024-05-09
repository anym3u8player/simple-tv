import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (t: Theme) => void
}

const LOCAL_THEME = 'local_theme'


export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: 'system',
      setTheme: (t) =>
        setAppTheme(t).then(() => set({ theme: t })),
    }),
    {
      name: LOCAL_THEME,
    }
  )
)

function setAppTheme(theme: Theme) {
  return window.electronAPI.setTheme(theme).then(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')
    let systemTheme = theme
    if (theme === 'system') {
      systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }

    root.classList.add(systemTheme)
  })
}
