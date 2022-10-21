import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Button, View, Image, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import styles from './loginStyles';


export function RegistrationScreen({navigation}) {

    const signOut = () => {
        auth().signOut().then(() => navigation.navigate('WelcomeScreen'));
    }

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    if(auth().currentUser == null) {
        navigation.navigate('WelcomeScreen');
    }


    return(
        <View style={styles.container}>
            <Image style={styles.imageLarge} source={require("./assets/gamecock.png")} />
            <Text>This will be a registration screen soon. But for now, there's just a sign out button</Text>
    
            <TouchableOpacity onPress={() => signOut()} style={styles.loginBtn}>
                <Text style={styles.loginText}>Sign Out</Text>
            </TouchableOpacity>
    
            <View style={styles.bottomContainer}>
                <Text style={styles.copyWrightText}>Copywright Ⓒ2022 DemBoyz</Text>
            </View>
        </View>
  );
}