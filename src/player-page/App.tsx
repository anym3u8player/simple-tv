import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useIPC } from './utils/ipc'

const App: React.FC = () => {
  useIPC()
  return <RouterProvider router={router} />
}

export default App
