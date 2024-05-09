import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div id="main" className="p-1 md:p-2 lg:p-4">
        <Outlet />
      </div>
    </>
  )
}

export default AppLayout
