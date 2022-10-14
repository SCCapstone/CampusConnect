import { Modal, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
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

import { AuthContext } from './Firebase'
import auth from '@react-native-firebase/auth';

import styles from './loginStyles';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export function WelcomeScreen({navigation}) {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
 
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

  const [isModalVisible, setModalVisible] = React.useState(false);
  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };

 
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

      <TouchableOpacity onPress= {() => LoginAlert({email})} style={styles.loginBtn}>
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
  const [modalVisible, setModalVisible] = React.useState(false);

  function register () {
    Firebase.registerAccount(email,password)
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
          onChangeText={(password2) => setPassword2(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={register(email,password)} style={styles.loginBtn}>
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