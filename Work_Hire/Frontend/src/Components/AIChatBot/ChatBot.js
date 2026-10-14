
import React, { useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import styles from './ChatBot.module.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello 👋 Welcome to WorkHire. How can I help you today?'
    }
  ]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      sender: 'user',
      text: message
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post('http://localhost:3050/api/ai/chat', {

        message
      });

      const botMessage = {
        sender: 'bot',
        text: res.data.reply
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = {
        sender: 'bot',
        text: '⚠️ AI unavailable right now.'
      };

      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <>
      {/* Floating Icon */}
      <div
        className={styles.chatIcon}
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatHeader}>
            AI Assistant 🤖
          </div>

          <div className={styles.chatBody}>
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                text={msg.text}
              />
            ))}
          </div>

          <ChatInput sendMessage={sendMessage} />
        </div>
      )}
    </>
  );
};

export default ChatBot;

