import * as React from 'react';
import {Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {useEffect, useContext, useState} from 'react';

import {SportsScreen} from './SportsScreen.js'
import {PostsScreen} from './PostsScreen.js';
import {EditProfileScreen} from './EditProfile';
import {EventsScreen} from './EventsScreen.js';
import {GroupsScreen} from './GroupsScreen.js';
import {Chat} from './Chat.js';
import {CreateGroup} from './CreateGroup.js';
import {Message} from './Message.js';

import AppContext from './AppContext';

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

  const userData = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) setInitializing(false);

    if (!auth().currentUser) {
      navigation.reset({
        index: 0,
        routes: [{name: 'WelcomeScreen'}],
      });
    }

  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;


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
        name="Groups"
        component={GroupsScreen}
        options={{headerTitle: 'Campus Connect: Groups'}}
      />
      <Drawer.Screen
        name="Sports"
        component={SportsScreen}
        options={{headerTitle: 'Campus Connect: Sports'}}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          headerTitle: 'Campus Connect: Edit Profile',
          drawerItemStyle: {height: 0},
        }}/>

    </Drawer.Navigator>
  );
}
