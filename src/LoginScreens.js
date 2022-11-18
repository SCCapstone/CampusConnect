import { Modal, StatusBar } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './loginStyles';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export function WelcomeScreen({navigation}) {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    firstLogin = false;
    setUser(user);
    if (initializing) setInitializing(false);
    if (auth().currentUser) {
      const userData = await firestore().collection('Users').doc(auth().currentUser.uid).get().catch(error => {
        FirebaseError(error.code);
      });
      firstLogin = userData.get("firstLogin");
    }
    if (auth().currentUser && firstLogin) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingScreen' }]
   });
    }
    else if (auth().currentUser && !firstLogin) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }]
   });
    }
    console.log('hello');
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
 
  return (
    <View style={styles.container}>
      <Image style={styles.imageLarge} source={require("./assets/gamecock.png")} />
      <Text style= {styles.title}>Campus Connect</Text>

      <TouchableOpacity onPress={ () => navigation.navigate('RegisterScreen')} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => navigation.navigate('LoginScreen')} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>Copywright Ⓒ2022 DemBoyz</Text>
      </View>
    </View>
  );
}

 
export function LoginScreen({ navigation}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

  const redirect = async () => {
    firstLogin = false;
    if (auth().currentUser) {
      const userData = await firestore().collection('Users').doc(auth().currentUser.uid).get().catch(error => {
        FirebaseError(error.code);
      });
      firstLogin = userData.get("firstLogin");
    }
    if (auth().currentUser && firstLogin) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingScreen' }]
   });
    }
    else if (auth().currentUser && !firstLogin) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }]
   });
    }
  }

  const login = () => {
    if (email && password){
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
        LoginAlert({email})
        redirect();
      })
      .catch(error => {
        FirebaseError(error.code);
      });
    }
    else {
      LoginError();
    }
  }

  return (
    <View style={styles.container}>
      <BackButton/>
      <Image style={styles.imageSmall} source={require("./assets/gamecock.png")} />
      <Text style= {styles.title}>Campus Connect</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="USC Email"
          textContentType='username'
          autoCorrect = {false}
          autoCapitalize = {"none"}
          autoComplete = {"email"}
          placeholderTextColor="#000000"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          textContentType={"password"}
          autoComplete = {"password"}
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => navigation.navigate('RegisterScreen')} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress= {() => login(email,password)} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>Copywright Ⓒ2022 DemBoyz</Text>
      </View>
    </View>
  );
}

export function RegisterScreen({ navigation}){
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const register = () => {
    if (email && password && (password === password2)){
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        createUserData();
      })
      .catch(error => {
        FirebaseError(error.code);
      });
    }
    else {
      RegisterError();
    }
  }

  const createUserData = () => {
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
      navigation.navigate('OnboardingScreen')
      })
      .catch(error => {
        FirebaseError(error.code);
      });
  }

  /*const createUserData = () => {
    database()
      .ref('/users/' + auth().currentUser.uid)
      .set({
        email: email,
        firstLogin: true,
        name: 'No Name',
        major: 'None',
        gradYear: 0
  })
  .then(() => console.log('Data set.'));
  }*/

 
  return (
    <View style={styles.container}>
      <BackButton/>
      <Image style={styles.imageSmall} source={require("./assets/gamecock.png")} />
      <Text style= {styles.title}>Campus Connect</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="USC Email"
          textContentType='username'
          autoCorrect = {false}
          autoCapitalize = {"none"}
          autoComplete = {"email"}
          placeholderTextColor="#000000"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          textContentType={"newPassword"}
          autoComplete = {"password-new"}
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          textContentType={"newPassword"}
          autoComplete = {"password-new"}
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={(password2) => setPassword2(password2)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => register(email,password)} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text style={styles.copyWrightText}>Copywright Ⓒ2022 DemBoyz</Text>
      </View>
    </View>
  );
}



const BackButton = () => {
  const navigation = useNavigation();
  return (
      <TouchableOpacity style={styles.backButtonContainer} onPress={ () => navigation.goBack()}>
        <ImageBackground style={styles.backButtonImage} source={require("./assets/back_arrow.png")} />
      </TouchableOpacity>
  )
}

const LoginAlert = ({email}) => {
    Alert.alert('Logged in!', "Successfully logged in " + email, [
      { text: "OK"}
    ] );

}
const RegisterAlert = ({email}) => {
  Alert.alert('Registered!', "Successfully registered " + email, [
    { text: "OK"}
  ] );
}

const RegisterError = () => {
  Alert.alert('Invalid format', "Make sure passwords are the same and a valid email was entered.", [
    { text: "OK"}
  ] );
}

const FirebaseError = (error) => {
  Alert.alert('Error', error, [
    { text: "OK"}
  ] );
}

const LoginError = () => {
  Alert.alert('Invalid format', "Make sure email and password field are not empty.", [
    { text: "OK"}
  ] );
}