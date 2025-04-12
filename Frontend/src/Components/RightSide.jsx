import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const RightSide = () => {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState("user1"); // Toggle between users

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: currentUser }]);
      setInput(""); 
      setCurrentUser(currentUser === "user1" ? "user2" : "user1"); // Toggle sender
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[radial-gradient(circle,#f3e5ff_30%,#e0f9ff_60%)] shadow-2xl rounded-[5%] w-full max-w-md p-4">
      
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-700">Chat</h1>
      
      {/* Chat Box */}
      <div className="flex flex-col w-full h-[75vh] bg-white rounded-lg shadow-md p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`mb-2 p-2 rounded-lg max-w-xs ${msg.sender === "user1" ? "bg-blue-100 self-start" : "bg-green-200 self-end"}`}>
              <p className="text-sm font-semibold">{msg.sender === "user1" ? "User 1" : "User 2"}</p>
              {msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No messages yet...</p>
        )}
      </div>

      {/* Input Area */}
      <div className="flex w-full mt-4">
        <input
          type="text"
          className="w-full p-2 rounded-l-lg border border-gray-300 outline-none"
          placeholder={`Type a message (${currentUser})...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 flex items-center"
          onClick={sendMessage}
        >
          <FaPaperPlane className="mr-1" />
        </button>
      </div>
      
    </div>
  );
}

export default RightSide;

