import {
    Channel,
    MessageList,
    MessageInput,
    ChannelAvatar
  } from 'stream-chat-react-native'; // Or stream-chat-expo


  import { useChatContext } from './ChatContext';
  
  
  export function DM(props) {
    const { channel } = useChatContext();
  
    return (
        <Channel channel={channel}>
            <MessageList />
            <MessageInput />
        </Channel>
    );
  };