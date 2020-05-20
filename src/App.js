import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";
// import config from "./config"
import { Switch, Route } from 'react-router-dom'
import TweetFeed from "./Components/TweetFeed"
import { Header } from './Components/Header'
import AddSymbolForm from "./Components/AddSymbolForm";
// import Header from './Components/Header'

export default function App() {

  return (
    <div>
      <Header />
      <AddSymbolForm />
      <Switch>
        <Route path="/tweets" component={TweetFeed}/>
      </Switch>
    </div>
  );
}
