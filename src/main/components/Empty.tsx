import React from 'react'
import EmptySVG from '../assets/empty.svg'

const Empty: React.FC = () => {
  return (
    <div className="h-80 flex items-center justify-center">
      <img src={EmptySVG} alt="空数据" />
    </div>
  )
}

export default Empty
