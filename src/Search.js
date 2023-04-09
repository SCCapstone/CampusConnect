import { ChatProvider } from "./ChatContext";
import {useContext, useRef, useState, useEffect} from 'react'
import {SafeAreaView ,View, Text, Pressable, Alert, Image,Animated,StyleSheet, ActivityIndicator,Modal,KeyboardAvoidingView, ImageBackground, Platform, TouchableOpacity} from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton,FlatList, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';



import auth from '@react-native-firebase/auth';
import {FloatingAction} from 'react-native-floating-action';
import AppContext from './AppContext';
import storage from '@react-native-firebase/storage';
import SelectDropdown from 'react-native-select-dropdown'
import { useHeaderHeight } from '@react-navigation/elements';
import moment from "moment";


import { useChatContext } from './ChatContext';

import { GestureHandlerRootView } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';
import { SearchBar, Button, ListItem, Avatar ,Input} from '@rneui/themed';

import androidstyles from './styles/android/ChatStyles';
import iosstyles from './styles/ios/ChatStyles';
import { channel } from "diagnostics_channel";
import FastImage from "react-native-fast-image";
import { BackgroundImage , Icon} from "@rneui/base";
import { FAB } from '@rneui/themed';

export function Search({navigation}) {
    const[userSearch,setUserSearch] = useState('')
    const[searchResults,setSearchResults] = useState([]);
    const userData = useContext(AppContext);


    useEffect(() => {
        const postsRef = firestore().collection('Users')

        const query = postsRef
        .where('searchName', '>=', userSearch.toUpperCase())
        .where('searchName', '<=', userSearch.toUpperCase()+ '\uf8ff')
        .limit(50)

        query.get().then(snapShot => {
            if(!snapShot.metadata.hasPendingWrites) {
              const users = []
              snapShot.forEach(documentSnapshot => {
                if(!documentSnapshot.data().firstLogin){
                    users.push({...documentSnapshot.data(), key:documentSnapshot.id})
                }

              });
              setSearchResults(users);

            }
          });
          console.log(searchResults)
        
    }, [userSearch])



    const renderUser = ({item}) => {

        return(
            <TouchableOpacity onPress={() => {
                userData.setProfileView(item.key)
                navigation.navigate('ProfileView')
            }}
            style={{height:100,flexDirection:'row',backgroundColor:'white'}}>
             <View style={{width:60,height:60,borderRadius:40,alignSelf:'center',marginLeft:'4%'}}>
                <FastImage defaultSource={require('./assets/blank2.jpeg')} style={{width:70,height:70,borderRadius:50}} source={item.pfp ? {uri: item.pfp} : require('./assets/blank2.jpeg')}></FastImage>
             </View>
            <View style={{justifyContent:'flex-start',marginLeft:20,marginTop:5,flexShrink:1}}>
                <Text style={{marginLeft:'5%',fontSize:24,fontWeight:'bold',color:'black'}}>{item.name}</Text>
                <Text style={{marginLeft:'5.5%',fontSize:14,fontWeight:'bold',color:'black',flexWrap:'wrap'}}>{item.major}</Text>
                <Text style={{marginLeft:'5.5%',fontSize:14,fontWeight:'bold',color:'black'}}>{'('+item.gradYear+')'}</Text>
                <Text style={{marginLeft:'5.5%',fontSize:10,fontWeight:'bold',fontStyle:'italic',color:'black',marginTop:'5%'}}>{item.joined ? 'Joined: '+moment(item.joined.toDate()).format("MMM Do YYYY, h:mm:ss a").toString(): null}</Text>
            </View>
        </TouchableOpacity>)

    };
    return (
    <View style={{flex:1,backgroundColor:'#73000a'}}>
      <SearchBar 
        containerStyle={{backgroundColor:'#73000a'}} 
        inputContainerStyle={{borderRadius:20,backgroundColor:'#FFF'}} 
        onChangeText={setUserSearch} 
        placeholder="Search for a user"
        value={userSearch}>
      </SearchBar>
      <View style={{flex:1}}>
        <FlatList
            data={searchResults}
            ItemSeparatorComponent={<View
            style={{
                backgroundColor: 'black',
                height: 1,
            }}
            />}
            renderItem={renderUser}
            keyExtractor={item => item.key}
            />
        </View>
    </View>
    );
}