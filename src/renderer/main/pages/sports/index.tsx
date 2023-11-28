import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const SportsIndex: React.FC = () => {
  return (
    <div>
      <nav className="flex items-center gap-1 flex-wrap min-h-[40px] mx-4">
        <NavLink to="" end>热门</NavLink>
        <NavLink to="hot/1">足球</NavLink>
        <NavLink to="hot/2">篮球</NavLink>
        <NavLink to="cate">分类</NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default SportsIndex
