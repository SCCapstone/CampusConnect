import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import * as React from "react";
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {LoginScreen, RegisterScreen, WelcomeScreen} from './LoginScreens.js'
import { RegistrationScreen } from './RegistrationScreen.js';
import {HomeScreen} from './HomeScreen.js'
import {OnboardingScreen} from './Onboarding.js'

import AppContext from './AppContext';



const Stack = createNativeStackNavigator();

export default function App() {

  //gloval user variable
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [name, setName] = useState('');
  const [pfp, setProfilePic] = useState('');

  const userData = {
    bio: bio,
    email:email,
    major:major,
    gradYear:gradYear,
    name:name,
    pfp:pfp,
    setBio,
    setEmail,
    setMajor,
    setGradYear,
    setName,
    setProfilePic
  }


  return (
    <AppContext.Provider value={userData}>
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
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}