//This code was modeled from this page https://code.tutsplus.com/tutorials/common-react-native-app-layouts-login-page--cms-27639
//Everything else in this app is original.

import {Modal, StatusBar, SafeAreaView, Platform} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert} from 'react-native';
//import Parse from 'parse/react-native';
import {useChatClient} from './useChatClient';

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

export function WelcomeScreen({navigation}) {
  const userData = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  var transactionStarted = false;

  // Handle user state changes
  function onAuthStateChanged(user) {
    firstLogin = false;
    setUser(user);

    if (initializing) setInitializing(false);

    if (auth().currentUser) {
      if (!transactionStarted) {
        transactionStarted = true;
        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .get()
          .then(userData => {
            firstLogin = userData.get('firstLogin');

            //If this variable doesn't exist for whatever reason, then firstLogin is true. Just in case.
            if (userData.get('firstLogin') == undefined) {
              firstLogin = true;
            }

            if (auth().currentUser && firstLogin) {
              transactionStarted = false;
              navigation.reset({
                index: 0,
                routes: [{name: 'RegistrationScreen'}],
              });
            } else if (auth().currentUser && !firstLogin) {
              //Not first login also implies the user has fully registered.

              transactionStarted = false;

              navigation.reset({
                index: 0,
                routes: [{name: 'LoadingScreen'}],
              });
            } else {
              transactionStarted = false;
            }
          })
          .catch(error => {
            FirebaseError(error.code);
          });
      }
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
    <LinearGradient colors={['#73000a', '#73000a', 'white']} style={styles.gradient}>
      <Image style={styles.imageLarge} source={require('./assets/logo.png')} />
      <Text testID="title" style={styles.title}>
        Campus Connect
      </Text>

      <TouchableOpacity
        testID="registerbtn"
        onPress={() => navigation.navigate('RegisterScreen')}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => NeedHelpError()} style={styles.helpBtn}>
        <Text style={styles.loginText}>Need help?</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>Copywright Ⓒ2023 DemBoyz, All rights reserved.</Text>
      </View>
    </LinearGradient>
  );
}

export function LoginScreen({navigation}) {
  const userData = useContext(AppContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account signed in!');
        })
        .catch(error => {
          FirebaseError(error.code);
        });
    } else {
      LoginError();
    }
  };

  return (
    <LinearGradient colors={['#73000a', '#73000a', 'white']} style={styles.gradient}>
      <BackButton />
      <Image style={styles.imageSmall} source={require('./assets/logo.png')} />
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
          onChangeText={email => setEmail(email.trim())}
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
          onChangeText={password => setPassword(password.trim())}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          if (email) {
            auth().sendPasswordResetEmail(email);
          }
          Alert.alert('Reset sent', 'A password reset link has been sent to "' + email + '"');
        }}
        testID="forgotpassword">
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => login(email, password)} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>Copywright Ⓒ2023 DemBoyz, All rights reserved.</Text>
      </View>
    </LinearGradient>
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
      email.split('@').length == 2 &&
      email.split('@')[1].includes('sc.edu') &&
      email.split('@')[1].substring(email.split('@')[1].length - 6) === 'sc.edu'
    ) {
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
    /*await Parse.User.signUp(email, 'password', {
      email: email,
    }).then(async (createdUser) => {
      EmailAlert();
    })

    await Parse.User.logOut();*/

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
    <LinearGradient colors={['#73000a', '#73000a', 'white']} style={styles.gradient}>
      <BackButton />
      <Image style={styles.imageSmall} source={require('./assets/logo.png')} />
      <Text style={styles.title}>Campus Connect</Text>
      <View style={styles.inputView}>
        <TextInput
          testID="emailinput"
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
          testID="passinput"
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
          testID="passinput2"
          style={styles.TextInput}
          placeholder="Confirm Password"
          textContentType={'newPassword'}
          autoComplete={'password-new'}
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={password2 => setPassword2(password2)}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          if (email) {
            auth().sendPasswordResetEmail(email);
          }
          Alert.alert('Reset sent', 'A password reset link has been sent to "' + email + '"');
        }}
        testID="forgotpassword">
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="registerbtn" onPress={() => register(email, password)} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>Copywright Ⓒ2023 DemBoyz, All rights reserved.</Text>
      </View>
    </LinearGradient>
  );
}

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
      <ImageBackground style={styles.backButtonImage} source={require('./assets/back_arrow.png')} />
    </TouchableOpacity>
  );
};

const LoginAlert = ({email}) => {
  Alert.alert('Logged in!', 'Successfully logged in ' + email, [{text: 'OK'}]);
};
const RegisterAlert = ({email}) => {
  Alert.alert('Registered!', 'Successfully registered ' + email, [{text: 'OK'}]);
};

const RegisterError = () => {
  Alert.alert('Invalid format', 'Make sure passwords are the same and a valid USC email was entered.', [{text: 'OK'}]);
};

const FirebaseError = error => {
  Alert.alert('Error', error, [{text: 'OK'}]);
};
const EmailAlert = () => {
  Alert.alert('Email Sent', "Email verifications are disabled for the time being. Don't be a *******", [{text: 'OK'}]);
};

const LoginError = () => {
  Alert.alert('Invalid format', 'Make sure email and password field are not empty.', [{text: 'OK'}]);
};
const NeedHelpError = () => {
  Alert.alert('Need Help?', 'Please contact support at \n\ndemboyz.sc@gmail.com for help.', [{text: 'OK'}]);
};
const CometChatError = () => {
  Alert.alert('There was a problem.', 'Please contact support at \n\ndemboyz.sc@gmail.com for help.', [{text: 'OK'}]);
};
