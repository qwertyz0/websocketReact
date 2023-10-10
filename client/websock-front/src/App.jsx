import React, { useState, useEffect } from "react";
//import and connect socket lib for client
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001/");

function App() {
  //seting room to join
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [receiveMess, setReceiveMess] = useState([]);
  const [randomNum, setRandomNum] = useState(102);

  useEffect(() => {
    //getting data object from backend and set it to useState - setReceiveMess in socket.io.on function
    socket.on("receive_message", (receiveData) =>
      setReceiveMess([...receiveMess, receiveData])
    );
  }, [socket, receiveMess]);

  const typingMessage = (e) => {
    setMessage(e.target.value);
  };

  //random for key in map object
  const random = () => {
    const rand = Math.floor(Math.random() * 101);
    setRandomNum(rand);
  };

  // set message to object and send it to backend
  const sendMessage = () => {
    random();
    const messObj = {
      mess: message,
      room: room,
      key: randomNum,
    };
    socket.emit("send_message", messObj);
    setMessage("");
  };

  const enterRoom = () => {
    if (room !== "") {
      socket.emit("enter_room", room);
      alert(`Room ${room} has been entered`);
    }
  };

  return (
    <div className="box">
      <div className="title">Websocket app</div>
      <div>
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="form"
          type="text"
          placeholder="Enter room to join"
        />
        <button className="button-send" onClick={enterRoom}>
          Enter room
        </button>
      </div>
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
        <li className="receive-msg" key={messi.key}>
          {messi.mess}
        </li>
      ))}
    </div>
  );
}

export default App;
