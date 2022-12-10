import 'react-native-gesture-handler';
import * as React from 'react';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, RegisterScreen, WelcomeScreen} from './LoginScreens.js';
import {RegistrationScreen} from './RegistrationScreen.js';
import {HomeScreen} from './HomeScreen.js';
import AppContext from './AppContext';
import { vw } from 'stream-chat-react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import type { DeepPartial, Theme } from 'stream-chat-react-native';

const Stack = createNativeStackNavigator();
const maxWidth = (vw(100) - 72)-120;

export default function App() {

  //Theme for chats
  const theme: DeepPartial<Theme> = {
    channelPreview: {
      container : {
        height:85,
      },
      contentContainer: { 
      },
      title: {
        fontSize:20
      },
      message: {
        fontSize:17,
        color:'black'
      },
    },
    channelListMessenger: {
      flatList: {
        padding:10
      }
    },
  };

  //initialitize parse for handling user verification
  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize('PRySkWPWEvW5AtgEPe0E9SZsvdG4zD7UUFh5eupR','Jh3wogXir5FhuLjBlGHl74amYu7VwbOG17n2McqU');
  Parse.serverURL = 'https://parseapi.back4app.com/';
  //gloval user variable
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('Not logged in');
  const [gradYear, setGradYear] = useState('2001');
  const [name, setName] = useState('Unknown Person');
  const [pfp, setProfilePic] = useState('');

  const userData = {
    bio: bio,
    email: email,
    major: major,
    gradYear: gradYear,
    name: name,
    pfp: pfp,
    setBio,
    setEmail,
    setMajor,
    setGradYear,
    setName,
    setProfilePic,
  };

  return (

    <AppContext.Provider value={userData}>
      <GestureHandlerRootView style={{flex:1}}>
        <OverlayProvider value={{style: theme}}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RegistrationScreen"
                component={RegistrationScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OverlayProvider>
      </GestureHandlerRootView>
    </AppContext.Provider>

  );
}