import {Modal, StatusBar, SafeAreaView, Platform} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Parse from 'parse/react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import iosstyles from './styles/ios/LoginScreenStyles';
import androidstyles from './styles/android/LoginScreenStyles';

var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles;
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import AppContext from './AppContext';

import {COMETCHAT_CONSTANTS} from '../env';
import {CometChat} from '@cometchat-pro/react-native-chat';

export function WelcomeScreen({navigation}) {
  const userData = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  // Handle user state changes
  function onAuthStateChanged(user) {

    firstLogin = false;
    setUser(user);

    if (initializing) setInitializing(false);

      if (auth().currentUser) {
        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .get()
          .then(userData => {
            firstLogin = userData.get('firstLogin')

            //If this variable doesn't exist for whatever reason, then firstLogin is true. Just in case.
            if (userData.get('firstLogin') == undefined){
              firstLogin = true
            }
            
            if (auth().currentUser && firstLogin) {
              navigation.reset({
                index: 0,
                routes: [{name: 'RegistrationScreen'}],
              });
            } else if (auth().currentUser && !firstLogin) { //Not first login also implies the user has fully registered.
              const cometChatLoggedUser = CometChat.login(
                auth().currentUser.uid,
                COMETCHAT_CONSTANTS.AUTH_KEY,
              ).then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeScreen'}],
                });
              }).catch(async (error) => {
                console.log(error);
                CometChatError();
                await auth().signOut();
                navigation.reset({
                  index: 0,
                  routes: [{name: 'WelcomeScreen'}],
                });
              });

            }
          })
          .catch(error => {
            FirebaseError(error.code);
          });
      }


  }

  useEffect(() => {
    userData.setName('');
    userData.setEmail('');
    userData.setMajor('');
    userData.setGradYear('');
    userData.setProfilePic('');
    userData.setBio('');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imageLarge}
        source={require('./assets/gamecock.png')}
      />
      <Text style={styles.title}>Campus Connect</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterScreen')}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>
          Copywright Ⓒ2022 DemBoyz, All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function LoginScreen({navigation}) {
  const userData = useContext(AppContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    if (email && password) {
      userData.setPassword(password)
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account signed in!');
          LoginAlert({email});
        })
        .catch(error => {
          FirebaseError(error.code);
        });
    } else {
      LoginError();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Image
        style={styles.imageSmall}
        source={require('./assets/gamecock.png')}
      />
      <Text style={styles.title}>Campus Connect</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="USC Email"
          textContentType="username"
          autoCorrect={false}
          autoCapitalize={'none'}
          autoComplete={'email'}
          placeholderTextColor="#000000"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          textContentType={'password'}
          autoComplete={'password'}
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterScreen')}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => login(email, password)}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>
          Copywright Ⓒ2022 DemBoyz, All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function RegisterScreen({navigation}) {

  const userData = useContext(AppContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const register = () => {
    if (
      email &&
      password &&
      password === password2 &&
      email.split('@').length > 1 &&
      email.split('@')[1].includes('sc.edu') &&
      email.split('@')[1].substring(email.split('@')[1].length - 6) === 'sc.edu') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          createUserData();
        })
        .catch(error => {
          FirebaseError(error.code);
        });
    } else {
      RegisterError();
    }
  };

  const createUserData = async () => {

    //Doing email verification with parse
    await Parse.User.signUp(email, password, {
      email: email,
    }).then(async (createdUser) => {
      EmailAlert();
    })

    await Parse.User.logOut();

    userData.setPassword(password)

    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .set({
        email: email,
        firstLogin: true,
        name: 'No Name',
        major: 'None',
        gradYear: 0,
        bio: '',
      })
      .then(() => {
        console.log('User added!');
      })
      .catch(error => {
        FirebaseError(error.code);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Image
        style={styles.imageSmall}
        source={require('./assets/gamecock.png')}
      />
      <Text style={styles.title}>Campus Connect</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="USC Email"
          textContentType="username"
          autoCorrect={false}
          autoCapitalize={'none'}
          autoComplete={'email'}
          placeholderTextColor="#000000"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          textContentType={'newPassword'}
          autoComplete={'password-new'}
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          textContentType={'newPassword'}
          autoComplete={'password-new'}
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={password2 => setPassword2(password2)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => register(email, password)}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>
          Copywright Ⓒ2022 DemBoyz, All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backButtonContainer}
      onPress={() => navigation.goBack()}>
      <ImageBackground
        style={styles.backButtonImage}
        source={require('./assets/back_arrow.png')}
      />
    </TouchableOpacity>
  );
};

const LoginAlert = ({email}) => {
  Alert.alert('Logged in!', 'Successfully logged in ' + email, [{text: 'OK'}]);
};
const RegisterAlert = ({email}) => {
  Alert.alert('Registered!', 'Successfully registered ' + email, [
    {text: 'OK'},
  ]);
};

const RegisterError = () => {
  Alert.alert(
    'Invalid format',
    'Make sure passwords are the same and a valid USC email was entered.',
    [{text: 'OK'}],
  );
};

const FirebaseError = (error) => {
  Alert.alert('Error', error, [{text: 'OK'}]);
};
const EmailAlert = () => {
  Alert.alert(
    'Email Sent',
    'A verication email has been sent to your USC email. You will have to click the link before the app will allow you to fully sign in.',
    [{text: 'OK'}],
  );
};

const LoginError = () => {
  Alert.alert(
    'Invalid format',
    'Make sure email and password field are not empty.',
    [{text: 'OK'}],
  );
};
const CometChatError = () => {
  Alert.alert(
    'There was a problem.',
    'Please contact supper at demboyz.sc@gmail.com for help.',
    [{text: 'OK'}],
  );
};