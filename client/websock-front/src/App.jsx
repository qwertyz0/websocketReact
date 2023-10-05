import React, { useState, useEffect } from "react";
//import and connect socket lib for client
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001/");

function App() {
  const [message, setMessage] = useState("");
  const [receiveMess, setReceiveMess] = useState([]);

  useEffect(() => {
    //getting data object from backend and set it to useState - setReceiveMess in socket.io.on function
    socket.on("receive_message", (receiveData) =>
      setReceiveMess([...receiveMess, receiveData])
    );
  }, [socket, receiveMess]);

  const typingMessage = (e) => {
    setMessage(e.target.value);
  };

  // set message to object and send it to backend
  const sendMessage = () => {
    const messObj = {
      mess: message,
    };
    socket.emit("send_message", messObj);
    setMessage("");
  };

  return (
    <div className="box">
      <div className="title">Websocket app</div>
      <input
        value={message}
        onChange={typingMessage}
        className="form"
        type="text"
        placeholder="Message here"
      />
      <button className="button-send" onClick={sendMessage}>
        Send message
      </button>
      <h1 className="mess-title">Message: </h1>
      {receiveMess.map((messi) => (
        <li className="receive-msg" key={messi.mess}>
          {messi.mess}
        </li>
      ))}
    </div>
  );
}

export default App;
