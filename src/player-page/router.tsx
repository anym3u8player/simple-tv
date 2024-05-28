import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Video, { videoLoader } from './pages/video'

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
    ],
  },
])

export default router
