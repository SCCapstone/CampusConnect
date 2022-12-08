import {
    Thread,
    Channel
  } from 'stream-chat-react-native'; // Or stream-chat-expo

  import { useChatContext } from './ChatContext';

  export function ThreadScreen(props) {
    const { channel,thread } = useChatContext();
  
    return (
        <Channel channel={channel} thread={thread} threadList>
            <Thread />
        </Channel>
    );
  };