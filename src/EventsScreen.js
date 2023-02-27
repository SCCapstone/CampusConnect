import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar, 
  Image, 
  Pressable, 
  TouchableOpacity,
  ActivityIndicator,
 } from 'react-native';
import { ScrapeEventData } from './EventsScraper';
import iosstyles from './styles/ios/EventsScreenStyles';
import androidstyles from './styles/android/EventsScreenStyles';
import {FloatingAction} from 'react-native-floating-action';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";

import ImageView from "react-native-image-viewing";
import FastImage from 'react-native-fast-image';
import { SearchBar } from '@rneui/themed';

var styles;
 
if (Platform.OS === 'ios') {
  styles = iosstyles; // do dark mode in here as well
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}


export function EventsScreen({navigation}) {
  const defaultItemCount = 10;

const [DATA, setDATA] = useState();

useEffect(() => {
  const fetchData = async () => {
    const ret = await ScrapeEventData();
    setDATA(ret);
    }
  fetchData();
}, []);

const [search, setSearch] = useState("");

    const Event = ({item}) => (
      
      <View style={styles.eventContainer}>
      {/* <View style={styles.upvoteBox}>
        <TouchableOpacity onPress={() => CreateAlertupVote()}>
          <Image
            style={styles.voteButtons}
            source={
              item.isUpVoted
             //   ? require('./assets/upvote_highlighted.png')
             //   : require('./assets/upvote.png')
            }></Image>
        </TouchableOpacity>
        <Text style={styles.upvote}>{item.upvoteCount}</Text>
        <TouchableOpacity onPress={() => CreateAlertdownVote()}>
          <Image
            style={styles.voteButtons}
            source={
              item.isDownVoted
              //  ? require('./assets/downvote_highlighted.png')
              //  : require('./assets/downvote.png')
            }></Image>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity onPress={() => CreateAlertevent()} style ={styles.event}>
      <FastImage source={{uri: item.imageUrl}}
             style={styles.canvas}/>
            <Text style={styles.body}>{item[0]}</Text>
            <Text style={styles.date}>{item[2]}</Text>
      </TouchableOpacity>
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
    {/* <View style={{marginTop: 20}}>
      <Text>{JSON.stringify(DATA)}</Text>
    </View> */}
  </SafeAreaView>
);
}

const CreateAlertupVote = () => {
  Alert.alert('This will upvote');
}
const CreateAlertdownVote = () => {
  Alert.alert('This will downvote');
}
const CreateAlertevent = () => {
  Alert.alert('This will hold event info');
}
     
    
