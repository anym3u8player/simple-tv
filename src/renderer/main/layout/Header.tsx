import React from 'react'
import ThemeButton from './ThemeButton'

const Header: React.FC = () => {
  return (
    <header
      id="titleBarContainer"
      className="w-full border-b border-slate-900/20 dark:border-slate-50/20"
    >
      <div id="titleBar" className="px-4">
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
