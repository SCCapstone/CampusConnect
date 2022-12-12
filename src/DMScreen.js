import {View,Text} from 'react-native'
import {
    Channel,
    MessageList,
    MessageInput,
    MessageContext,
  } from 'stream-chat-react-native'; // Or stream-chat-expo
import { useHeaderHeight } from '@react-navigation/elements';


import { useChatContext} from './ChatContext';
import {useNavigation} from '@react-navigation/native';
import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../chatConfig';
  
  
  export function DMScreen(props) {
    const { channel,setThread ,thread} = useChatContext();
    const navigation = useNavigation();   
    const headerHeight = useHeaderHeight();
    const chatClient = StreamChat.getInstance(chatApiKey);
  
    //These props allow us to display the user's name with their
    return (
        <Channel channel={channel}
        keyboardVerticalOffset={headerHeight}
        deletedMessagesVisibilityType='never'
        thread={thread}>
          <MessageList></MessageList>
          <MessageInput></MessageInput>
        </Channel>
    );
  };