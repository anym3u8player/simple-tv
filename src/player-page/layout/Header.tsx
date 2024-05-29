import React, { useEffect, useState } from 'react'
import { DrawingPinFilledIcon } from '@radix-ui/react-icons'
import emitter from '@/player-page/utils/emitter'

const LOCAL_KEY = 'alwaysOnTop'

const Header: React.FC = () => {
  const [alwaysOnTop, setAlwaysOnTop] = useState(
    localStorage.getItem(LOCAL_KEY) != null
  )

  const [title, setTitle] = useState('正在播放')

  useEffect(() => {
    emitter.on('title', setTitle)
    return () => {
      emitter.off('title', setTitle)
    }
  }, [])

  useEffect(() => {
    window.playerElectronAPI.setPlayerAlwaysOnTop(alwaysOnTop)
    if (alwaysOnTop) {
      localStorage.setItem(LOCAL_KEY, '1')
    } else {
      localStorage.removeItem(LOCAL_KEY)
    }
  }, [alwaysOnTop])

  return (
    <header
      id="titleBarContainer"
      className="w-full border-b border-slate-900/20 dark:border-slate-50/20"
    >
      <div id="titleBar" className="px-2 flex gap-2 items-center">
        <div className="flex-1 h-full text-xl font-semibold leading-10 text-left draggable">
          {title}
        </div>
        <button
          onClick={() => setAlwaysOnTop((t) => !t)}
          className={alwaysOnTop ? '-rotate-45	' : ''}
          title={alwaysOnTop ? '取消置顶' : '置顶'}
        >
          <DrawingPinFilledIcon />
        </button>
        {import.meta.env.DEV && (
          <button onClick={() => window.electronAPI.toggleDevtools()}>
            devtools
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
