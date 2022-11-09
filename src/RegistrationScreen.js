import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Button, View, Image, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    ScrollView,
    Keyboard,
} from "react-native";

import styles from './loginStyles';
import regstyles from './registrationStyles';

export function RegistrationScreen({navigation}) {
    const [firstName, setFirstName] = React.useState("");
    const [middleName, setMiddleName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [gradDate, setGradDate] = React.useState('');
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [errortext, setErrortext] = React.useState("");
    const [
        registraionSuccess,
        setRegistraionSuccess
    ] = useState(false);

    /*const firstNameInputRef = React.createRef();
    const middleNameInputRef = React.createRef();
    const lastNameInputRef = React.createRef();
    const gradYearInputRef = React.createRef();
    const gradMonthInputRef = React.createRef();*/

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    if(auth().currentUser == null) {
        navigation.navigate('WelcomeScreen');
    }
    
    const completeReg = () => {
            /*if (email && password && (password === password2)){
              auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                console.log('User account created & signed in!');
                setRegistraionSuccess(true);
              })
              .catch(error => {
                FirebaseError(error.code);
              });
            }
            else {
              RegisterError();
            }*/
            setRegistraionSuccess(true);
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
              onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={regstyles.buttonTextStyle}>Go to Home Screen</Text>
            </TouchableOpacity>
          </View>
        );
      }

    return(
    <View style={regstyles.container}>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./assets/gamecock.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
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
              onChangeText={(FirstName) => setFirstName(FirstName)}
              placeholder="Enter First Name"
              placeholderTextColor="gray"
              blurOnSubmit={false}
            />
          </View>
          <View style={regstyles.SectionStyle}>
            <TextInput
              style={regstyles.inputStyle}
              onChangeText={(LastName) => setLastName(LastName)}
              placeholder="Enter Last Name"
              placeholderTextColor="gray"
              blurOnSubmit={false}
            />
          </View>
          <View style={regstyles.SectionStyle}>
            <TextInput
              style={regstyles.inputStyle}
              onChangeText={(GradDate) => setGradDate(GradDate)}
              placeholder="Enter Graduation Date (__/____)"
              placeholderTextColor="gray"
              keyboardType="numeric"
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? ( <Text 
          style ={regstyles.errorStyle}> {errortext}
          </Text> ) : null}
          <TouchableOpacity
            style={regstyles.buttonStyle}
            onPress={completeReg}>
            <Text style = {regstyles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={regstyles.bottomContainer}>
            <Text style={regstyles.copyWrightText}>Copywright Ⓒ2022 DemBoyz</Text>
      </View>
    </View>
  );
};
const RegisterError = () => {
    Alert.alert('Invalid format', "Make sure passwords are the same and a valid email was entered.", [
      { text: "OK"}
    ] );
}
const RegisterAlert = ({email}) => {
    Alert.alert('Registered!', "Successfully registered " + email, [
      { text: "OK"}
    ] );
  }