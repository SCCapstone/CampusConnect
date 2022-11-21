import * as React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { PostsScreen } from './PostsScreen.js';
import { RegistrationScreen } from './RegistrationScreen.js';
import { EventsScreen } from './EventsScreen.js'

import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './DrawerContent.js';


const Drawer = createDrawerNavigator();
export function HomeScreen({navigation}) {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
    screenOptions={{
      headerTintColor: '#ffffff',
      headerStyle: {backgroundColor: '#73000a'},
      headerColor: '#73000a',  
      drawerActiveBackgroundColor: '#73000a',
      drawerActiveTintColor: 'white',
      swipeEdgeWidth: 150
    }}>
        <Drawer.Screen name="Home" component={PostsScreen} options={{headerTitle:'Campus Connect: Posts'}}/>
        <Drawer.Screen name="Events" component={EventsScreen} options={{headerTitle:'Campus Connect: Events'}}/>
        <Drawer.Screen name="Edit Profile" component={RegistrationScreen} options={{headerTitle:'Campus Connect: Edit Profile'}}/>
      </Drawer.Navigator>
  );
}