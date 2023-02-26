import {useState, useEffect, useContext} from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Text} from '@rneui/themed';

import {HeaderBackButton} from 'react-navigation-stack';
import {useChatContext} from './ChatContext';

import firestore from '@react-native-firebase/firestore';
import AppContext from './AppContext';
import FastImage from 'react-native-fast-image';
import {Button} from '@rneui/base';
import auth from '@react-native-firebase/auth';

import {StreamChat} from 'stream-chat';
import {chatApiKey} from '../chatConfig';
import { useChatClient } from './useChatClient';

import androidstyles from './styles/android/ChatStyles';
import iosstyles from './styles/ios/ChatStyles';

var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles; // do dark mode in here as well
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}

export function ProfileView({navigation}) {
  const userData = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState('');
  const {clientIsReady} = useChatClient();
  const {setChannel} = useChatContext();
  const chatClient = StreamChat.getInstance(chatApiKey);

  const getProfile = async () => {
    const ref = firestore().collection('Users').doc(userData.profileView);

    await ref
      .get()
      .then(data => {
        setProfileData({
          ...data.data(),
        });
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!profileData) {
      getProfile();
    }
    navigation.setOptions({
      headerTitle: 'Profile: ' + profileData.name,
      headerTintColor: '#ffffff',
      headerLeft: () => (
        <HeaderBackButton
          tintColor="white"
          onPress={() => {
            userData.setProfileView('');
            navigation.goBack();
          }}
        />
      ),
    });
  }, [profileData]); //I guess this tells react to update when these variables change?

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1}}
        color={'#73000a'}></ActivityIndicator>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/originals/35/d3/62/35d36295a6fab00525850c454d9e215d.jpg',
        }}>
        <FastImage
          defaultSource={require('./assets/blank2.jpeg')}
          style={styles.viewProfileImg}
          source={
            profileData.pfp
              ? {uri: profileData.pfp}
              : require('./assets/blank2.jpeg')
          }
        />
      </ImageBackground>
      <Text style={styles.viewNameText}>{profileData.name}</Text>
      <Text style={styles.viewMajorText}>
        {profileData.major} - {profileData.gradYear}
      </Text>
      <Text style={styles.viewBioText}>{profileData.bio}</Text>
      <View style={{alignItems: 'center'}}>
        {!(auth().currentUser.uid === userData.profileView) ? (
          <Button
            onPress={async () => {
              if(clientIsReady){
                const channel = chatClient.channel('messaging', {
                  members: [chatClient.user.id, userData.profileView],
                });

                await channel.watch();
                navigation.navigate('Chats', {
                  screen: 'DMScreen',
                  initial: false,
                  params: {channel: channel},
                });
              }
              else {
                Alert.alert('Whoops','There was an issue with the chat service. Please try again later.');
              }
            }}
            size="lg"
            title={'Message'}
            titleStyle={{color: 'white'}}
            color={'#73000A'}
            containerStyle={{width: 200, marginTop: 150, borderRadius: 10}}
            style={{}}></Button>
        ) : null}
      </View>
    </SafeAreaView>
  );
}