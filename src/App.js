import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import config from './config'
import AppContext from './AppContext'
import TweetFeed from './Components/TweetFeed'
import { Header } from './Components/Header'
import AddForm from './Components/AddForm'
import Params from './Components/Params'
import Button from './Components/Button'
import './App.css'

export default function App() {
  const [socket, setSocket] = useState({})
  const [params, setParams] = useState(['AAPL', 'BAA'])

  // useEffect(() => {
  //   const endpoint = config.SERVER_ENDPOINT
  //   const newSocket = socketIOClient(endpoint)
  //   setSocket(newSocket)
  //   console.log('socket connected')
  //   return () => {
  //     socket.disconnect()
  //     console.log('socket disconnected')
  //   }
  // }, [])

  const addParam = (p) => {
    const newParam = p.toUpperCase()
    console.log('added new p', newParam)
  }

  const deleteParam = (p) => {
    console.log('deleted p', p)
    const newParams = params.filter(param => param != p)
    setParams(newParams)
  }

  const context = {
    params: params,
    addParam: addParam,
    deleteParam: deleteParam
  }
  return (
    <div className='App'>
      <AppContext.Provider value={context}>
        {/* <Header /> */}
        <AddForm />
        <Params params={ params } />
        {/* <Switch>
          <Route path="/tweets" component={TweetFeed}/>
        </Switch> */}
      </AppContext.Provider>
    </div>
  );
}
