
import React, { useState } from 'react';
import styles from './ChatBot.module.css';

const ChatInput = ({ sendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <div className={styles.chatInputContainer}>
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.chatInput}
      />

      <button
        onClick={handleSend}
        className={styles.sendButton}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;

