import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from '@/components/Error'
import Home, { homeLoader } from './pages/home'
import ChannelLayout, { channelLayoutLoader } from './pages/channel/layout'
import ChannelPage, { channelLoader } from './pages/channel'
import About from './pages/about'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
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
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])

export default router
