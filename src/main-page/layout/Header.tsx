import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, Location } from 'react-router-dom'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'

interface History {
  length: number
  index: number
  location?: Location
}

const menus = [
  {
    id: 1,
    name: '电 影',
  },
  {
    id: 2,
    name: '剧 集',
  },
  {
    id: 39,
    name: '短 剧',
  },
  {
    id: 4,
    name: '动 漫',
  },
  {
    id: 3,
    name: '综 艺',
  },
  // {
  //   id: 40,
  //   name: '预告',
  // },
]

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
      className="w-full border-b border-slate-900/20 dark:border-slate-50/20"
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

          {menus.map((m) => (
            <NavLink key={m.id} to={`/channel/${m.id}`} className="link">
              {m.name}
            </NavLink>
          ))}
          <NavLink to="/about" className="link">
            关 于
          </NavLink>
        </nav>
        <div className="flex-1 h-full draggable"></div>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
