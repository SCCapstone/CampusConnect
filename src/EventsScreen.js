import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';

import iosstyles from './styles/ios/EventsScreenStyles';
import androidstyles from './styles/android/EventsScreenStyles';

var styles;

if (Platform.OS === 'ios'){
  styles = iosstyles;// do dark mode in here as well
}
else if (Platform.OS === 'android') {
  styles = androidstyles
}

import iosstyles from './styles/ios/EventsScreenStyles';
import androidstyles from './styles/android/EventsScreenStyles';

var styles;

if (Platform.OS === 'ios'){
  styles = iosstyles;// do dark mode in here as well
}
else if (Platform.OS === 'android') {
  styles = androidstyles
}

export function EventsScreen({navigation}) {
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          event: 'Student Protest for Better Campus wi-fi',
          date: '11/18/22 4:15:00 PM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/dM4DrsLJ8GbyJMG4g3p18LFmolj1?alt=media&token=2e847802-258d-4ed6-8135-813ecacf8c2e',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          event: 'Student group prayer session',
          date: '11/12/22 1:00:00 PM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/dM4DrsLJ8GbyJMG4g3p18LFmolj1?alt=media&token=2e847802-258d-4ed6-8135-813ecacf8c2e',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          event: 'Play at the longhorn street theatre',
          date: '11/11/22 2:00:00 PM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
        },
        {
          id: '58694a0f-3da1-471f-bd76-145571e29d72',
          event: 'TED Talk: Professor Abdulahabini',
          date: '11/6/22 12:00:00 PM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
        },
        {
          id: '58694a0f-3da1-471f-bd26-145571e29d72',
          event: 'U of SC Graduation Class of 2023',
          date: '11/9/22 9:00:00 AM',
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
        },
        {
            id: '58694a0f-3da1-471f-bd26-145571a29d72',
            event: 'VectorCalc StudyJam at Thomas Cooper!',
            date: '11/18/22 4:15:00 PM',
            imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571f29d72',
            event: 'Gamecock Volleyball vs. Georgia',
            date: '11/10/22 3:30:00 PM',
            imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571e29d52',
            event: 'Student disk golfing event',
            date: '11/18/22 4:15:00 PM',
            imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571e29d62',
            event: 'Gamecock Soccer vs. Clemsux',
            date: '11/11/22 4:30:00 PM',
            imageUrl:'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed',
          },

      ];

    const Event = ({ event, date, imageUrl }) => (
      <TouchableOpacity>
         <View style={styles.box}>
          <View style={{flexDirection:'row', flex: 1}}>
          <Image source={{uri: imageUrl}}
                                style={styles.canvas}/>
            <Text style={styles.event}>{event}</Text>
          </View>
            <Text sytle={styles.date}>{date}</Text>
        </View>
      </TouchableOpacity>
      );

      const renderEvent = ({ item }) => (
        <Event event={item.event}
         imageUrl={item.imageUrl} 
         date={item.date}/>
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
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#808080',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    date: {
      fontSize: 10,
      marginTop:20,
      color: 'black',
      fontStyle: 'italic'
    },
    event: {
      fontSize: 18,
      color: 'white',
      marginTop: 10,
      justifyContent: 'center'
    },
    box: {
        backgroundColor: '#cecece',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 20,
        flex: 1
      },
      canvas: {
        position: 'absolute',
        top: -20,
        left: -20,
        bottom: -40,
        right: -20,
      },
  });
