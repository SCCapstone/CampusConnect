import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';

export function EventsScreen({navigation}) {
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          event: 'Student Protest for Better Campus wi-fi',
          date: '11/18/22 4:15:00 PM',
          imageUrl:'',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          event: 'Student group prayer session',
          date: '11/12/22 1:00:00 PM',
          imageUrl:'',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          event: 'Play at the longhorn street theatre',
          date: '11/11/22 2:00:00 PM',
          imageUrl:'',
        },
        {
          id: '58694a0f-3da1-471f-bd76-145571e29d72',
          event: 'TED Talk: Professor Abdulahabini',
          date: '11/6/22 12:00:00 PM',
          imageUrl:'',
        },
        {
          id: '58694a0f-3da1-471f-bd26-145571e29d72',
          event: 'U of SC Graduation Class of 2023',
          date: '11/9/22 9:00:00 AM',
          imageUrl:'',
        },
        {
            id: '58694a0f-3da1-471f-bd26-145571a29d72',
            event: 'VectorCalc StudyJam at Thomas Cooper!',
            date: '11/18/22 4:15:00 PM',
            imageUrl:'',
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571f29d72',
            event: 'Gamecock Volleyball vs. Georgia',
            date: '11/10/22 3:30:00 PM',
            imageUrl:'',
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571e29d52',
            event: 'Student disk golfing event',
            date: '11/18/22 4:15:00 PM',
            imageUrl:'',
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571e29d62',
            event: 'Gamecock Soccer vs. Clemsux',
            date: '11/11/22 4:30:00 PM',
            imageUrl:'',
          },

      ];

    const Event = ({ event, date, imageUrl }) => (
         <View style={styles.box}>
          <View style={{flexDirection:'row', flex: 1}}>
          <Image source={{uri: imageUrl}}
                                style={{height: 40, width: 40, borderRadius:40}}/>
            <Text style={styles.event}>{event}</Text>
          </View>
        </View>
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
      color: 'black',
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
  });