import * as React from 'react';
import {Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {useEffect, useContext, useState} from 'react';

import {SportsScreen} from './SportsScreen.js'
import {PostsScreen} from './PostsScreen.js';
import {EditProfileScreen} from './EditProfile';
import {EventsScreen} from './EventsScreen.js';
import {ClubsScreen} from './ClubsScreen';
import {ChatNavigator} from './ChatNavigator';
import {CreateGroup} from './CreateGroup.js';
import {Message} from './Message.js';
import { ChatProvider } from "./ChatContext";


import AppContext from './AppContext';

import SelectDropdown from 'react-native-select-dropdown'
import { useChatClient } from './useChatClient';
import firestore from '@react-native-firebase/firestore';


import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../chatConfig';

import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';

import {DrawerContent} from './DrawerContent.js';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import androidscreenOptions from './styles/android/HomeScreenStyles';
import iosscreenOptions from './styles/ios/HomeScreenStyles';
import { AlumniPostsScreen } from './AlumniPostsScreen.js';
import { Search } from './Search.js';

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
  const [loading,setLoading] = useState(true)

  const getUserData = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get()
      .then(data => {
        userData.setName(data.get('name'));
        userData.setEmail(data.get('email'));
        userData.setBio(data.get('bio'));
        userData.setMajor(data.get('major'));
        userData.setGradYear(data.get('gradYear'));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getPhoto = () => {
    storage()
      .ref(auth().currentUser.uid) //name in storage in firebase console
      .getDownloadURL()
      .then(url => {
        userData.setProfilePic(url);
        setLoading(false)
      })
      .catch(e => reset());
  };

  const reset = () => {
    setLoading(false)
    userData.setProfilePic('');
  };





  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) setInitializing(false);

    

    if (!auth().currentUser) {
      const chatClient = StreamChat.getInstance(chatApiKey);
      chatClient.disconnectUser();
      navigation.reset({
        index: 0,
        routes: [{name: 'WelcomeScreen'}],
      });
    }

  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getUserData();
    getPhoto();


    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing || loading) return null;


  return (

      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={screenOptions}>
        <Drawer.Screen
          name="Home"
          component={PostsScreen}
          initialParams={{
            sortingMode: 'Best',
            // Add any other initial params as needed
          }}
          options={({ navigation, route }) => ({
            headerTitle: (props) => <LogoTitle {...props} />,
            // Add a placeholder button without the `onPress` to avoid flicker
            headerRight: () => (
                <SelectDropdown
                  defaultButtonText='Sort'
                />
            ),
            headerTitle: 'Campus Connect: Posts'
          })}
        />
        <Drawer.Screen
          name="Events"
          component={EventsScreen}
          options={{headerTitle: 'Campus Connect: Events'}}
        />
        <Drawer.Screen
          name="Chats"
          component={ChatNavigator}
          options={{headerTitle: 'Campus Connect: Chats', headerShown:false}}
        />
        <Drawer.Screen
          name="Clubs"
          component={ClubsScreen}
          options={{headerTitle: 'Campus Connect: Clubs'}}
        />
        <Drawer.Screen
          name="Sports"
          component={SportsScreen}
          options={{headerTitle: 'Campus Connect: Sports'}}
        />
        <Drawer.Screen
          name="Alumni"
          component={AlumniPostsScreen}
          initialParams={{
            sortingMode: 'Best',
            // Add any other initial params as needed
          }}
          options={{
            headerTitle: 'Campus Connect: Alumni',
          }}/>
        <Drawer.Screen
          name="Search"
          component={Search}
          options={{
            headerTitle: 'Campus Connect: Search',
        }}/>
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
