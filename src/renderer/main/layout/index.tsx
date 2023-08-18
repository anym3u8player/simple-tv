import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="mt-10" id="main">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
