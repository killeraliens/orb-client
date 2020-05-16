import React, { useState, useEffect } from 'react'
import { socket } from './Header'

export default function DateFeed() {
  const [response, setResponse] = useState('')

  useEffect(() => {
    let isCancelled = false
    socket.on('FromAPI', data => {
      // console.log('date api hits', data)
      if (!isCancelled) {
        setResponse(data)
      }
    })

    return () => {
      socket.off('FromAPI')
      isCancelled = true
    }
  }, [])

  return(
  <div>
    <time dateTime={response}>{response}</time>
  </div>
  )
}
