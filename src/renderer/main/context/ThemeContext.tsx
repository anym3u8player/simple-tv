import React, { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'

export type Theme = 'dark' | 'light'

interface ThemeProps {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = React.createContext<ThemeProps>({
  theme: 'light',
  setTheme: () => {},
})

export function useTheme() {
  return React.useContext(ThemeContext)
}

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getTheme())

  useEffect(() => {
    setLocalTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

const LOCAL_THEME = 'local_theme'
const THEME_ATTR = 'data-theme'

const DARK_BACK_COLOR = '#1d232a'

function getTheme(): Theme {
  if (
    localStorage[LOCAL_THEME] === 'dark' ||
    (!(LOCAL_THEME in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    window.electronAPI.setMainTitleBarOverlay({ color: DARK_BACK_COLOR })
    document.documentElement.setAttribute(THEME_ATTR, 'dark')
    return 'dark'
  }
  window.electronAPI.setMainTitleBarOverlay({ color: '#fff' })
  document.documentElement.setAttribute(THEME_ATTR, 'light')
  return 'light'
}

function setLocalTheme(theme: Theme) {
  localStorage.setItem(LOCAL_THEME, theme)
  document.documentElement.setAttribute(THEME_ATTR, theme)
  if (theme === 'dark') {
    window.electronAPI.setMainTitleBarOverlay({ color: DARK_BACK_COLOR })
  } else {
    window.electronAPI.setMainTitleBarOverlay({ color: '#fff' })
  }
}
