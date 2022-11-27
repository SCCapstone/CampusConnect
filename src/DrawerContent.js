import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    Caption,
    TouchableOpacity,
    Title,
    Pressable,
    Alert
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';

import { StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState, setState, useContext } from 'react';
import {CometChat} from '@cometchat-pro/react-native-chat';
import AppContext from './AppContext';


export function DrawerContent(props) {

    const userData = useContext(AppContext);

    const getUserData = () => {
        firestore().collection('Users').doc(auth().currentUser.uid).get().then((data) => {
            userData.setName(data.get("name"));
            userData.setEmail(data.get('email'));
            userData.setBio(data.get('bio'));
            userData.setMajor(data.get("major"));
            userData.setGradYear(data.get("gradYear"));
        }).catch(error => {
            console.log(error);
          });
    }
    const DeleteAlert = () => {
        Alert.alert('Delete Photo', "Do you want to delete your photo?", [
          { text: "Yes",
          onPress: () => deletePhoto()},
          { text: "No"}
        ] );
    }
    const getPhoto = () => {
        storage()
        .ref(auth().currentUser.uid) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
            userData.setProfilePic(url);
        })
        .catch((e) => reset());
    }
    const reset = () => {
        userData.setProfilePic('');
    }
    
    const deletePhoto = async () => {
        await storage().ref(auth().currentUser.uid).delete();
        firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          pfp: ''
        })
        getPhoto();
    }
    


    useEffect(() => {
        getUserData();
        getPhoto();
    }, []);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}
            contentContainerStyle={styles.drawerScrollView}>
                <ImageBackground blurRadius={4} source={require('./assets/gamecock.png')} style={styles.imageBackgroundView}>
                    <View style={{flexDirection: 'row',alignSelf:'center'}}>
                        <TouchableOpacity activeOpacity={.9} style={styles.pressableImageView} onLongPress={userData.pfp? () => DeleteAlert() : null}>
                            <Image source={userData.pfp ? {uri: userData.pfp} : require('./assets/blank2.jpeg')}
                                    style={styles.pfpStyle}/>
                        </TouchableOpacity>
                            <View style={styles.userWelcomeBox}>
                                <Text style={styles.welcomeText}>Welcome!</Text>
                                <Text style={styles.userNameText}>{userData.name.split(" ").length > 0 ? userData.name.split(" ")[0] : 'Error: 404'}</Text>
                            </View>
                    </View>
                    <View style={styles.userInfoBox}>
                        <View style={styles.majorTextBox}>
                                <Text style={styles.majorText}>Major: </Text>
                                <Text style={styles.userMajorText}>{userData.major}</Text>
                        </View>
                        <View style={styles.classBox}>
                                <Text style={styles.classText}>Class of </Text>
                                <Text style={styles.userClassText}>{userData.gradYear}</Text>
                        </View>
                    </View>
                    
                </ImageBackground>
                    <View style={styles.drawerItemsList}>  
                        <DrawerItemList {...props}/>
                    </View> 
            </DrawerContentScrollView>
            <TouchableOpacity onPress={() => auth().signOut().then(() => {
                      CometChat.logout()
                      props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'WelcomeScreen' }]
                   });
    })}

                style={styles.touchableSignout}>
                <View>
                    <Text
                    style={styles.signOutText}>
                    Sign Out
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    pfpStyle: {height: 80, width: 80, borderRadius:40},
    imageBackgroundView: {padding: 30},
    pressableImageView: {height:80,width:80,borderRadius:40,overflow: 'hidden'},
    drawerScrollView: {backgroundColor: '#73000a'},
    userNameText: {fontSize: 20, color: 'black',fontWeight:'bold', textAlign: 'center'},
    welcomeText: {fontSize: 20, fontWeight: 'bold', color: 'black',textAlign:'center'},
    userWelcomeBox: {marginHorizontal:20,justifyContent:'center',alignContent:'center',alignSelf:'center',backgroundColor:'#ebebeb'},
    userClassText:{fontSize: 15, fontWeight:'bold',color: 'black', textAlign: 'center'},
    classText:{fontSize: 15,fontWeight:'bold', color: 'black'},
    userMajorText:{fontSize: 13, color: 'black', fontWeight:'bold',textAlign:'center'},
    majorText: {fontSize: 15,fontWeight:'bold',color: 'black',textAlign:'center', marginVertical:1},
    classBox:{flexDirection: 'row', marginTop:1,alignSelf:'center'},
    majorTextBox:{flexDirection: 'column',alignSelf:'center'},
    userInfoBox: {marginTop:15,alignSelf:'center',backgroundColor:'#e2e2e2'},
    drawerItemsList: {flex: 1, backgroundColor: '#fff', paddingTop: 10},
    touchableSignout:{paddingVertical: 15},
    signOutText: {
        fontSize: 15,
        marginLeft: 20,
        color: 'black'
    },
    backButtonContainer: {
      backgroundColor: "white",
      marginLeft: 50,
      marginTop: 70,
      height: 50,
      width: 175,
    }
});