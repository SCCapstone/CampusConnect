import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    Caption,
    TouchableOpacity,
    Title,
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
import { useEffect, useState, setState } from 'react';


export function DrawerContent(props) {

    const [imageSrc, setImageSrc] = useState();
    const [picLoaded, setLoaded] = useState(false);
    const [nameText, setName] = useState("Welcome");

    const getName = async () => {
        const userData = await firestore().collection('Users').doc(auth().currentUser.uid).get().catch(error => {
            console.log(error);
          });
        setName("\n" + userData.get("name").split(" ")[0]);
    }
    /*const NameButton = () => {
        return (
            <View style={styles.backButtonContainer}>
                <Text style={{ fontSize: 20, marginLeft: 80, color: 'black', fontWeight: 'bold', textAlign: 'left',textAlignVertical: 'center'}}> {nameText}</Text>
            </View>
        )
    }*/

    useEffect(() => {

        getName();
        storage()
        .ref(auth().currentUser.uid) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
            setImageSrc(url);
            setLoaded(true);
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    }, []);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}
            contentContainerStyle={{backgroundColor: '#73000a'}}>
                <ImageBackground source={require('./assets/gamecock.png')} style={{padding: 30}}>
                    <View style={{flexDirection: 'row', marginLeft:15}}>
                        <Image source={picLoaded ? {uri: imageSrc} : require('./assets/blank2.jpeg')}
                                style={{height: 80, width: 80, borderRadius:40}}/>
                        <View style={{marginTop: 15, marginLeft:15, flexDirection:'column'}}>
                            <Text style={{fontSize: 24, fontWeight: 'bold', backgroundColor: 'white', color: 'black'}}>Welcome!
                            <Text style={{fontSize: 20, backgroundColor: 'white', color: 'black', marginRight: 20}}>{nameText}   
                            </Text>
                            </Text>
                        </View>
                    </View>            
                </ImageBackground>
                    <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>  
                        <DrawerItemList {...props}/>
                    </View> 
            </DrawerContentScrollView>
            <TouchableOpacity onPress={() => auth().signOut().then(() => props.navigation.navigate('WelcomeScreen'))} //sign out
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