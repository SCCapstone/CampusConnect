import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Pressable, TouchableOpacity } from 'react-native';

import iosstyles from './styles/ios/EventsScreenStyles';
import androidstyles from './styles/android/EventsScreenStyles';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";

import ImageView from "react-native-image-viewing";

var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles; // do dark mode in here as well
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}


export function EventsScreen({navigation}) {
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          type:'Other',
          event: 'Student Protest for Better Campus wi-fi',
          date: '11/18/22 4:15:00 PM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/dM4DrsLJ8GbyJMG4g3p18LFmolj1?alt=media&token=2e847802-258d-4ed6-8135-813ecacf8c2e',
          upvoteCount:'100',
          description:'Test', 
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          type:'Other',
          event: 'Student group prayer session',
          date: '11/12/22 1:00:00 PM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/dM4DrsLJ8GbyJMG4g3p18LFmolj1?alt=media&token=2e847802-258d-4ed6-8135-813ecacf8c2e',
          upvoteCount:'100',
          description:'Test', 
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          type:'Other',
          event: 'Play at the longhorn street theatre',
          date: '11/11/22 2:00:00 PM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
          upvoteCount:'100',
          description:'Test', 
        },
        {
          id: '58694a0f-3da1-471f-bd76-145571e29d72',
          type:'Academics',
          event: 'TED Talk: Professor Abdulahabini',
          date: '11/6/22 12:00:00 PM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
          upvoteCount:'100',
          description:'Test', 
        },
        {
          id: '58694a0f-3da1-471f-bd26-145571e29d72',
          type:'Other',
          event: 'U of SC Graduation Class of 2023',
          date: '11/9/22 9:00:00 AM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
          upvoteCount:'100',
          description:'Test', 
        },
        {
            id: '58694a0f-3da1-471f-bd26-145571a29d72',
            type:'Academics',
            event: 'VectorCalc StudyJam at Thomas Cooper!',
            date: '11/18/22 4:15:00 PM',
            imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
            upvoteCount:'100',
            description:'Test', 
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571f29d72',
            type:'Athletics',
            event: 'Gamecock Volleyball vs. Georgia',
            date: '11/10/22 3:30:00 PM',
            imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
            upvoteCount:'100',
            description:'Test', 
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571e29d52',
            type:'Athletics',
            event: 'Student disk golfing event',
            date: '11/18/22 4:15:00 PM',
            imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
            upvoteCount:'100',
            description:'Test', 
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571e29d62',
            type:'Athletics',
            event: 'Gamecock Soccer vs. Clemsux',
            date: '11/11/22 4:30:00 PM',
            imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
            upvoteCount:'100',
            description:'Test', 
          },

      ];

    const Event = ({item}) => (
      
      <View style={{flexDirection:'row',flex:1,padding:20}}>
        <View style={{width:10,height:70,alignSelf:'center',flex:1,justifyContent:'center'}}>
          <TouchableOpacity>
            <Image></Image>
          </TouchableOpacity>
          <Text>100</Text>
          <TouchableOpacity>
            <Image></Image>
          </TouchableOpacity>

        </View>
        <View style={{marginHorizontal:'1%',backgroundColor:'white',flex:4}}>
          <TouchableOpacity>
              <Text style={{textAlign:'center',fontSize:32}}>Event name</Text>
          </TouchableOpacity>
        </View>


      </View>
      
      );

      const renderEvent = ({ item }) => (
        <Event item={item} />
      );

      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderEvent}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );

      useEffect(() => { //gets events asynchronously in the background
        const subscriber = firestore()
        .collection('Events').orderBy('upvoteCount', 'desc').orderBy('date','desc') //get the events and order them by their upvote count
        .onSnapshot(querySnapshot => {
          if (!querySnapshot.metadata.hasPendingWrites) {  //This will prevent unecessary reads, because the firebase server may be doing something
            eventIndex = 0;
            var imageIndex = 0;
            const events = [];
            const images = [];
            querySnapshot.forEach(documentSnapshot => {
              const event = {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              }
              events.push(event);
              if (event.extraData){
                images.push({
                  uri: event.extraData,
                  key: documentSnapshot.id
                })
                setImageMap(imageMap.set(eventIndex,imageIndex))
                imageIndex++;
              }
              eventIndex++;
              
            });
      
            setEvents(events);
            setImages(images);
            setLoading(false);
          }
        });
            // Unsubscribe from events when no longer in use
            return () => subscriber();
      }, []);
}


     
    
