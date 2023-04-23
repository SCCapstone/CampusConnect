// useChatClient.js

import {useEffect, useState, useContext, useRef} from 'react';
import {StreamChat} from 'stream-chat';
import {chatApiKey} from '../chatConfig';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';

import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import {compiledEmojis} from 'stream-chat-react-native';
import {set} from 'react-native-reanimated';

const chatClient = StreamChat.getInstance(chatApiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const userData = useContext(AppContext);
  var token;
  const unsubscribeTokenRefreshListenerRef = useRef();
  var user;

  if (auth().currentUser) {
    user = {
      id: auth().currentUser.uid,
      name: userData.name,
      image: userData.pfp,
    };
  }

  const getToken = async () => {
    var chatUserToken = '';
    await functions()
      .httpsCallable('ext-auth-chat-getStreamUserToken')()
      .then(token => {
        chatUserToken = token.data;
      })
      .catch(error => {
        console.log(error);
      });
    return chatUserToken;
  };
  // Request Push Notification permission from device.
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    if (auth().currentUser) {
      const registerBackround = () => {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          // You can also provide tokenProvider instead of static token
          // await client._setToken({ id: userId }, tokenProvider)
          chatClient._setToken(
            {
              id: auth().currentUser.uid,
              name: userData.name,
              image: userData.pfp,
            },
            token,
          );
          // handle the message
          const message = await chatClient.getMessage(remoteMessage.data.id);

          // create the android channel to send the notification to
          const channelId = await notifee.createChannel({
            id: 'chat-messages',
            name: 'Chat Messages',
          });

          // display the notification
          const {stream, ...rest} = remoteMessage.data ?? {};
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
              // add a press action to open the app on press
              pressAction: {
                id: 'default',
              },
            },
          });
        });
      };

      // Register FCM token with stream chat server.
      const registerPushToken = async () => {
        // unsubscribe any previous listener
        unsubscribeTokenRefreshListenerRef.current?.();
        const messagingToken = await messaging().getToken();
        const push_provider = 'firebase';
        const push_provider_name = 'CampusConnect'; // name an alias for your push provider (optional)
        chatClient.setLocalDevice({
          id: messagingToken,
          push_provider,
          // push_provider_name is meant for optional multiple providers support, see: https://getstream.io/chat/docs/react/push_providers_and_multi_bundle
          push_provider_name,
        });
        await AsyncStorage.setItem('@current_push_token', token);

        const removeOldToken = async () => {
          const oldToken = await AsyncStorage.getItem('@current_push_token');
          if (oldToken !== null) {
            await chatClient.removeDevice(oldToken);
          }
        };

        unsubscribeTokenRefreshListenerRef.current = messaging().onTokenRefresh(async newToken => {
          await Promise.all([
            removeOldToken(),
            chatClient.addDevice(newToken, push_provider, auth().currentUser.uid, push_provider_name),
            AsyncStorage.setItem('@current_push_token', newToken),
          ]);
        });
      };

      //Generate token here
      const setupClient = async () => {
        try {
          const chatUserToken = await getToken();
          token = chatUserToken;
          await requestPermission();
          await registerPushToken();
          await registerBackround();
          await chatClient.connectUser(user, chatUserToken).catch(error => {
            console.log(error);
          });
          setClientIsReady(true);

          // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
          // But in case you need the chat to load from offline storage first then you should render chat components
          // immediately after calling `connectUser()`.
          // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
        } catch (error) {
          if (error instanceof Error) {
            console.error(`An error occurred while connecting the user: ${error.message}`);
          }
        }
      };

      // If the chat client has a value in the field `userID`, a user is already connected
      // and we can skip trying to connect the user again.
      if (!chatClient.userID) {
        setupClient();
      } else {
        setClientIsReady(true);
      }

      return async () => {
        //await chatClient?.disconnectUser();
        //unsubscribeTokenRefreshListenerRef.current?.();
      };
    }
  }, []);

  return {
    clientIsReady,
  };
};
