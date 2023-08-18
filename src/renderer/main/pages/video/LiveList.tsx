import React, { memo, useMemo, useState } from 'react'
import { PlayItem } from '../../types'

interface Props {
  items: PlayItem[]
  onItemClick: (index: number) => void
}

const TAB_SIZE = 120

const LiveList: React.FC<Props> = ({ items, onItemClick }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const tabItems = useMemo(() => {
    if (items.length > TAB_SIZE) {
      const tabs = Math.ceil(items.length / TAB_SIZE)
      return Array.from({ length: tabs }).map((_, index) => ({
        index,
        name: `${index + 1}~${(index + 1) * TAB_SIZE}`,
      }))
    }
    return []
  }, [items.length])

  const currentTabItems = useMemo(
    () => items.slice(tabIndex, (tabIndex + 1) * TAB_SIZE),
    [items, tabIndex]
  )

  return (
    <div>
      {tabItems.length > 0 && (
        <div className="join join-horizontal mb-1 lg:mb-2">
          {tabItems.map((t) => (
            <button
              key={t.index}
              className="btn join-item"
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
            className="btn btn-sm btn-outline"
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
