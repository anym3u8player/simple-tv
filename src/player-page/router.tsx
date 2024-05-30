import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Video, { videoLoader } from './pages/video'
import Live, { liveLoader } from './pages/live'
import Match, { matchLoader } from './pages/match'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'video/:id',
        loader: videoLoader,
        element: <Video />,
      },
      {
        path: 'live/:id/:type',
        loader: liveLoader,
        element: <Live />,
      },
      {
        path: 'match/:id/:type',
        loader: matchLoader,
        element: <Match />,
      },
    ],
  },
])

export default router
