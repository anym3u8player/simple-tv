import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'

const AppLayout: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const removeListener = window.playerMessageAPI.onPlayVideo((id) => {
      navigate(`/video/${id}`)
    })
    return removeListener
  }, [navigate])

  useEffect(() => {
    const removeListener = window.playerMessageAPI.onPlaySportLive(
      (id, type) => {
        navigate(`/live/${id}/${type}`)
      }
    )
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
