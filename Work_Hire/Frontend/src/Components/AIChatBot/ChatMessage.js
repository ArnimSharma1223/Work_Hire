
import React from 'react';
import styles from './ChatBot.module.css';

const ChatMessage = ({ sender, text }) => {
  return (
    <div
      className={
        sender === 'user'
          ? styles.userMessage
          : styles.botMessage
      }
    >
      {text}
    </div>
  );
};

export default ChatMessage;

