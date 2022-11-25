import * as React from 'react';
import { useState, useEffect, useContext, Component, Fragment } from 'react';
import { Button, View, Image, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import storage from "@react-native-firebase/storage";
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';
import ImagePicker from 'react-native-image-crop-picker';

import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    ScrollView,
    Keyboard,
    ActivityIndicator
} from "react-native";

import AppContext from './AppContext';

import regstyles from './registrationStyles';

export function RegistrationScreen({navigation}) {  
    const userData = useContext(AppContext);
    const [bio, setBio] = React.useState("");
    const [username, setUserName] = React.useState(userData.username);
    var url = "";
    const [registraionSuccess,setRegistraionSuccess ] = useState(false);


    const [loading, setLoading] = useState(false); // Set loading to true on component mount
    

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [image, setImage] = React.useState('');


    const onMajorOpen = React.useCallback(() => {
      setOpen2(false);
    }, []);
  
    const onYearOpen = React.useCallback(() => {
      setOpen(false);
    }, []);

    const choosePhotoFromLibrary = async () => {
      await ImagePicker.openPicker({
        width: 300,
        height: 300,
        mediaType:'photo'
        /*cropping: true*/
      }).then(image => {
        console.log(image);
        setImage(image.path)
      });
    }
  
    if(auth().currentUser == null) {
        navigation.navigate('WelcomeScreen');
    }


    const uploadPic = async () =>{
      const reference = storage().ref(auth().currentUser.uid);
      if (image) {
        await reference.putFile(image).catch(error => {
        FirebaseError(error.code);
      });
      url = await reference.getDownloadURL();
      }

    }

    const writeUserData = async () =>{
      setLoading(true)
      const bioLengthValid = bio.length <= 150;
      const userNameValid = username.length <= 25;
      if (userNameValid &&username && bio && bioLengthValid && image) {
        await uploadPic();
        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          username:username,
          firstLogin: false,
          bio: bio,
          pfp: url
        }).then(() => {
          setRegistraionSuccess(true);
        })
      }
      else if (userNameValid &&username && bioLengthValid && image) {

        await uploadPic();

        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          username: username,
          firstLogin: false,
          pfp: url
        }).then(() => {
          setRegistraionSuccess(true);
        })
      }
      else if (userNameValid && username && bio && bioLengthValid) {
        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          username: username,
          firstLogin: false,
          bio: bio
        }).then(() => {
          setRegistraionSuccess(true);
        })
      }
      else if(userNameValid &&username && bioLengthValid) {
        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          username:username,
          major: major,
          firstLogin: false,
        }).then(() => {
          setRegistraionSuccess(true);
        })
      }
      else {
        RegisterError();
      }
      setLoading(false);
    }


    const reset = () => {
      url = "";
      setUserName("")
      setBio("")
      setImage("")
      setRegistraionSuccess(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }]
   });
    }

    if (registraionSuccess) {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: '#a9a9a9',
              justifyContent: 'center',
            }}>
            <Image
              source={require('./assets/checkmark.png')}
              style={{
                height: 150,
                resizeMode: 'contain',
                alignSelf: 'center'
              }}
            />
            <Text style={regstyles.textStyle}>
              Registration Successful
            </Text>
            <TouchableOpacity
              style={regstyles.buttonStyle}
              onPress={() => reset()
              }>
              <Text style={regstyles.buttonTextStyle}>Finish</Text>
            </TouchableOpacity>
          </View>
        );
      }

      if (loading) {
        return (
          <View style={[regstyles.activityContainer, regstyles.horizontal]}>
            <ActivityIndicator size="large" />
          </View>
        )
      }

    return(
    <SafeAreaView style={regstyles.container}>
    <ScrollView nestedScrollEnabled={true}>
    <View style={regstyles.container}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./assets/gamecock.png')}
            style={{
              height: 75,
              width: 75,
              margin: 10,
            }}
          />
        </View>
        <Text style={regstyles.textStyle}>
            Now we just need some info
        </Text>
        <KeyboardAvoidingView enabled>
        <View style={regstyles.SectionStyle}>
            <TextInput
              style={regstyles.inputStyle}
              onChangeText={(username) => setUserName(username)}
              autoCapitalize="none"
              placeholder='Enter a username (25 characters max)'
              autoComplete='off'
              multiline={true}
              autoCorrect={false}
              placeholderTextColor="gray"
              blurOnSubmit={false}
            />
          </View>
          <View style={regstyles.bioSectionStyle}>
            <TextInput
              style={regstyles.bioStyle}
              onChangeText={(bio) => setBio(bio)}
              placeholder="Enter a short Bio (optional) (150 characters max)"
              placeholderTextColor="gray"
              autoCapitalize="none"
              blurOnSubmit={false}
              multiline={true}
            />
          </View>
          
          <View style={regstyles.btnParentSection}>
            <TouchableOpacity onPress={choosePhotoFromLibrary} style={regstyles.btnSection}  >
              <Text style={regstyles.btnText}>{image ? 'Pic Loaded ✅' : 'Choose Photo From Library (optional)'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={regstyles.buttonStyle}
            onPress={writeUserData}>
            <Text style = {regstyles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      <View style={regstyles.bottomContainer}>
            <Text style={regstyles.copyWrightText}>Copywright Ⓒ2022 DemBoyz</Text>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const FirebaseError = (error) => {
  Alert.alert('Error', error, [
    { text: "OK"}
  ] );
}
const RegisterError = () => {
    Alert.alert('Error', "Make sure all required fields are filled out, bio is 150 characters or less, and username is 25 characters or less", [
      { text: "OK"}
    ] );
}
