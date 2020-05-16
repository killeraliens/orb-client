import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import socketIOClient from "socket.io-client";
import config from "./config"

let socket
function Header() {
  const [endpoint, setEndpoint] = useState(`${ config.SERVER_ENDPOINT }/`)
  socket = socketIOClient(endpoint)
  return(
    <header>
      <h1>FEED ME</h1>
      <Link to="/">Date</Link>
      <Link to="tweets" >Tweets</Link>
    </header>
  )
}

export { Header, socket}
