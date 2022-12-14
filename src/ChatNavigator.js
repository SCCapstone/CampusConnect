import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';

import { HeaderBackButton } from "@react-navigation/elements";

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { DMScreen } from './DMScreen.js';
import {ChatsScreen} from './ChatsScreen.js'
import { ChatSearch} from './ChatSearch.js';
import { ThreadScreen } from './ThreadScreen.js';
import { ChatProvider } from "./ChatContext";


import {
  OverlayProvider, Chat, Search
} from 'stream-chat-react-native'; // Or stream-chat-expo


import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../chatConfig';

import { useChatClient } from './useChatClient';
import { useChatContext } from './ChatContext';


import {
    ChannelList,
    ChannelAvatar
  } from 'stream-chat-react-native';
  import {useNavigation} from '@react-navigation/native';
import { CreateGroup } from './CreateGroup.js';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

import androidscreenOptions from './styles/android/ChatNavigatorOptions';
import iosscreenOptions from './styles/ios/ChatNavigatorOptions';

var screenOptions;

if (Platform.OS === 'ios') {
  screenOptions = iosscreenOptions;
} else if (Platform.OS === 'android') {
  screenOptions = androidscreenOptions;
}

darkMode = false;
//The top level stack navigaor for chats. I don't think this needs to be changed much anymore....

export const ChatNavigator = () => {
  const navigation = useNavigation();
  const { clientIsReady } = useChatClient();
  const {key,setKey} = useChatContext()

  if (!clientIsReady) {
    return <Text style={darkMode ? {color:'white',textAlign:'center',marginTop:150}:{color:'black',textAlign:'center',marginTop:150}}>Loading chat ...</Text>
  }


  const chatClient = StreamChat.getInstance(chatApiKey);



  
  return (

    <ChatProvider>
      <Chat client={chatClient}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="ChatsHome" component={ChatsScreen} options={{headerShown:true, headerLeft: () => (
        <HeaderBackButton tintColor='white' style={{marginLeft:0}} onPress={() => navigation.goBack()} />
      ),}}/>
          <Stack.Screen name="ChatSearch" component={ChatSearch} options={{headerShown: true}}/>
          <Stack.Screen name="CreateGroup" component={CreateGroup} options={{headerShown: true}}/>
          <Stack.Screen name="DMScreen" component={DMScreen} options={{headerShown: true}}/>
          <Stack.Screen name="ThreadScreen" component={ThreadScreen} options={{headerShown: true}}/>
        </Stack.Navigator>
      </Chat>
    </ChatProvider>

  );
};


