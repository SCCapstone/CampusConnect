import * as React from 'react';
import {Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

import {PostsScreen} from './PostsScreen.js';
import {RegistrationScreen} from './RegistrationScreen.js';
import {EventsScreen} from './EventsScreen.js';
import {GroupsScreen} from './GroupsScreen.js';
import {Chat} from './Chat.js';
import {CreateGroup} from './CreateGroup.js';
import {Message} from './Message.js';

import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';

import {DrawerContent} from './DrawerContent.js';
import auth from '@react-native-firebase/auth';

import androidscreenOptions from './styles/android/HomeScreenStyles';
import iosscreenOptions from './styles/ios/HomeScreenStyles';

var screenOptions;

if (Platform.OS === 'ios') {
  screenOptions = iosscreenOptions;
} else if (Platform.OS === 'android') {
  screenOptions = androidscreenOptions;
}

const Drawer = createDrawerNavigator();
export function HomeScreen({navigation}) {
  if (!auth().currentUser) {
    navigation.reset({
      index: 0,
      routes: [{name: 'WelcomeScreen'}],
    });
  }
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={screenOptions}>
      <Drawer.Screen
        name="Home"
        component={PostsScreen}
        options={{headerTitle: 'Campus Connect: Posts'}}
      />
      <Drawer.Screen
        name="Events"
        component={EventsScreen}
        options={{headerTitle: 'Campus Connect: Events'}}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={RegistrationScreen}
        options={{headerTitle: 'Campus Connect: Edit Profile'}}
      />
      <Drawer.Screen
        name="Chats"
        component={Chat}
        options={{headerTitle: 'Campus Connect: Chats'}}
      />
      <Drawer.Screen
        name="Create Group"
        component={CreateGroup}
        options={{
          headerTitle: 'Create Group Chat',
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Message"
        component={Message}
        options={{
          headerTitle: 'Currently Chatting',
          drawerItemStyle: {height: 0},
        }}
      />
    </Drawer.Navigator>
  );
}
