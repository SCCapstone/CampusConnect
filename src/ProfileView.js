import {useState, useEffect, useContext} from 'react'

import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { Avatar,Text } from '@rneui/themed';

import { HeaderBackButton } from 'react-navigation-stack';

import firestore from '@react-native-firebase/firestore';
import AppContext from './AppContext';
import FastImage from 'react-native-fast-image';

export function ProfileView({navigation}) {
    const userData = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState('');

    const getProfile = async () => {
       const ref = firestore().collection('Users').doc(userData.profileView);

       await ref.get().then((data) => {
            setProfileData({
                ...data.data()
            })
            setLoading(false)

       }).catch((error) => {
        console.log(error)
       })
    };


    useEffect(() => {

        if(!profileData){
            getProfile();
        }
        navigation.setOptions({
            headerTitle: 'Profile: ' + profileData.name,
            headerTintColor: '#ffffff',
            headerLeft:() =>(<HeaderBackButton tintColor='white' onPress={()=>{
                userData.setProfileView('')
                navigation.goBack()

            }}/>)
        });

      }, [profileData]); //I guess this tells react to update when these variables change?


    if(loading){
        return(
            <ActivityIndicator color={'#73000a'}></ActivityIndicator>
        )
    }


    return (
        <SafeAreaView style={{backgroundColor:'#73000a',flex:1}}>
            <View style={{alignItems:'center',marginTop:'10%'}}>
                <FastImage style={{width:175,height:175,borderRadius:90}}
                    source={{uri:profileData.pfp}}>
                </FastImage>
            </View>
            <View style={{alignItems:'center',marginTop:'5%'}}>
                <Text style={{fontWeight: '300', fontSize:40,color:'white'}}>{profileData.name}</Text>
                <Text style={{fontWeight: '300', fontSize:28,color:'white'}}>{profileData.gradYear}</Text>
                <Text style={{fontWeight: '300', fontSize:28,color:'white'}}>{profileData.major}</Text>
                <Text style={{fontWeight: '300', fontSize:23,color:'white',marginTop:100}}>{profileData.bio}</Text>
            </View>

        </SafeAreaView>
    )
}