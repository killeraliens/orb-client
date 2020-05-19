import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";
// import config from "./config"
import { Switch, Route } from 'react-router-dom'
import TweetFeed from "./Components/TweetFeed"
import DateFeed from "./Components/DateFeed"
import { Header } from './Components/Header'
// import Header from './Components/Header'

export default function App() {

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={DateFeed}/>
        <Route path="/tweets" component={TweetFeed}/>
      </Switch>
    </div>
  );
}
