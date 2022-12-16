import React, {useState,useEffect,useRef} from 'react';
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
import messaging from '@react-native-firebase/messaging'

import { useChatClient } from './useChatClient';
import { useChatContext } from './ChatContext';


import {
    ChannelList,
    ChannelAvatar
  } from 'stream-chat-react-native';
  import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { CreateGroup } from './CreateGroup.js';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import notifee, { EventType } from '@notifee/react-native';

const Stack = createNativeStackNavigator();
const navigationContainerRef = React.createRef<NavigationContainerRef>();

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
  const {key,setKey} = useChatContext()
  const [initialChannelId, setInitialChannelId] = useState('')
  const chatClient = StreamChat.getInstance(chatApiKey);
  //const [channelId,setInitialChannelId] = useState('');

  useEffect(() => {
    const unsubscribeOnNotificationOpen = messaging().onNotificationOpenedApp((remoteMessage) => {
      // Notification caused app to open from background state on iOS
      const channelId = remoteMessage.data?.channel_id;
      // The navigation logic, to navigate to relevant channel screen.
      if (channelId) {
        //navigation.navigate('DMScreen', { channelID:channelId });
      }
    });

    notifee.getInitialNotification().then(initialNotification => {
      if (initialNotification) {
        // Notification caused app to open from quit state on Android
        const channelId = initialNotification.notification.data?.channel_id;
        // Start the app with the relevant channel screen.
        setInitialChannelId(channelId)
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // Notification caused app to open from quit state on iOS
          const channelId = remoteMessage.data?.channel_id;
          // Start the app with the relevant channel screen.
          setInitialChannelId(channelId)
        }
    });
      // add listener to notifications received when on foreground
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    const message = await chatClient.getMessage(remoteMessage.data.id);

    // create the android channel to send the notification to
    const channelId = await notifee.createChannel({
      id: 'chat-messages',
      name: 'Chat Messages',
    });

    // display the notification
    const { stream, ...rest } = remoteMessage.data ?? {};
    const data = {
      ...rest,
      ...((stream as unknown as Record<string, string> | undefined) ?? {}), // extract and merge stream object if present
    };
    await notifee.displayNotification({
      title: 'New message from ' + message.message.user.name,
      body: message.message.text,
      data,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  });

  // add listener to user interactions on foreground notifications
  const unsubscribeForegroundEvent = notifee.onForegroundEvent(({ detail, type }) => {
    if (type === EventType.PRESS) {
      // user has pressed notification
      const channelId = detail.notification?.data?.channel_id;
      // The navigation logic, to navigate to relevant channel screen.
      if (channelId) {
        console.log(channelId)
        //navigation.navigate('DMScreen', { channelID:channelId });
      }
    }
  });
  notifee.onBackgroundEvent(async ({ detail, type }) => {
    if (type === EventType.PRESS) {
      // user press on notification detected while app was on background on Android
      const channelId = detail.notification?.data?.channel_id;
      if (channelId) {
        //navigation.navigate('DMScreen', { channelID:channelId });
      }
      await Promise.resolve();
    }
  });


    return () => {
      unsubscribeOnNotificationOpen();
    };
  }, []);


  /*if (!clientIsReady) {
    return <Text style={darkMode ? {color:'white',textAlign:'center',marginTop:150}:{color:'black',textAlign:'center',marginTop:150}}>Loading chat ...</Text>
  }*/






  
  return (

    <ChatProvider>
      <Chat client={chatClient}>
        <Stack.Navigator id='ChatNavigator' screenOptions={screenOptions}>
          <Stack.Screen name="ChatsHome" component={ChatsScreen} options={{headerShown:true, headerLeft: () => (
        <HeaderBackButton tintColor='white' style={{marginLeft:0}} onPress={() => navigation.goBack()} />
      ),}}/>
          <Stack.Screen name="ChatSearch" component={ChatSearch} options={{headerShown: true}}/>
          <Stack.Screen name="CreateGroup" component={CreateGroup} options={{headerShown: true}}/>
          <Stack.Screen name="DMScreen" 
          
          component={DMScreen} options={{ presentation:'modal',
          headerShown:true,headerLeft: () => (
        <HeaderBackButton tintColor='white' style={{marginLeft:0}} onPress={() => navigation.navigate('ChatsHome')} />
      ),}}/>
          <Stack.Screen name="ThreadScreen" component={ThreadScreen} options={{headerShown: true}}/>
        </Stack.Navigator>
      </Chat>
      </ChatProvider>


  );
};


