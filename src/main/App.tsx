import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import AndProvider from './context/AndProvider'

dayjs.locale('zh-cn')

const App: React.FC = () => {
  return (
    <AndProvider>
      <RouterProvider router={router} />
    </AndProvider>
  )
}

export default App
