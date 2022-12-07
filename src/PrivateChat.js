import {
    Channel,
    MessageList,
    MessageInput,
  } from 'stream-chat-react-native'; // Or stream-chat-expo

  import { useChatContext } from './ChatContext';
  
  
  export function PrivateChat(props) {
    const { channel } = useChatContext();
  
    return (
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    );
  };