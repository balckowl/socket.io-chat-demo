import io from 'socket.io-client'
import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const socket = io('https://socket-io-chat-demo.vercel.app/');
  const [postChat, setPostChat] = useState('');
  const [getChat, setGetChat] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postChat) {
      socket.emit('chat', postChat)
      setPostChat('')
    } else {
      alert('何も打ち込まれていません。')
    }
  }

  useEffect(() => {
      socket.on('chat', (msg) => {
        setGetChat((prevGetChat) => [...prevGetChat, msg])
      });
    }, [])

  return (
      <div>
        <div className="container">

          <form name="myform" onSubmit={handleSubmit}>
            <input name="text" type="text" value={postChat} onChange={(e) => setPostChat(e.target.value)} />
            <button name="btn">送信</button>
          </form>

          <hr />

          <ul id="message">
            {getChat.map((chat, index) => (
              <li key={index}>{chat}</li>
            ))}
          </ul>

        </div>
      </div>
    )
  }

  export default App
