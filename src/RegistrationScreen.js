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
} from "react-native";

import regstyles from './registrationStyles';

export function RegistrationScreen({navigation}) {  
    const [bio, setBio] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [gradDate, setGradDate] = React.useState('');
    const [errortext, setErrortext] = React.useState("");
    var url = "";
    const [transferred, setTransferred] = useState(0);
    const [registraionSuccess,setRegistraionSuccess ] = useState(false);
    
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [image, setImage] = React.useState('');


    const onMajorOpen = React.useCallback(() => {
      setOpen2(false);
    }, []);
  
    const onYearOpen = React.useCallback(() => {
      setOpen(false);
    }, []);

    const [years, setYears] = useState([
      {label: '2022', value: '2022'},
      {label: '2023', value: '2023'},
      {label: '2024', value: '2024'},
      {label: '2025', value: '2025'},
      {label: '2026', value: '2026'},
      {label: '2027', value: '2027'},
      {label: '2028', value: '2028'},
      {label: '2029', value: '2029'},
      {label: '2030', value: '2030'},
      {label: '2031', value: '2031'},
    ]);

    const [major, setMajor] = useState(null);
    const [majors, setMajors] = useState([
      {label: 'Accounting', value: 'Accounting'},
      {label: 'Advertising', value: 'Advertising'},
      {label: 'African American Studies', value: 'African American Studies'},
      {label: 'Anthropology', value: 'Anthropology'},
      {label: 'Art Education', value: 'Art Education'},
      {label: 'Art History', value: 'Art History'},
      {label: 'Art Studio', value: 'Art Studio'},
      {label: 'Athletic Training', value: 'Athletic Training'},
      {label: 'Biochemistry and Molecular Biology', value: 'Biochemistry and Molecular Biology'},
      {label: 'Biological Sciences', value: 'Biological Sciences'},
      {label: 'Biomedical Sciences', value: 'Biomedical Sciences'},
      {label: 'Biostatistics', value: 'Biostatistics'},
      {label: 'Business Administration', value: 'Business Administration'},
      {label: 'Business Analytics', value: 'Business Analytics'},
      {label: 'Cardiovascular Technology', value: 'Cardiovascular Technology'},
      {label: 'Chemistry', value: 'Chemistry'},
      {label: 'Chinese Studies', value: 'Chinese Studies'},
      {label: 'Classics', value: 'Classics'},
      {label: 'Communication Sciences and Disorders', value: 'Communication Sciences and Disorders'},
      {label: 'Comparative Literature', value: 'Comparative Literature'},
      {label: 'Computer Science', value: 'Computer Science'},
      {label: 'Computer Engineering', value: 'Computer Engineering'},
      {label: 'Counseling / Counselor Education', value: 'Counseling / Counselor Education'},
      {label: 'Creative Writing', value: 'Creative Writing'},
      {label: 'Criminology and Criminal Justice', value: 'Criminology and Criminal Justice'},
      {label: 'Cyber Intelligence', value: 'Cyber Intelligence'},
      {label: 'Dance', value: 'Dance'},
      {label: 'Data and Communication', value: 'Data and Communication'},
      {label: 'Economics', value: 'Economics'},
      {label: 'Education: Early Childhood Education', value: 'Education: Early Childhood Education'},
      {label: 'Education: Elementary Education', value: 'Education: Elementary Education'},
      {label: 'Education: Language and Literacy', value: 'Education: Language and Literacy'},
      {label: 'Education: Learning Design and Technologies', value: 'Education: Learning Design and Technologies'},
      {label: 'Education: Middle Level Education', value: 'Education: Middle Level Education'},
      {label: 'Education: Physical Education', value: 'Education: Physical Education'},
      {label: 'Education: Secondary Education', value: 'Education: Secondary Education'},
      {label: 'Education: Special Education', value: 'Education: Special Education'},
      {label: 'Education: Teacher Education', value: 'Education: Teacher Education'},
      {label: 'Educational Administration and Higher Education', value: 'Educational Administration and Higher Education'},
      {label: 'Educational Practice and Innovation', value: 'Educational Practice and Innovation'},
      {label: 'Educational Psychology and Research', value: 'Educational Psychology and Research'},
      {label: 'Engineering: Aerospace Engineering', value: 'Engineering: Aerospace Engineering'},
      {label: 'Engineering: Biomedical Engineering', value: 'Engineering: Biomedical Engineering'},
      {label: 'Engineering: Chemical Engineering', value: 'Engineering: Chemical Engineering'},
      {label: 'Engineering: Civil Engineering', value: 'Engineering: Civil Engineering'},
      {label: 'Engineering: Electrical Engineering', value: 'Engineering: Electrical Engineering'},
      {label: 'Engineering: Engineering Management', value: 'Engineering: Engineering Management'},
      {label: 'Engineering: Mechanical Engineering', value: 'Engineering: Mechanical Engineering'},
      {label: 'Engineering: Nuclear Engineering', value: 'Engineering: Nuclear Engineering'},
      {label: 'Engineering: Technology Innovation and Entrepreneurial Engineering', value: 'Engineering: Technology Innovation and Entrepreneurial Engineering'},
      {label: 'English', value: 'English'},
      {label: 'Environmental Health Sciences', value: 'Environmental Health Sciences'},
      {label: 'Environmental Science / Environmental Studies', value: 'Environmental Science / Environmental Studies'},
      {label: 'Epidemiology', value: 'Epidemiology'},
      {label: 'Exercise Science', value: 'Exercise Science'},
      {label: 'Film and Media Studies', value: 'Film and Media Studies'},
      {label: 'Finance', value: 'Finance'},
      {label: 'Foreign Language', value: 'Foreign Language'},
      {label: 'French', value: 'French'},
      {label: 'Geography', value: 'Geography'},
      {label: 'Geological Sciences', value: 'Geological Sciences'},
      {label: 'German', value: 'German'},

    ]);



    const choosePhotoFromLibrary = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true
      }).then(image => {
        console.log(image);
        setImage(image.path)
      });
    }
  
    if(auth().currentUser == null) {
        navigation.navigate('WelcomeScreen');
    }

    const writeUserData = () =>{
      firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .update({
        name: firstName +" "+ lastName,
        major: major,
        bio: bio,
        firstLogin: false,
        gradYear: gradDate,
        pfp: url
      })
    }

    const completeReg = async () => {
      const reference = storage().ref(auth().currentUser.uid);
      await reference.putFile(image).catch(error => {
        FirebaseError(error.code);
      });
      url = await reference.getDownloadURL();
      writeUserData();
      setRegistraionSuccess(true);
    }

    const reset = () => {
      navigation.navigate('HomeScreen')
      setRegistraionSuccess(false);
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
              <Text style={regstyles.buttonTextStyle}>Go to Home Screen</Text>
            </TouchableOpacity>
          </View>
        );
      }

    return(
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
          <DropDownPicker
              style={regstyles.inputStyle}
              placeholder="Select Grad Year"
              open={open2}
              onOpen={onYearOpen}
              value={gradDate}
              items={years}
              dropDownDirection="TOP"
              setOpen={setOpen2}
              setValue={setGradDate}
              setItems={setYears}
            />
          </View>
          <View style={regstyles.SectionStyle}>
          <DropDownPicker
              style={regstyles.inputStyle}
              placeholder="Select Major"
              open={open}
              onOpen={onMajorOpen}
              value={major}
              items={majors}
              dropDownDirection="TOP"
              setOpen={setOpen}
              setValue={setMajor}
              setItems={setMajors}
            />
          </View>
          <View style={regstyles.bioSectionStyle}>
            <TextInput
              style={regstyles.bioStyle}
              onChangeText={(bio) => setBio(bio)}
              placeholder="Enter a short Bio"
              placeholderTextColor="gray"
              blurOnSubmit={false}
            />
          </View>
          
          <View style={regstyles.btnParentSection}>
            <TouchableOpacity onPress={choosePhotoFromLibrary} style={regstyles.btnSection}  >
              <Text style={regstyles.btnText}>Choose Photo From Library</Text>
            </TouchableOpacity>
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
      <View style={regstyles.bottomContainer}>
            <Text style={regstyles.copyWrightText}>Copywright Ⓒ2022 DemBoyz</Text>
      </View>
    </View>
  );
};

const FirebaseError = (error) => {
  Alert.alert('Error', error, [
    { text: "OK"}
  ] );
}
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