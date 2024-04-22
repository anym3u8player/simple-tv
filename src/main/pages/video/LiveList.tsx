import React, { memo, useMemo, useState } from 'react'
import { PlayItem } from '../../types'

interface Props {
  items: PlayItem[]
  active?: number
  onItemClick: (index: number) => void
}

const TAB_SIZE = 120

const LiveList: React.FC<Props> = ({ items, onItemClick, active = 0 }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const tabItems = useMemo(() => {
    const num = items.length
    if (num > TAB_SIZE) {
      const tabs = Math.ceil(num / TAB_SIZE)
      return Array.from({ length: tabs }).map((_, index) => {
        if (index === tabs - 1) {
          return {
            index,
            name: `${index * TAB_SIZE + 1}~${num}`,
          }
        } else {
          return {
            index,
            name: `${index * TAB_SIZE + 1}~${(index + 1) * TAB_SIZE}`,
          }
        }
      })
    }
    return []
  }, [items.length])

  const currentTabItems = useMemo(
    () => items.slice(tabIndex * TAB_SIZE, (tabIndex + 1) * TAB_SIZE),
    [items, tabIndex]
  )

  return (
    <div id="ep-list">
      {tabItems.length > 0 && (
        <div className="grid grid-cols-3 gap-1 mb-1 lg:mb-2 sticky top-0">
          {tabItems.map((t) => (
            <button
              key={t.index}
              className={`btn  btn-sm ${
                tabIndex === t.index ? 'btn-primary' : ''
              }`}
              onClick={() => setTabIndex(t.index)}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-1 grid-cols-4">
        {currentTabItems.map((item) => (
          <button
            className={`btn btn-sm px-0 truncate ${
              active === item.index ? 'btn-primary' : ''
            }`}
            key={item.index}
            onClick={() => onItemClick(item.index)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default memo(LiveList)
