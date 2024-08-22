import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div id="main" className="scrollbar">
        <Outlet />
      </div>
    </>
  )
}

export default AppLayout
