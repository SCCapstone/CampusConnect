import 'react-native-gesture-handler';
import * as React from 'react';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, RegisterScreen, WelcomeScreen} from './LoginScreens.js';
import {RegistrationScreen} from './RegistrationScreen.js';
import {HomeScreen} from './HomeScreen.js';
import AppContext from './AppContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

const Stack = createNativeStackNavigator();

export default function App() {

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
      <NavigationContainer>
        <GestureHandlerRootView>
          <OverlayProvider>
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
          </OverlayProvider>
       </GestureHandlerRootView>
      </NavigationContainer>
    </AppContext.Provider>

  );
}
