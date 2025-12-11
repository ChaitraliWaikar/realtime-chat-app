import React, { useState } from "react";
import "./ChatInput.css";

function ChatInput({ onSendMessage, onTyping }) {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  //
  const handleSend = () => {
    if (message.trim() && username.trim()) {
      onSendMessage(message, username);        // Send message and username to parent
      setMessage("");                          // Clear message input after sending
    }
  };

// Handle Enter key press to send message 
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();                           // Prevent newline on Enter
      handleSend();                      
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);                // Update message state
    if (username.trim()) {
      onTyping(username);                  // Notify parent that user is typing
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="username-input"
        placeholder="Your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}     // Update username state
      />
      <input
        type="text"
         className="message-input"
        placeholder="Type a message..."
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="send-button"
        onClick={handleSend}
        disabled={!message.trim() || !username.trim()}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;