import { ChatProvider } from "./ChatContext";
import { SafeAreaView } from "react-native";

import {
    ChannelList,
    Search
  } from 'stream-chat-react-native';

import { chatApiKey } from '../chatConfig';
import auth from '@react-native-firebase/auth';

import { useChatContext } from './ChatContext';


import { GestureHandlerRootView } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';

export function Chats(props) {

//We need to customize this ui component and recreate all the things for adding groups and searching users....

    const { setChannel } = useChatContext();
    const navigation = useNavigation();

    const filters = {
        members: {
          '$in': [auth().currentUser.uid]
        },
      };

      const sort = {
        last_message_at: -1,
      };

    return(

        <GestureHandlerRootView style={{ flex: 1}}>
            <SafeAreaView style={{ flex: 1}}>
                    <ChannelList filters={filters} 
                        onSelect={(channel) => {
                            setChannel(channel);
                            navigation.navigate('PrivateChat');
                        }}
                        />
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}