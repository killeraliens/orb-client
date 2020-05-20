import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import socketIOClient from "socket.io-client";
import config from "../config"

let socket
function Header() {
  // const [query, setQuery] = useState('?symbol=abc')
  const [endpoint, setEndpoint] = useState(`${ config.SERVER_ENDPOINT }`)

  useEffect(() => {
    socket = socketIOClient(endpoint)
    return () => {
      socket.disconnect()
      console.log('socket disconnected')
    }
  }, [])

  return(
    <header>
      <h1>Killeraliens Stock Tweets</h1>
      <NavLink to="/">Date</NavLink>
      {' '}
      <NavLink to="/tweets" >Tweets</ NavLink>
    </header>
  )
}

export { Header, socket}
