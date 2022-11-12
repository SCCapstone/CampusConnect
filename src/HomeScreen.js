import * as React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { PostsScreen } from './PostsScreen.js';

import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();
export function HomeScreen({navigation}) {

  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={PostsScreen} />
      </Drawer.Navigator>
  );
}