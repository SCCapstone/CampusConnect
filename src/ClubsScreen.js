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
} from 'react-native';

import clubsData from './clubs.json';
import iosstyles from './styles/ios/EventsScreenStyles.js';
import androidstyles from './styles/android/EventsScreenStyles.js';

var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles;
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}

export function ClubsScreen({ navigation }) {
  const [DATA, setDATA] = useState(null);

  useEffect(() => {
    setDATA(clubsData);
  }, []);

  const Club = ({ item }) => (
    <View style={styles.clubContainer}>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.clubContentContainer}>
          <Image source={{ uri: item.imgSrc }} style={styles.clubImage} />
          <View style={styles.clubTextContainer}>
            <Text style={styles.clubTitle}>{item.title}</Text>
            <Text style={styles.clubDescription}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const renderClub = ({ item }) => <Club item={item} />;
  const styles = StyleSheet.create({
    clubContainer: {
      backgroundColor: '#73000a',
      borderRadius: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      overflow: 'hidden',
    },
    clubContentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    clubImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
      margin: 10,
    },
    clubTextContainer: {
      flex: 1,
      backgroundColor: '#73000a',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    clubTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    clubDescription: {
      color: 'white',
      fontSize: 14,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderClub}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
