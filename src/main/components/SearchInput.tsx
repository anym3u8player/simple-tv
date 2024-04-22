import React, { useState } from 'react'
import { debounce } from '../utils'
import { SearchIcon } from './Icons'

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  defaultValue?: string
  onSearch: (value: string) => void
}

const SearchInput: React.FC<Props> = ({
  size = 'sm',
  defaultValue = '',
  className = '',
  onSearch,
}) => {
  const [text, setText] = useState(defaultValue)

  const search = debounce(() => {
    onSearch(text)
  })

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      search()
    }
  }

  return (
    <div className={`join ${className}`}>
      <input
        className={`join-item input flex-1 input-${size} input-bordered`}
        placeholder="输入关键字"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        className={`btn btn-primary btn-${size} join-item text-2xl`}
        onClick={search}
      >
        <SearchIcon />
      </button>
    </div>
  )
}

export default SearchInput
