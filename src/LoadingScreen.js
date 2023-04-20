import React, {useEffect, useContext, useState} from 'react';
import {View, Image, StyleSheet,Animated, Easing} from 'react-native';
import AppContext from './AppContext';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export function LoadingScreen({navigation}) {
  const userData = useContext(AppContext);
  const [spinAnim] = useState(new Animated.Value(0));
  const startAnimation = () => {
    spinAnim.setValue(0);
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => startAnimation());
  };
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getUserData = async () => {
    await firestore()
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

  const getPhoto = async () => {
    return await storage()
      .ref('/Profile Pictures/' + auth().currentUser.uid) //name in storage in firebase console
      .getDownloadURL()
      .then(url => {
        userData.setProfilePic(url);
      })
      .catch(e => {
        userData.setProfilePic('');
      });
  };

  useEffect(() => {
    startAnimation();
    promises = [];

    promises.push(getUserData());
    promises.push(getPhoto());
    Promise.all(promises).then(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    });
  }, []);
  return (
    <View style={styles.container}>
       <Animated.Image
        style={{ ...styles.logo, transform: [{ rotate: spin }] }}
        source={require('./assets/logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#73000a',
  },
  logo: {
    width: 200, // Adjust the width and height of your logo
    height: 200,
    resizeMode: 'contain',
  },
});
