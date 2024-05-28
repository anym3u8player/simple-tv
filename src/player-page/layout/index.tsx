import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'

const AppLayout: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const removeListener = window.messageAPI.onPlayVideo((id) => {
      console.log('onPlayVideo', id)
      navigate(`/video/${id}`)
    })
    return removeListener
  }, [navigate])
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
