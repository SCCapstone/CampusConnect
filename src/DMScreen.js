import {
    Channel,
    MessageList,
    MessageInput,
    ChannelAvatar
  } from 'stream-chat-react-native'; // Or stream-chat-expo


  import { useChatContext} from './ChatContext';
  
  
  export function DMScreen(props) {
    const { channel,setThread } = useChatContext();
  
    return (
        <Channel channel={channel}>
            <MessageList
                onThreadSelect={(message) => {
                if (channel?.id) {
                  setThread(message);
                  console.log('gello')
                  navigation.navigate('ThreadScreen');
                }
              }} />
            <MessageInput />
        </Channel>
    );
  };