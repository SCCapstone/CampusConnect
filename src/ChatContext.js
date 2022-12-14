// ChatContext.js

import React, { useState } from 'react';

export const ChatContext = React.createContext({
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
  key:0,
  setKey: (key) =>{},
});

export const ChatProvider = ({ children }) => {
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();
  const [key, setKey] = useState(0);

  return <ChatContext.Provider value={{ channel, setChannel, thread, setThread,key,setKey }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => React.useContext(ChatContext);
