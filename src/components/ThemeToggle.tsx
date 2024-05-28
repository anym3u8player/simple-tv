import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'
import {
  type Theme,
  setLocalTheme,
  getLocalTheme,
  addThemeClass,
} from '@/lib/theme'

function setAppTheme(theme: Theme) {
  setLocalTheme(theme)
  window.electronAPI.setTheme(theme).then(() => {
    addThemeClass(theme)
  })
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getLocalTheme())

  useEffect(() => {
    setAppTheme(theme)
    console.log('setAppTheme', theme)
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="focus-visible:ring-0">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          亮 色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          暗 色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          系 统
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
