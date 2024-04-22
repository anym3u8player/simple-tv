import React, { PropsWithChildren } from 'react'
import { App, ConfigProvider, theme } from 'antd'
import { useThemeStore } from '../store/theme'

const AndProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const shouldUseDarkColors = useThemeStore(
    (s) =>
      s.theme === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  return (
    <ConfigProvider
      theme={{
        algorithm: shouldUseDarkColors
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  )
}

export default AndProvider
