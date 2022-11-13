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

export function DrawerContent(props) {

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}
            contentContainerStyle={{backgroundColor: '#73000a'}}>
            <ImageBackground source={require('./assets/gamecock.png')} style={{padding: 30}}>

            
                <Image source={require('./assets/blank2.jpeg')} //change to pfp
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