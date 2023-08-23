import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="h-80 flex items-center justify-center text-primary">
      <div className="loading loading-infinity w-24"></div>
    </div>
  )
}

export default Loading
