import {
    Channel,
    MessageList,
    MessageInput,
  } from 'stream-chat-react-native'; // Or stream-chat-expo
  import {FlashList} from '@shopify/flash-list';


  import { useChatContext} from './ChatContext';
  import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native';
  
  
  export function DMScreen(props) {
    const { channel,setThread } = useChatContext();
    const navigation = useNavigation();   
  
    return (
        <Channel channel={channel}>
            <MessageList
                onThreadSelect={(message) => {
                if (channel?.id) {
                  setThread(message);
                  navigation.navigate('ThreadScreen');
                }
              }} />
            <MessageInput />
        </Channel>
    );
  };