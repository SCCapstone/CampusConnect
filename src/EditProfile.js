import * as React from 'react';
import {useState, useContext} from 'react';
import {View, Image, Text, TouchableOpacity, Linking, ImageBackground} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {majors, classes} from './consts/majors';

import {SafeAreaView, TextInput, KeyboardAvoidingView, Alert, ScrollView, ActivityIndicator} from 'react-native';

import AppContext from './AppContext';

import iosstyles from './styles/ios/EditProfileStyles';
import androidstyles from './styles/android/EditProfileStyles';
import LinearGradient from 'react-native-linear-gradient';

import {StreamChat} from 'stream-chat';
import {chatApiKey} from '../chatConfig';
import {useChatClient} from './useChatClient';

var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles;
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}
export function EditProfileScreen({navigation}) {
  const userData = useContext(AppContext);

  const [bio, setBio] = React.useState('');
  const [firstName, setFirstName] = React.useState(userData.name.split(' ')[0]);
  const [lastName, setLastName] = React.useState(userData.name.split(' ')[1]);
  const [gradDate, setGradDate] = React.useState(userData.gradYear);
  var url = '';
  const [registraionSuccess, setRegistraionSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Set loading to true on component mount

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [image, setImage] = React.useState('');

  const [major, setMajor] = useState(userData.major);

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
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {});
  };

  const uploadPic = async () => {
    const reference = storage().ref('/Profile Pictures/' + auth().currentUser.uid);
    try {
      if (image) {
        await reference.putFile(image).catch(error => {
          FirebaseError(error.code);
        });
        url = await reference.getDownloadURL();
        const chatClient = StreamChat.getInstance(chatApiKey);
        const update = {
          id: chatClient.user.id,
          set: {
            name: userData.name,
            image: url,
          },
        };
        await chatClient.partialUpdateUser(update);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const writeUserData = async () => {
    setLoading(true);
    const bioLengthValid = bio.length <= 150;

    var emailVerified = true;

    if (emailVerified) {
      if (firstName.trim() && lastName.trim() && major && gradDate && bio && bioLengthValid && image) {
        await uploadPic();

        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update({
            name: firstName.trim() + ' ' + lastName.trim(),
            major: major,
            firstLogin: false,
            gradYear: gradDate,
            bio: bio,
            pfp: url,
            searchName: firstName.trim().toUpperCase() + ' ' + lastName.trim().toUpperCase(),
          })
          .then(() => {
            setRegistraionSuccess(true);
          });
      } else if (firstName.trim() && lastName.trim() && major && gradDate && bioLengthValid && image) {
        await uploadPic();

        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update({
            name: firstName.trim() + ' ' + lastName.trim(),
            major: major,
            firstLogin: false,
            gradYear: gradDate,
            pfp: url,
            searchName: firstName.trim().toUpperCase() + ' ' + lastName.trim().toUpperCase(),
          })
          .then(() => {
            setRegistraionSuccess(true);
          });
      } else if (firstName.trim() && lastName.trim() && major && gradDate && bio && bioLengthValid) {
        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update({
            name: firstName.trim() + ' ' + lastName.trim(),
            major: major,
            firstLogin: false,
            gradYear: gradDate,
            bio: bio,
            searchName: firstName.trim().toUpperCase() + ' ' + lastName.trim().toUpperCase(),
          })
          .then(() => {
            setRegistraionSuccess(true);
          });
      } else if (firstName.trim() && lastName.trim() && major && gradDate && bioLengthValid) {
        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update({
            name: firstName.trim() + ' ' + lastName.trim(),
            major: major,
            firstLogin: false,
            gradYear: gradDate,
            searchName: firstName.trim().toUpperCase() + ' ' + lastName.trim().toUpperCase(),
          })
          .then(() => {
            setRegistraionSuccess(true);
          });
      } else {
        RegisterError();
      }
    } else {
      EmailAlert();
    }
    setLoading(false);
  };

  const reset = () => {
    url = '';
    setFirstName('');
    setLastName('');
    setGradDate('');
    setMajor('');
    setBio('');
    setImage('');
    setRegistraionSuccess(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'LoadingScreen'}],
    });
  };

  if (registraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <Image
          source={require('./assets/checkmark.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text style={styles.textStyle}>Your Profile Has Been Updated!</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => reset()}>
          <Text style={styles.buttonTextStyle}>Finish</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.activityContainer, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#73000a', '#73000a', 'white']} style={styles.container}>
      <TouchableOpacity onPress={choosePhotoFromLibrary} style={styles.blankImageBackgroundStyle}>
        {image ? (
          <Image style={styles.blankImageStyle} source={{uri: image}} />
        ) : userData.pfp ? (
          <Image style={styles.blankImageStyle} source={{uri: userData.pfp}} />
        ) : (
          <ImageBackground
            source={require('./assets/blank2.jpeg')}
            imageStyle={styles.blankImageStyle}
            style={styles.blankImageBackgroundStyle}>
            <Text style={styles.imageTextStyle}>Select an image from your library</Text>
          </ImageBackground>
        )}
      </TouchableOpacity>
      <Text style={styles.textStyle}>
        {firstName} {lastName}
      </Text>
      <KeyboardAvoidingView enabled>
        <View style={styles.SectionStyle}>
          <DropDownPicker
            style={styles.inputStyle}
            placeholder="Select Class"
            open={open2}
            onOpen={onYearOpen}
            value={gradDate}
            items={classes}
            dropDownDirection="TOP"
            setOpen={setOpen2}
            setValue={setGradDate}
            listMode="SCROLLVIEW"
          />
        </View>
        <View style={styles.SectionStyle}>
          <DropDownPicker
            style={styles.inputStyle}
            placeholder="Select Major (Required)"
            open={open}
            onOpen={onMajorOpen}
            value={major}
            items={majors}
            dropDownDirection="TOP"
            setOpen={setOpen}
            setValue={setMajor}
            listMode="MODAL"
          />
        </View>
        <View style={styles.bioSectionStyle}>
          <TextInput
            style={styles.bioStyle}
            onChangeText={bio => setBio(bio)}
            placeholder="Enter a short Bio (optional) (150 characters max)"
            defaultValue={userData.bio}
            placeholderTextColor="gray"
            blurOnSubmit={false}
          />
        </View>
        <TouchableOpacity style={styles.buttonUpdateStyle} onPress={writeUserData}>
          <Text style={styles.buttonTextStyle}>{!image ? 'UPDATE' : 'Press to update ✅'}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>Copywright Ⓒ2022 DemBoyz</Text>
      </View>
    </LinearGradient>
  );
}

const FirebaseError = error => {
  Alert.alert('Error', error, [{text: 'OK'}]);
};
const RegisterError = () => {
  Alert.alert('Error', 'Make sure all required fields are filled out and that the bio is less than 151 characters', [
    {text: 'OK'},
  ]);
};
