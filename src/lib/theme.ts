export type Theme = 'dark' | 'light' | 'system'

const LOCAL_THEME = 'local_theme'

export function getLocalTheme(): Theme {
  const localData = localStorage.getItem(LOCAL_THEME)
  if (localData != null) {
    return localData as Theme
  }
  return 'system'
}

export function setLocalTheme(theme: Theme) {
  localStorage.setItem(LOCAL_THEME, theme)
}

export function addThemeClass(theme: Theme) {
  const root = window.document.documentElement

  root.classList.remove('light', 'dark')
  let systemTheme = theme
  if (theme === 'system') {
    systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  root.classList.add(systemTheme)
}
