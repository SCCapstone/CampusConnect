import React, {createContext, useState} from 'react';

const ChatContext = createContext();

export default function ChatComponent() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const chatData = {
    selectedConversation: selectedConversation,
    setSelectedConversation,
  };

  return (
    <ChatContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
      }}></ChatContext.Provider>
  );
}
