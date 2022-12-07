import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { DM } from './DM.js';
import {ChatsScreen} from './ChatsScreen.js'
import { SearchUsers } from './SearchUsers.js';
import { ChatProvider } from "./ChatContext";


import {
  OverlayProvider, Chat, Search
} from 'stream-chat-react-native'; // Or stream-chat-expo


import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../chatConfig';

import { useChatClient } from './useChatClient';


import {
    ChannelList,
    ChannelAvatar
  } from 'stream-chat-react-native';
  import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();


//The top level stack navigaor for chats. I don't think this needs to be changed much anymore....

export const ChatNavigator = () => {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>
  }

  const chatClient = StreamChat.getInstance(chatApiKey);


  
  return (
  <ChatProvider>
    <Chat client={chatClient}>
      <Stack.Navigator>
        <Stack.Screen name="ChatsHome" component={ChatsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SearchUsers" component={SearchUsers} options={{headerShown: false}}/>
        <Stack.Screen name="DM" component={DM} options={{headerShown: false}}/>
      </Stack.Navigator>
    </Chat>
  </ChatProvider>

  );
};
