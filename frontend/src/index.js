import React, { useEffect, useState } from 'react';  // libraries 
import ReactDOM from 'react-dom/client';

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const API_URL = "https://api.myapp.example.com";  // <-- replace with your API domain

  useEffect(() => {
    fetch(`${API_URL}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text})
    })
    .then(res => res.json())
    .then(msg => {
      setMessages([msg, ...messages]);
      setText("");
    })
    .catch(console.error);
  };

  return (
    <div style={{padding: "2rem", fontFamily: "Arial"}}>
      <h1>Messages</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter a message"
          style={{padding: "0.5rem", width: "300px"}}
        />
        <button type="submit" style={{marginLeft: "1rem"}}>Send</button>
      </form>
      <ul style={{marginTop: "2rem"}}>
        {messages.map(msg => (
          <li key={msg.id}>
            <strong>#{msg.id}</strong>: {msg.text} <em>({msg.created_at})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
