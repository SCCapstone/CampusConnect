import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {useEffect, useContext, useState} from 'react';

import {SportsScreen} from './SportsScreen.js';
import {PostsScreen} from './PostsScreen.js';
import {EditProfileScreen} from './EditProfile';
import {EventsScreen} from './EventsScreen.js';
import {ClubsScreen} from './ClubsScreen';
import {ChatNavigator} from './ChatNavigator';
import {CreateGroup} from './CreateGroup.js';
import {Message} from './Message.js';
import {ChatProvider} from './ChatContext';
import {useWindowDimensions} from 'react-native';

import AppContext from './AppContext';

import SelectDropdown from 'react-native-select-dropdown';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import {StreamChat} from 'stream-chat';
import {chatApiKey} from '../chatConfig';
import {useChatClient} from './useChatClient';

import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';

import {DrawerContent} from './DrawerContent.js';

import androidscreenOptions from './styles/android/HomeScreenStyles';
import iosscreenOptions from './styles/ios/HomeScreenStyles';
import {AlumniPostsScreen} from './AlumniPostsScreen.js';
import {Search} from './Search.js';

var screenOptions;

if (Platform.OS === 'ios') {
  screenOptions = iosscreenOptions;
} else if (Platform.OS === 'android') {
  screenOptions = androidscreenOptions;
}

const Drawer = createDrawerNavigator();
export function HomeScreen({navigation}) {
  
  //dynamically render the header based on the width of the user's screen.
  const windowWidth = useWindowDimensions().width;
  const fontSize = windowWidth < 410 ? 13 : 18; // Adjust the font size based on the screen width
  function PostTitle() {
    return <Text style={{fontSize: fontSize, color: 'white'}}>Campus Connect: Posts</Text>;
  }
  function AlumniTitle() {
    return <Text style={{fontSize: fontSize, color: 'white'}}>Campus Connect: Alumni</Text>;
  }
  function EditTitle() {
    return <Text style={{fontSize: fontSize, color: 'white'}}>Campus Connect: Edit Profile</Text>;
  }
  function ClubTitle() {
    return <Text style={{fontSize: fontSize, color: 'white'}}>Campus Connect: Clubs</Text>;
  }
  function SportsTitle() {
    return <Text style={{fontSize: fontSize, color: 'white'}}>Campus Connect: Sports</Text>;
  }
  function EventsTitle() {
    return <Text style={{fontSize: fontSize, color: 'white'}}>Campus Connect: Events</Text>;
  }
  function ChatTitle() {
    return <Text style={{fontSize: fontSize, color: 'white'}}>Campus Connect: Chats</Text>;
  }
  function SearchTitle() {
    return <Text style={{fontSize: fontSize, color: 'white'}}>Campus Connect: Search</Text>;
  }

  //state
  const [initializing, setInitializing] = useState(true);
  const {clientReady} = useChatClient();
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) setInitializing(false);

    if (!auth().currentUser) {
      try {
        const chatClient = StreamChat.getInstance(chatApiKey);
        chatClient.disconnectUser();
        navigation.reset({
          index: 0,
          routes: [{name: 'WelcomeScreen'}],
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  //launch our auth listener
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  //wait for the listener to spawn before showing anything
  if (initializing) return null;

  //renders the drawer and intitializes all the screens with their options
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={screenOptions}>
      <Drawer.Screen
        name="Home"
        component={PostsScreen}
        initialParams={{
          sortingMode: 'Best',
          // Add any other initial params as needed
        }}
        options={({navigation, route}) => ({
          headerTitle: props => <PostTitle {...props} />,
          // Add a placeholder button without the `onPress` to avoid flicker
          headerRight: () => <SelectDropdown defaultButtonText="Sort" />,
        })}
      />
      <Drawer.Screen
        name="Events"
        component={EventsScreen}
        options={({navigation, route}) => ({
          headerTitle: props => <EventsTitle {...props} />,
        })}
      />
      <Drawer.Screen
        name="Chats"
        component={ChatNavigator}
        options={{headerTitle: 'Campus Connect: Chats', headerShown: false}} //needs custom solution
      />
      <Drawer.Screen
        name="Clubs"
        component={ClubsScreen}
        options={({navigation, route}) => ({
          headerTitle: props => <ClubTitle {...props} />,
        })}
      />
      <Drawer.Screen
        name="Sports"
        component={SportsScreen}
        options={({navigation, route}) => ({
          headerTitle: props => <SportsTitle {...props} />,
        })}
      />
      <Drawer.Screen
        name="Alumni"
        component={AlumniPostsScreen}
        initialParams={{
          sortingMode: 'Best',
          // Add any other initial params as needed
        }}
        options={({navigation, route}) => ({
          headerTitle: props => <AlumniTitle {...props} />,
          // Add a placeholder button without the `onPress` to avoid flicker
          headerRight: () => <SelectDropdown defaultButtonText="Sort" />,
        })}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={({navigation, route}) => ({
          headerTitle: props => <SearchTitle {...props} />,
        })}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={({navigation, route}) => ({
          headerTitle: props => <EditTitle {...props} />,
          drawerItemStyle: {display: 'none'},
        })}
      />
    </Drawer.Navigator>
  );
}
