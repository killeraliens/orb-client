import config from './config'
import React, { useState, useEffect } from 'react'

export default function TweetFeed() {
  const [data, setData] = useState({})
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    const abortController = new AbortController();
    const fetchAPI = async () => {
      try {
        const response = await fetch(`${config.SERVER_ENDPOINT}/tweets`, { signal: abortController.signal })
        const body = await response.json()
        console.log(body)
        if (!response.ok) {
          setServerError('Error loading tweets.')
        } else {
          setData(body)
        }
      } catch(e) {
        setServerError(e.message)
      }
    }

    fetchAPI()
    return () => {
      abortController.abort();
    }
  }, [])

  return(
    <div className="TweetFeed">
      {data.message}
      <span>{serverError}</span>
    </div>
  )
}
