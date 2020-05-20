import React from 'react'

export default function DuoButton({ value, children }) {
  return (
    <div className='DuoButton'>
      {children}
    </div>
  )
}

DuoButton.defaultProps = {
  value: 'sample',
}
