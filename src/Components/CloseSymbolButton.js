import React from 'react'

export default function CloseSymbolButton({ symbolName }) {
  return(
    <button className='CloseSymbolButton'>
      ${symbolName.toUpperCase()}
    </button>
  )
}

CloseSymbolButton.defaultProps = {
  symbolName: 'sample'
}
