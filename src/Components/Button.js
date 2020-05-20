import React from 'react'

export default function Button({ value, children, type, isDisabled, handleClick }) {
  return(
    <button
      value={value}
      type={!!type ? type : 'button'}
      className='Button'
      onClick={handleClick}
      disabled={!!isDisabled ? isDisabled : false }
     >
      { children }
    </button>
  )
}

Button.defaultProps = {
  value: 'sample',
  onClick: () => {}
}
