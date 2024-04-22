import { Select } from 'antd'
import React from 'react'
import { MoonOutlined, SunOutlined, DesktopOutlined } from '@ant-design/icons'
import { useThemeStore } from '../store/theme'

const ThemeSelect: React.FC = () => {
  const { theme, setTheme } = useThemeStore()
  return (
    <Select
      defaultValue={theme}
      onChange={setTheme}
      options={[
        {
          value: 'light',
          label: (
            <>
              <SunOutlined />
              浅色
            </>
          ),
        },
        {
          value: 'dark',
          label: (
            <>
              <MoonOutlined />
              深色
            </>
          ),
        },
        {
          value: 'system',
          label: (
            <>
              <DesktopOutlined />
              跟随系统
            </>
          ),
        },
      ]}
    />
  )
}

export default ThemeSelect
