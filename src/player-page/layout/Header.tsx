import React from 'react'

const Header: React.FC = () => {
  return (
    <header
      id="titleBarContainer"
      className="w-full border-b border-slate-900/20 dark:border-slate-50/20"
    >
      <div id="titleBar" className="px-2 flex gap-2 items-center">
        <div className="flex-1 h-full leading-10 text-left draggable">
          正在播放
        </div>
      </div>
    </header>
  )
}

export default Header
