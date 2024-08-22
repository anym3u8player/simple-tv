import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const LiveLayout: React.FC = () => {
  return (
    <div className="py-1 px-2">
      <nav className="flex items-center gap-1 flex-wrap min-h-[40px]">
        <NavLink to="hot/0" className="link">
          首页
        </NavLink>
        <NavLink to="hot/1" className="link">
          足球
        </NavLink>
        <NavLink to="hot/2" className="link">
          篮球
        </NavLink>
        <NavLink to="cates" className="link">
          分类
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default LiveLayout
