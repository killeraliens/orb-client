import React, { useState, useEffect } from 'react'
import { socket } from './Header'

export default function DateFeed() {
  const [response, setResponse] = useState('')

  useEffect(() => {
    socket.on('get_date', data => {
      console.log('date api hits', data)
      setResponse(data)
    })

    return () => {
      socket.off('get_date')
    }
  }, [])

  return(
  <div>
    <time dateTime={response}>{response}</time>
  </div>
  )
}
