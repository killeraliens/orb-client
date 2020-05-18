import config from '../config'
import React, { useState, useEffect } from 'react'
import { socket } from './Header'
// import socketIOClient from "socket.io-client";

export default function TweetFeed() {
  const [initialData, setInitialData] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    socket.on('allTweets', tweetArr => {
      console.log('tweet api hits', tweetArr)
      setInitialData(tweetArr)
    })

    return () => {
      socket.off('allTweets')
    }
  }, [])

  useEffect(() => {
      socket.on('tweet', tweet => {
        console.log('new tweet', tweet)
        console.log('existing data', data)
        const newTweetArr = [ ...initialData, {...tweet} ]
        console.log('NEW ARR', newTweetArr)
        setData(newTweetArr)
      })
    return () => {
      socket.off('tweet')
    }
  }, [])

  return(
    <div className="TweetFeed">
      {data.map((tweet, i) => <div key={i}>{tweet.text}</div>)}
      {initialData.map((tweet, i) => <div key={i}>{tweet.text}</div>)}
    </div>
  )
}
