import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import Providers from './context/Providers'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const App: React.FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App
