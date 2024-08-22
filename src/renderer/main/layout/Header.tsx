import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, Location } from 'react-router-dom'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import SearchBar from './SearchBar'
import { CATEGORY_LIST } from '@/lib/constants'

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
  }, [location])

  return (
    <header
      id="titleBarContainer"
      className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div id="titleBar" className="px-2 flex gap-2 items-center">
        <Button
          title="后退"
          size="sm"
          variant="outline"
          disabled={historyState.index === 0}
          onClick={() => navigate(-1)}
        >
          ❮
        </Button>
        <Button
          title="前进"
          size="sm"
          variant="outline"
          disabled={historyState.index === historyState.length - 1}
          onClick={() => navigate(1)}
        >
          ❯
        </Button>
        <nav className="flex items-center gap-1 md:gap-3">
          <NavLink to="/" className="link">
            首 页
          </NavLink>

          {CATEGORY_LIST.map((m) => (
            <NavLink key={m.id} to={`/channel/${m.id}`} className="link">
              {m.name}
            </NavLink>
          ))}
          <NavLink to="/live" className="link">
            体 育
          </NavLink>
          <NavLink to="/about" className="link">
            关 于
          </NavLink>
        </nav>
        <div className="flex-1 h-full draggable"></div>
        <SearchBar />
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
