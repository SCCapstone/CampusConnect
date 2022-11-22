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

import AppContext from './AppContext';


export function DrawerContent(props) {

    const userData = useContext(AppContext);

    const getUserData = async () => {
        const data = await firestore().collection('Users').doc(auth().currentUser.uid).get().catch(error => {
            console.log(error);
          });
        userData.setName("\n" + data.get("name"));
        userData.setEmail(data.get('email'));
        userData.setBio(data.get('bio'));
        userData.setMajor(data.get("major"));
        userData.setGradYear(data.get("gradYear"));
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
            contentContainerStyle={{backgroundColor: '#73000a'}}>
                <ImageBackground blurRadius={4} source={require('./assets/gamecock.png')} style={{padding: 30}}>
                    <View style={{flexDirection: 'row',alignSelf:'center'}}>
                        <TouchableOpacity activeOpacity={.9} style={{height:80,width:80,borderRadius:40,overflow: 'hidden'}} onLongPress={userData.pfp? () => DeleteAlert() : null}>
                            <Image source={userData.pfp ? {uri: userData.pfp} : require('./assets/blank2.jpeg')}
                                    style={{height: 80, width: 80, borderRadius:40}}/>
                        </TouchableOpacity>
                            <View backgroundColor='#ebebeb' style={{marginHorizontal:20,justifyContent:'center',alignContent:'center',alignSelf:'center'}}>
                                <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black',textAlign:'center'}}>Welcome!
                                <Text style={{fontSize: 22, color: 'black', marginRight: 20, textAlign: 'center'}}>{userData.name.split(" ")[0]}   
                                </Text>
                                </Text>
                            </View>
                    </View>
                    <View backgroundColor='#ebebeb' style={{marginTop:15,alignSelf:'center'}}>
                        <View style={{flexDirection: 'column',alignSelf:'center'}}>
                                <Text style={{fontSize: 15,fontWeight:'bold',color: 'black',textAlign:'center', marginVertical:1}}>Major: </Text>
                                <Text style={{fontSize: 13, color: 'black',textAlign:'center'}}>{userData.major}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop:1,alignSelf:'center'}}>
                                <Text style={{fontSize: 15,fontWeight:'bold', color: 'black'}}>Class of </Text>
                                <Text style={{fontSize: 15, fontWeight:'bold',color: 'black', textAlign: 'center'}}>{userData.gradYear}</Text>
                        </View>
                    </View>
                    
                </ImageBackground>
                    <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>  
                        <DrawerItemList {...props}/>
                    </View> 
            </DrawerContentScrollView>
            <TouchableOpacity onPress={() => auth().signOut().then(() => {
                      props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'WelcomeScreen' }]
                   });
    })}

                style={{paddingVertical: 15}}>
                <View>
                    <Text
                    style={{
                        fontSize: 15,
                        marginLeft: 20,
                        color: 'black'
                    }}>
                    Sign Out
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({

    backButtonContainer: {
      backgroundColor: "white",
      marginLeft: 50,
      marginTop: 70,
      height: 50,
      width: 175,
    }
});