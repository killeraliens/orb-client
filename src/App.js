import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import TweetFeed from './Components/TweetFeed'
import { Header } from './Components/Header'
import AddSymbolForm from './Components/AddSymbolForm'
import CloseSymbolButton from './Components/CloseSymbolButton'
import './App.css'

export default function App() {

  return (
    <div className='App'>
      {/* <Header /> */}
      <AddSymbolForm />
      <CloseSymbolButton />
      {/* <Switch>
        <Route path="/tweets" component={TweetFeed}/>
      </Switch> */}
    </div>
  );
}
