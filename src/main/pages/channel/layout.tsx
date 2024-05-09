import React from 'react'
import { type LoaderFunction } from 'react-router-dom'

export const channelLayoutLoader: LoaderFunction = ({params}) => {
    return fetch()
}

const Layout: React.FC = () => {
  return <div>Layout</div>
}

export default Layout
