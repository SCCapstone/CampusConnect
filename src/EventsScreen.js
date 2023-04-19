import React, { useEffect, useState } from 'react';
import {
  Platform,
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
  Modal,
} from 'react-native';
import { ScrapeEventData } from './EventsScraper';
import { FloatingAction } from 'react-native-floating-action';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';
import { SearchBar } from '@rneui/themed';

import iosstyles from './styles/ios/EventsScreenStyles';
import androidstyles from './styles/android/EventsScreenStyles';
var styles;
 
if (Platform.OS === 'ios') {
  styles = iosstyles; // do dark mode in here as well
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}
export function EventsScreen({ navigation }) {
  const defaultItemCount = 10;

  const [DATA, setDATA] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const ret = await ScrapeEventData();
      setDATA(ret);
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const Event = ({ item }) => (
    <View style={{ height: '15%',
      backgroundColor: '#a8a1a6',
      shadowColor: 'black',
      borderRadius: 10,
      marginVertical: 8,
      marginRight: '3%',
      flex: 1,
      marginHorizontal: '3%',
      }}>
      <TouchableOpacity  style ={{flex: 1 }} onPress={() => { setSelectedEvent(item); setModalVisible(true); }}>
        <Image source={{ uri: item.imageUrl }} style={{ position: 'absolute', width:'100%', height: '55%', borderTopRightRadius: 10, borderTopLeftRadius: 10,}} />
        <Text style={{ adjustsFontSizeToFit: true, marginHorizontal: '7%', fontSize: 22, color: 'white', marginTop: '25%', justifyContent: 'center', fontWeight: 'bold', textShadowColor: 'black', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, shadowOpacity: 1,}}>{item.title}</Text>
        <Text style={{ adjustsFontSizeToFit: true, marginHorizontal: '7%', fontSize: 15, marginTop: 2, marginBottom: '2%', color: 'black', fontStyle: 'italic', textShadowColor: 'black', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10, shadowOpacity: 1,}}>{item.date}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEvent = ({ item }) => <Event item={item} />;

  if (!DATA) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#73000a'}}>
      <FlatList
        data={DATA}
        renderItem={renderEvent}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
        {selectedEvent && (
          <SafeAreaView style={{flex: 1, backgroundColor: '#73000a',}}>
            <View style={{flex: 1, backgroundColor: '#FFFFFF', margin: 16, borderRadius: 10, padding: 20,}}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000000',}}>{selectedEvent.title}</Text>
              <Text style={{ fontStyle: 'italic', fontSize: 19, fontWeight: 'bold', color: '#000000',}}>{selectedEvent.date}</Text>
              <Image source={{ uri: selectedEvent.imageUrl }} style={{width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10, marginTop: 16,}} />
              <Text style={{fontSize: 16, color: 'black', marginTop: 16, lineHeight: 24}}>{selectedEvent.description}</Text>
              <Text style={{ marginTop: 10 , fontSize: 14, fontWeight: 'bold', color: '#000000', textDecorationLine: 'underline',}}>{selectedEvent[1]}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ backgroundColor: '#a8a1a6', borderRadius: 8, fontSize: 18, fontWeight: 'bold', color: '#000000', marginTop: 16, marginRight: '85%',}}>Close</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  ); 
}
