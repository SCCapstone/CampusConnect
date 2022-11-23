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
    const [bio, setBio] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [gradDate, setGradDate] = React.useState('');
    var url = "";
    const [registraionSuccess,setRegistraionSuccess ] = useState(false);

    const userData = useContext(AppContext);
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

    const [years, setYears] = useState([
      {label: '2010', value: '2010'},
      {label: '2011', value: '2011'},
      {label: '2012', value: '2012'},
      {label: '2013', value: '2013'},
      {label: '2014', value: '2014'},
      {label: '2015', value: '2015'},
      {label: '2016', value: '2016'},
      {label: '2017', value: '2017'},
      {label: '2018', value: '2018'},
      {label: '2019', value: '2019'},
      {label: '2020', value: '2020'},
      {label: '2021', value: '2021'},
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
      {label: 'Global Studies', value: 'Global Studies'},
      {label: 'Health Communication', value: 'Health Communication'},
      {label: 'Health Promotion, Education, and Behavior', value: 'Health Promotion, Education, and Behavior'},
      {label: 'Health Services Policy and Management', value: 'Health Services Policy and Management'},
      {label: 'History', value: 'History'},
      {label: 'Hospitality Management', value: 'Hospitality Management'},
      {label: 'Human Resources', value: 'Human Resources'},
      {label: 'Information Science', value: 'Information Science'},
      {label: 'Integrated Information Technology (Computing) ', value: 'Integrated Information Technology (Computing) '},
      {label: 'Interdisciplinary Studies', value: 'Interdisciplinary Studies'},
      {label: 'International Business', value: 'International Business'},
      {label: 'International Studies', value: 'International Studies'},
      {label: 'Journalism', value: 'Journalism'},
      {label: 'Languages, Literatures and Cultures', value: 'Languages, Literatures and Cultures'},
      {label: 'Law', value: 'Law'},
      {label: 'Liberal Studies', value: 'Liberal Studies'},
      {label: 'Library and Information Science', value: 'Library and Information Science'},
      {label: 'Linguistics', value: 'Linguistics'},
      {label: 'Management', value: 'Management'},
      {label: 'Marine Science', value: 'Marine Science'},
      {label: 'Marketing', value: 'Marketing'},
      {label: 'Mass Communications', value: 'Mass Communications'},
      {label: 'Mathematics', value: 'Mathematics'},
      {label: 'Media Arts', value: 'Media Arts'},
      {label: 'Medicine', value: 'Medicine'},
      {label: 'Music', value: 'Music'},
      {label: 'Music: Conducting', value: 'Music: Conducting'},
      {label: 'Music: Jazz Studies', value: 'Music: Jazz Studies'},
      {label: 'Music: Music Composition', value: 'Music: Music Composition'},
      {label: 'Music: Music Education', value: 'Music: Music Education'},
      {label: 'Music: Music History', value: 'Music: Music History'},
      {label: 'Music: Music Industry Studies', value: 'Music: Music Industry Studies'},
      {label: 'Music: Music Pedagogy (Piano / Violin)', value: 'Music: Music Pedagogy (Piano / Violin)'},
      {label: 'Music: Music Performance', value: 'Music: Music Performance'},
      {label: 'Music: Music Theory', value: 'Music: Music Theory'},
      {label: 'Music: Musical Theatre', value: 'Music: Musical Theatre'},
      {label: 'Music: Opera Theatre', value: 'Music: Opera Theatre'},
      {label: 'Neuroscience', value: 'Neuroscience'},
      {label: 'Nursing', value: 'Nursing'},
      {label: 'Operations and Supply Chain', value: 'Operations and Supply Chain'},
      {label: 'Organizational Leadership', value: 'Organizational Leadership'},
      {label: 'Pharmacy', value: 'Pharmacy'},
      {label: 'Philosophy', value: 'Philosophy'},
      {label: 'Physical Therapy', value: 'Physical Therapy'},
      {label: 'Physics', value: 'Physics'},
      {label: 'Political Science', value: 'Political Science'},
      {label: 'Psychology', value: 'Psychology'},
      {label: 'Public Administration', value: 'Public Administration'},
      {label: 'Public Health', value: 'Public Health'},
      {label: 'Public Relations', value: 'Public Relations'},
      {label: 'Real Estate', value: 'Real Estate'},
      {label: 'Religious Studies', value: 'Religious Studies'},
      {label: 'Retailing', value: 'Retailing'},
      {label: 'Risk Management and Insurance', value: 'Risk Management and Insurance'},
      {label: 'Russian', value: 'Russian'},
      {label: 'Social Work', value: 'Social Work'},
      {label: 'Sociology', value: 'Sociology'},
      {label: 'Spanish', value: 'Spanish'},
      {label: 'Speech/Language Pathology', value: 'Speech/Language Pathology'},
      {label: 'Sport and Entertainment Management', value: 'Sport and Entertainment Management'},
      {label: 'Statistics', value: 'Statistics'},
      {label: 'Theatre', value: 'Theatre'},
      {label: 'Tourism Management', value: 'Tourism Management'},
      {label: 'Visual Communications', value: 'Visual Communications'},
      {label: 'Women\'s and Gender Studies', value: 'Women\'s and Gender Studies'},
    ]);


    const choosePhotoFromLibrary = async () => {
      await ImagePicker.openPicker({
        width: 300,
        height: 300,
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

    updateLocalVariables = () =>{ 
      userData.setBio(bio);
      userData.setMajor(major);
      userData.setGradYear(gradDate);
      userData.setProfilePic(url);
      userData.setName(firstName + " " + lastName);
    }

    const writeUserData = async () =>{
      setLoading(true)
      const bioLengthValid = bio.length <= 150;
      if (firstName && lastName && major && gradDate && bio && bioLengthValid && image) {
        await uploadPic();
        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          name: firstName +" "+ lastName,
          major: major,
          firstLogin: false,
          gradYear: gradDate,
          bio: bio,
          pfp: url
        }).then(async () => {
          setRegistraionSuccess(true);
          await updateLocalVariables();
          reset();
        })
      }
      else if (firstName && lastName && major && gradDate && bioLengthValid && image) {

        await uploadPic();

        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          name: firstName +" "+ lastName,
          major: major,
          firstLogin: false,
          gradYear: gradDate,
          pfp: url
        }).then(() => {
          setRegistraionSuccess(true);
          reset();
        })
      }
      else if (firstName && lastName && major && gradDate && bio && bioLengthValid) {
        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          name: firstName +" "+ lastName,
          major: major,
          firstLogin: false,
          gradYear: gradDate,
          bio: bio
        }).then(() => {
          setRegistraionSuccess(true);
          reset();
        })
      }
      else if(firstName && lastName && major && gradDate && bioLengthValid) {
        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          name: firstName +" "+ lastName,
          major: major,
          firstLogin: false,
          gradYear: gradDate,
        }).then(() => {
          setRegistraionSuccess(true);
          reset();
        })
      }
      else {
        RegisterError();
      }
      setLoading(false);
    }


    const reset = () => {
      url = "";
      setFirstName("")
      setLastName("")
      setGradDate("")
      setMajor("")
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
        <View style={{alignItems: 'center', }}>
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
              placeholder="Enter First Name (Required)"
              placeholderTextColor="gray"
              blurOnSubmit={false}
            />
          </View>
          <View style={regstyles.SectionStyle}>
            <TextInput
              style={regstyles.inputStyle}
              onChangeText={(LastName) => setLastName(LastName)}
              placeholder="Enter Last Name (Required)"
              placeholderTextColor="gray"
              blurOnSubmit={false}
            />
          </View>
          <View style={regstyles.SectionStyle}>
          <DropDownPicker
              style={regstyles.inputStyle}
              placeholder="Select Grad Year (Required)"
              open={open2}
              onOpen={onYearOpen}
              value={gradDate}
              items={years}
              dropDownDirection="TOP"
              setOpen={setOpen2}
              setValue={setGradDate}
              setItems={setYears}
              listMode="SCROLLVIEW"
            />
          </View>
          <View style={regstyles.SectionStyle}>
          <DropDownPicker
              style={regstyles.inputStyle}
              placeholder="Select Major (Required)"
              open={open}
              onOpen={onMajorOpen}
              value={major}
              items={majors}
              dropDownDirection="TOP"
              setOpen={setOpen}
              setValue={setMajor}
              setItems={setMajors}
              listMode="SCROLLVIEW"
            />
          </View>
          <View style={regstyles.bioSectionStyle}>
            <TextInput
              style={regstyles.bioStyle}
              onChangeText={(bio) => setBio(bio)}
              placeholder="Enter a short Bio (optional) (150 characters max)"
              placeholderTextColor="gray"
              blurOnSubmit={false}
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
    Alert.alert('Error', "Make sure all required fields are filled out and that the bio is less than 151 characters", [
      { text: "OK"}
    ] );
}
