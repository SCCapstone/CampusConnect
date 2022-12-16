import {useState, useEffect, useContext} from 'react'

import { ActivityIndicator, SafeAreaView, View ,Image} from 'react-native';
import { Avatar,Text } from '@rneui/themed';

import { HeaderBackButton } from 'react-navigation-stack';
import { useChatContext } from './ChatContext';

import firestore from '@react-native-firebase/firestore';
import AppContext from './AppContext';
import FastImage from 'react-native-fast-image';
import { Button } from '@rneui/base';
import auth from '@react-native-firebase/auth';

import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../chatConfig';

export function ProfileView({navigation}) {
    const userData = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState('');
    const { setChannel} = useChatContext();
    const chatClient = StreamChat.getInstance(chatApiKey);


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
            <ActivityIndicator style={{flex:1}} color={'#73000a'}></ActivityIndicator>
        )
    }


    return (
        <SafeAreaView style={{backgroundColor:'#73000a',flex:1}}>
            <View style={{alignItems:'center',marginTop:'10%'}}>
                <Image defaultSource={require('./assets/blank2.jpeg')} style={{width:175,height:175,borderRadius:90}}
                    source={profileData.pfp ? {uri:profileData.pfp} : require('./assets/blank2.jpeg')}>
                </Image>
            </View>
            <View style={{alignItems:'center',marginTop:'5%'}}>
                <Text style={{fontWeight: '300', fontSize:40,color:'white',textAlign:'center'}}>{profileData.name}</Text>
                <Text style={{fontWeight: '300', fontSize:28,color:'white',textAlign:'center'}}>{profileData.gradYear}</Text>
                <Text style={{fontWeight: '300', fontSize:28,color:'white',textAlign:'center'}}>{profileData.major}</Text>
                {(!(auth().currentUser.uid === userData.profileView))?<Button onPress={async () => {
                    const channel = chatClient.channel('messaging', {
                        members: [chatClient.user.id, userData.profileView],
                    });

                    await channel.watch()
                    navigation.navigate('Chats',{screen:'DMScreen', initial:false ,params:{channelID: channel.id}})

                }}
                size='lg' title={'Message'} titleStyle={{color:'white'}} color={'#a8a1a6'} containerStyle={{width:200,marginTop:50,borderRadius:10}} style={{}}></Button>: null}
                <Text style={{fontWeight: '300', fontSize:23,color:'white',marginTop:50,textAlign:'center'}}>{profileData.bio}</Text>
            </View>

        </SafeAreaView>
    )
}