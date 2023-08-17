import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="overflow-auto px-4 py-4 mt-10" id="main">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
