import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import config from "./config"

export default function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(config.SERVER_ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}
