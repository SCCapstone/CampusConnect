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
    <View style={{ height: 150,
      backgroundColor: '#a8a1a6',
      shadowColor: 'black',
      borderRadius: 10,
      padding: 20,
      marginVertical: 8,
      marginRight: '3%',
      flex: 1,
      marginHorizontal: '3%',
      }}>
      <TouchableOpacity onPress={() => { setSelectedEvent(item); setModalVisible(true); }}>
        <FastImage source={{ uri: item.imageUrl }} style={styles.canvas} />
        <Text style={{fontSize: 18, color: 'black', marginTop: '5%', justifyContent: 'center',}}>{item[0]}</Text>
        <Text style={{fontSize: 13, marginTop: 20, color: 'black', fontStyle: 'italic',}}>{item[2]}</Text>
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
          <View style={{flex: 1, backgroundColor: '#73000a',}}>
            <View style={{flex: 1, backgroundColor: '#FFFFFF', margin: 16, borderRadius: 10, padding: 20,}}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000000',}}>{selectedEvent[0]}</Text>
              <FastImage source={{ uri: selectedEvent.imageUrl }} style={styles.modalImage} />
              <Text style={styles.modalDescription}>{selectedEvent[1]}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{  fontSize: 18, fontWeight: 'bold', color: '#000000', marginTop: 16,}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}
