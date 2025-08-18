import { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://chatify-api.up.railway.app/messages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data));
  }, []);

  const sendMessage = async () => {
    await axios.post(
      "https://chatify-api.up.railway.app/messages",
      { content: newMsg },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  };

  const deleteMessage = async (id) => {
    await axios.delete(`https://chatify-api.up.railway.app/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  return (
    <div style={{marginLeft:"200px"}}>
      <SideNav />
      <h2>Chat</h2>
      {messages.map((m) => (
        <div key={m.id} style={{ textAlign: m.userId === user.id ? "right" : "left" }}>
          <p>{m.content}</p>
          {m.userId === user.id && (
            <button onClick={() => deleteMessage(m.id)}>Delete</button>
          )}
        </div>
      ))}
      <input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
