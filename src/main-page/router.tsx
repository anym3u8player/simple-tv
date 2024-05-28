import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from '@/components/Error'
import Home from './pages/home'
import ChannelLayout, { channelLayoutLoader } from './pages/channel/layout'
import ChannelPage, { channelLoader } from './pages/channel'

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
        path: 'channel/:channelId',
        element: <ChannelLayout />,
        errorElement: <Error />,
        loader: channelLayoutLoader,
        children: [
          {
            path: ':categoryId?',
            loader: channelLoader,
            element: <ChannelPage />,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
])

export default router
