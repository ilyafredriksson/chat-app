import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hej från ilja123!!", user: "ilja123", avatar: "https://i.pravatar.cc/50?img=1" },
    { id: 2, text: "Testar ännu en gång", user: "ilja123", avatar: "https://i.pravatar.cc/50?img=2" },
    { id: 3, text: "Hallå! Jag är en annan användare ", user: "guest", avatar: "https://i.pravatar.cc/50?img=5" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const currentUser = "ilja123"; // Mocka inloggad användare

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      { id: Date.now(), text: newMessage, user: currentUser, avatar: "https://i.pravatar.cc/50?img=3" },
    ]);
    setNewMessage("");
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">💬 Chat Room</h1>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2 scrollbar-thin scrollbar-thumb-gray-300">
          {messages.map((m) => {
            const isOwnMessage = m.user === currentUser;
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                {!isOwnMessage && (
                  <img src={m.avatar} className="w-10 h-10 rounded-full border" alt="avatar" />
                )}
                <div className="flex flex-col max-w-xs">
                  <span className="font-semibold text-sm text-gray-600">
                    {isOwnMessage ? "Du" : m.user}
                  </span>
                  <p
                    className={`px-4 py-2 rounded-lg shadow ${
                      isOwnMessage
                        ? "bg-blue-600 text-white self-end"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {m.text}
                  </p>
                  {isOwnMessage && (
                    <button
                      onClick={() => deleteMessage(m.id)}
                      className="text-xs text-red-500 mt-1 hover:underline self-end"
                    >
                      Radera
                    </button>
                  )}
                </div>
                {isOwnMessage && (
                  <img src={m.avatar} className="w-10 h-10 rounded-full border" alt="avatar" />
                )}
              </div>
            );
          })}
        </div>

        {/* Input box */}
        <div className="flex gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Skriv ditt meddelande..."
            className="flex-1 resize-none p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow"
          >
            Skicka
          </button>
        </div>
      </div>
    </div>
  );
}
