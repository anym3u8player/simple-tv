import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from './layout/Error'
import Home from './pages/home'
import ChannelLayout from './pages/channel/layout'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: 'channel/:pid',
        element: <ChannelLayout />,
        errorElement: <Error />,
      },
    ],
  },
])

export default router
