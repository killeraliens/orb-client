import React from 'react'

export default function Button({ value, handleClick }) {
  return(
    <button className='Button' onClick={handleClick}>
      { value }
    </button>
  )
}

Button.defaultProps = {
  value: 'sample',
  handleClick: () => {}
}
