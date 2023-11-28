import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from './pages/error'
import Home from './pages/home'
import Video from './pages/video'
import Channel from './pages/channel'
import Search from './pages/search'
import About from './pages/about'
import SportsIndex from './pages/sports'
import SportsHome, { hotLoader } from './pages/sports/home'
import Type, { typeLoader } from './pages/sports/type'
import CateIndex from './pages/sports/cate'
import Cates, { catesLoader } from './pages/sports/cate/cates'
import Cate, { cateLoader } from './pages/sports/cate/cate'
import Match, { matchLoader } from './pages/sports/match'

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
        path: '/v/:id',
        element: <Video />,
        errorElement: <Error />,
      },
      {
        path: '/channel/:id',
        element: <Channel />,
        errorElement: <Error />,
      },
      {
        path: '/search',
        element: <Search />,
        errorElement: <Error />,
      },
      {
        path: '/about',
        element: <About />,
        errorElement: <Error />,
      },
      {
        path: 'sports',
        element: <SportsIndex />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            loader: hotLoader,
            element: <SportsHome />,
            errorElement: <Error />,
          },
          {
            path: 'hot/:type',
            loader: typeLoader,
            element: <Type />,
            errorElement: <Error />,
          },
          {
            path: 'cate',
            element: <CateIndex />,
            errorElement: <Error />,
            children: [
              {
                index: true,
                loader: catesLoader,
                element: <Cates />,
              },
              {
                path: ':id/:type',
                loader: cateLoader,
                element: <Cate />,
                errorElement: <Error />,
              },
            ],
          },
          {
            path: 'match/:id/:type',
            loader: matchLoader,
            element: <Match />,
            errorElement: <Error />,
          },
        ]
      }
    ],
  },
])

export default router
