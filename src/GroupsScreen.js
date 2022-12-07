import { ChatProvider } from "./ChatContext";
import { SafeAreaView , View} from "react-native";
import {useState, useContext,useRef} from 'react'

import {
    ChannelList,
    ChannelsContext,
  } from 'stream-chat-react-native';

import { chatApiKey } from '../chatConfig';
import auth from '@react-native-firebase/auth';

import { useChatContext } from './ChatContext';
import {FloatingAction} from 'react-native-floating-action';


import { GestureHandlerRootView } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';

export function GroupsScreen(props) {

//This page shouls have all the functionality for adding a group. And searching for pre-existing ones.

    const { setChannel } = useChatContext();
    const navigation = useNavigation();
    const { channels, refreshList, reloadList} = useContext(ChannelsContext);



    //Right here, create a query that only returns the groups the user is currently in.
    const filters = {
      $and: [
        {type:'team'},
        {members: {
          '$in': [auth().currentUser.uid]
        }}
        ]
      };

      const sort = {
        last_message_at: -1,
      };

    return(

        <GestureHandlerRootView style={{ flex: 1}}>
            <View style={{ flex: 1}}>
              <ChannelList filters={filters}
                onSelect={(channel) => {
                    setChannel(channel);
                    navigation.navigate('DM');
                }}
              />
              <FloatingAction
                color="#73000a"
                ref={(ref) => { this.floatingAction = ref; }}
                onOpen={this.floatingAction.animateButton}
                onPressMain={() => {navigation.navigate('Groups-Create')
                }}
              />
            </View>

        </GestureHandlerRootView>
    )
}