import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState, setState } from 'react';

export function DrawerContent(props) {

    const [imageSrc, setImageSrc] = useState();
    const [picLoaded, setLoaded] = useState(false);
    

    useEffect(() => {
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


            <Image key={Date.now()} source={picLoaded ? {uri: imageSrc} : require('./assets/blank2.jpeg')}
                    style={{height: 80, width: 80, borderRadius:40}}/>
                
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