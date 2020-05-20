import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import TweetFeed from './Components/TweetFeed'
import { Header } from './Components/Header'
import AddForm from './Components/AddForm'
import Button from './Components/Button'
import './App.css'

export default function App() {

  return (
    <div className='App'>
      {/* <Header /> */}
      <AddForm />
      <Button />
      {/* <Switch>
        <Route path="/tweets" component={TweetFeed}/>
      </Switch> */}
    </div>
  );
}
