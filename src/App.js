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
import { HomeScreen } from './HomeScreen.js';
import { EventScreen } from './EventScreen.js';
import { ClassesScreen } from './ClassesScreen.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProfileScreen } from './ProfileScreen.js';
import { AddPostScreen } from './AddPostScreen.js';

import { DrawerContent } from './DrawerContent.js';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function Root() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerTintColor: '#ffffff',
        headerStyle: {backgroundColor: '#73000a'},
        headerColor: '#73000a',  
        drawerActiveBackgroundColor: '#73000a',
        drawerActiveTintColor: 'white'
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="View Profile" component={ProfileScreen} />
      <Drawer.Screen name="Classes" component={ClassesScreen} />
      <Drawer.Screen name="Event" component={EventScreen} />
      <Drawer.Screen name="Add Post" component={AddPostScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Root"
            component={Root}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="ClassesScreen"
            component={ClassesScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="AddPostScreen"
            component={AddPostScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
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
          name="EventScreen"
          component={EventScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}