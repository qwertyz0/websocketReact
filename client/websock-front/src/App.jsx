import React from "react";
//import and connect socket lib for client
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001/");

function App() {
  const sendMessage = () => {};

  socket.on("hello", (serverSide) => {
    console.log(`${serverSide}`);
  });

  return (
    <div className="box">
      <div className="title">Websocket app</div>
      <input className="form" type="text" placeholder="Message here" />
      <button className="button-send">Send message</button>
    </div>
  );
}

export default App;
