import React, { useEffect, useState } from 'react';
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
  Modal,
} from 'react-native';
import { ScrapeEventData } from './EventsScraper';
import iosstyles from './styles/ios/EventsScreenStyles';
import androidstyles from './styles/android/EventsScreenStyles';
import { FloatingAction } from 'react-native-floating-action';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';
import { SearchBar } from '@rneui/themed';

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
    <View style={styles.eventContainer}>
      <TouchableOpacity onPress={() => { setSelectedEvent(item); setModalVisible(true); }}>
        <FastImage source={{ uri: item.imageUrl }} style={styles.canvas} />
        <Text style={styles.body}>{item[0]}</Text>
        <Text style={styles.date}>{item[2]}</Text>
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
    <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderEvent} />
      <Modal visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
        {selectedEvent && (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedEvent[0]}</Text>
            <FastImage source={{ uri: selectedEvent.imageUrl }} style={styles.modalImage} />
            <Text style={styles.modalDescription}>{selectedEvent[1]}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButton}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const CreateAlertupVote = () => {
  Alert.alert('This will upvote');
};
const CreateAlertdownVote = () => {
  Alert.alert('This will downvote');
};
const CreateAlertevent = () => {
  Alert.alert('This will hold event info');
};
