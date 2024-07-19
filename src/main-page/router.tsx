import { createHashRouter, redirect } from 'react-router-dom'
import Layout from './layout'
import Error from '@/components/Error'
import Home, { homeLoader } from './pages/home'
import ChannelLayout, { channelLayoutLoader } from './pages/channel/layout'
import ChannelPage, { channelLoader } from './pages/channel'
import About from './pages/about'
import Search, { searchLoader } from './pages/search'
import LiveLayout from './pages/live/layout'
import LivePage, { hotLoader } from './pages/live/page'
import Cates from './pages/live/cates'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
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
      {
        path: 'search',
        loader: searchLoader,
        element: <Search />,
      },
      {
        path: 'live',
        element: <LiveLayout />,
        children: [
          {
            index: true,
            loader: () => redirect('hot/0'),
          },
          {
            path: 'hot/:type',
            loader: hotLoader,
            element: <LivePage />,
          },
          {
            path: 'cates',
            element: <Cates />,
          },
        ],
      },
    ],
  },
])

export default router
