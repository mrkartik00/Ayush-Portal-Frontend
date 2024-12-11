import { useState } from "react";

export default function OwnerConnectPage() {
  const [selectedChat, setSelectedChat] = useState(null); // Track selected chat
  const [messages, setMessages] = useState([]); // Track messages for the chat
  const [newMessage, setNewMessage] = useState(""); // Input field for new message

  // Dummy data for chats
  const chats = [
    {
      id: 1,
      name: "STARTUP_1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiQfNQxQtzAKYTJWd9LseJAWiEHpX7yvrUQ&s",
    },
    {
      id: 2,
      name: "STARTUP_2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiQfNQxQtzAKYTJWd9LseJAWiEHpX7yvrUQ&s",
    },
    {
      id: 3,
      name: "STARTUP_3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiQfNQxQtzAKYTJWd9LseJAWiEHpX7yvrUQ&s",
    },
    {
      id: 4,
      name: "STARTUP_4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiQfNQxQtzAKYTJWd9LseJAWiEHpX7yvrUQ&s",
    },
    {
      id: 5,
      name: "STARTUP_5",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiQfNQxQtzAKYTJWd9LseJAWiEHpX7yvrUQ&s",
    },
    {
      id: 6,
      name: "STARTUP_6",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiQfNQxQtzAKYTJWd9LseJAWiEHpX7yvrUQ&s",
    },
    {
      id: 7,
      name: "STARTUP_7",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiQfNQxQtzAKYTJWd9LseJAWiEHpX7yvrUQ&s",
    },
    {
      id: 8,
      name: "STARTUP_8",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeiQfNQxQtzAKYTJWd9LseJAWiEHpX7yvrUQ&s",
    },
  ];

  // Handle selecting a chat
  const handleChatClick = (chat) => {
    setSelectedChat(chat.name);
    setMessages([
      { sender: "STARTUP", content: `Welcome to ${chat.name}'s chat!` },
    ]); // Example message
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "You", content: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-orange-50">
      {/* Main layout */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full md:max-w-xs bg-gradient-to-b bg-orange-500 text-white border-r border-orange-300">
          <h2 className="text-2xl font-bold mb-6 p-6 bg-orange-700">Chats</h2>
          <div className="space-y-2 px-4">
            {chats.map((chat) => (
              <button
                key={chat.id}
                className={`flex items-center w-full text-left py-1 px-4 rounded-lg transition ${
                  selectedChat === chat.name
                    ? "bg-orange-700 text-white shadow-lg"
                    : "bg-orange-300 hover:bg-orange-700 hover:shadow-md text-black font-mono"
                }`}
                onClick={() => handleChatClick(chat)}
              >
                {/* Chat Avatar */}
                <img
                  src={chat.image}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                {/* Chat Name */}
                <span>{chat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 bg-orange-200 shadow-md">
                <h3 className="text-xl md:text-2xl font-bold text-orange-800">
                  Chat with {selectedChat}
                </h3>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 bg-white overflow-y-auto">
                <div>
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-center mb-4 ${
                        msg.sender === "You" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "STARTUP" && (
                        <span className="mr-2 text-xl text-orange-500">💼</span>
                      )}
                      <p
                        className={`inline-block px-4 py-2 rounded-xl shadow ${
                          msg.sender === "You"
                            ? "bg-orange-500 text-white"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        <strong>{msg.sender}:</strong> {msg.content}
                      </p>
                      {msg.sender === "You" && (
                        <span className="ml-2 text-xl text-orange-500">👤</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-orange-300 bg-orange-100 shadow-md">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    className="flex-grow border border-orange-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-orange-600 text-lg md:text-xl">
              Select a chat to start messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
