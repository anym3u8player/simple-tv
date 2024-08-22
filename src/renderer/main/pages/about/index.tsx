import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'

const About: React.FC = () => {
  useEffect(() => {
    console.log('##version##')
    console.table(window.versions)
  }, [])
  return (
    <div className="page text-center">
      <img src="./logo.png" alt="logo" className="w-10 h-10 mx-auto" />
      <h2 className="text-xl font-semibold my-2">视界</h2>
      <div className="my-2">
        <span>版本 : </span>
        <span>{window.versions.version}</span>
      </div>
      <div className="my-2 flex justify-center gap-4">
        <Button onClick={window.electronAPI.checkUpdate}>检测更新</Button>
        <Button
          variant="secondary"
          onClick={() =>
            window.electronAPI.openExternal(
              'https://github.com/joey2217/simple-tv/releases'
            )
          }
        >
          手动下载
        </Button>
      </div>
      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => window.electronAPI.toggleDevtools()}
        >
          切换开发者工具
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            window.electronAPI.openExternal(
              'https://github.com/joey2217/simple-tv/issues'
            )
          }
        >
          反馈BUG
        </Button>
      </div>
    </div>
  )
}

export default About
