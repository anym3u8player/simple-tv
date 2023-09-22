import React, { useEffect, useState } from 'react'
import ThemeButton from './ThemeButton'
import { NavLink, useLocation, useNavigate, Location } from 'react-router-dom'

interface History {
  length: number
  index: number
  location?: Location
}

const Header: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [historyState, setHistoryState] = useState<History>({
    length: 0,
    index: 0,
    location: undefined,
  })

  useEffect(() => {
    const {
      length,
      state: { idx },
    } = window.history
    setHistoryState({
      length,
      index: idx,
      location,
    })
    // console.log(window.history)
  }, [location])

  return (
    <header
      id="titleBarContainer"
      className="w-full border-b border-slate-900/20 dark:border-slate-50/20"
    >
      <div id="titleBar" className="px-2 flex gap-2 items-center">
        <button
          className="btn  btn-sm "
          title="后退"
          disabled={historyState.index === 0}
          onClick={() => navigate(-1)}
        >
          ❮
        </button>
        <button
          className="btn  btn-sm "
          title="前进"
          disabled={historyState.index === historyState.length - 1}
          onClick={() => navigate(1)}
        >
          ❯
        </button>
        <nav className="flex items-center gap-2 lg:gap-4 bg-base-100">
          <NavLink to="/" className="link link-hover">
            精选
          </NavLink>
          <NavLink to="/channel/14" className="link link-hover">
            频道
          </NavLink>
          <NavLink to="/search" className="link link-hover">
            搜索
          </NavLink>
          <NavLink to="/live" className="link link-hover">
            直播
          </NavLink>
        </nav>
        <div className="flex-1 h-full draggable"></div>
        <button
          className="btn btn-sm "
          onClick={() => window.devAPI.toggleDevtools()}
        >
          toggleDevtools
        </button>
        <ThemeButton />
      </div>
    </header>
  )
}

export default Header
