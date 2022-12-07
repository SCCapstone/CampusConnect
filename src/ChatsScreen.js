import { ChatProvider } from "./ChatContext";
import {useContext, useRef} from 'react'
import { SafeAreaView ,View,TouchableOpacity, Text} from "react-native";

import {
    ChannelList,
    ChannelsContext,
    ChannelAvatar
  } from 'stream-chat-react-native';

import { chatApiKey } from '../chatConfig';
import auth from '@react-native-firebase/auth';
import {FloatingAction} from 'react-native-floating-action';

import { useChatContext } from './ChatContext';


import { GestureHandlerRootView } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';

export function ChatsScreen(props) {

///This page shouls have all the functionality for adding a creating a DM. And searching for users.

    const { setChannel } = useChatContext();
    const navigation = useNavigation();   
    const { channels, refreshList, reloadList} = useContext(ChannelsContext);
    const flatListRef = useRef();


    //Right here, create a query that will only return the private DMs a User is in
    const filters = {
      $and: [
        {type:'messaging'},
        {members: {
          '$in': [auth().currentUser.uid]
        }},
        ]
      };
      const sort = {
        last_message_at: -1,
      };

      //You can customize the persons display name and extra data like major if wanted
      const CustomPreviewTitle = ({ channel }) => (
        <Text>
          {channel.data.name}
        </Text>
      );


    return(
        <GestureHandlerRootView style={{ flex: 1}}>
            <View style={{ flex: 1}}>
              <ChannelList 
                  PreviewTitle={CustomPreviewTitle}
                  filters={filters} 
                  
                  onSelect={(channel) => {
                      setChannel(channel);
                      navigation.navigate('DM');
                  }}
                  />
              <FloatingAction
                color="#73000a"
                onOpen={this.floatingAction.animateButton}
                ref={ref => {
                  this.floatingAction = ref;
                }}
                onPressMain={() => {navigation.navigate('SearchUsers')
                }}
              />
            </View>

        </GestureHandlerRootView>
    )
}