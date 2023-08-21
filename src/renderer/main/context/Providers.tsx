import React, { type PropsWithChildren } from 'react'
import { ThemeProvider } from './ThemeContext'
import { VideoRecordProvider } from './VideoRecordContext'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <VideoRecordProvider>{children}</VideoRecordProvider>
    </ThemeProvider>
  )
}

export default Providers
