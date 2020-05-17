import config from '../config'
import React, { useState, useEffect } from 'react'
import { socket } from './Header'

export default function TweetFeed() {
  const [data, setData] = useState('')

  useEffect(() => {
    socket.on('get_tweets', data => {
      console.log('tweet api hits', data)
      setData(data)
    })
    return () => {
      socket.off('get_tweets')
    }
  }, [])

  return(
    <div className="TweetFeed">
      {data}
    </div>
  )
}
