import React, {useEffect, useState} from 'react';
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
  Linking,
} from 'react-native';

import clubsData from './filteredClubs.json';
import iosstyles from './styles/ios/EventsScreenStyles.js';
import androidstyles from './styles/android/EventsScreenStyles.js';

import {SearchBar, Button, ListItem, Avatar, Input} from '@rneui/themed';

export function ClubsScreen({navigation}) {
  const [DATA, setDATA] = useState(clubsData);
  const [filteredData, setFilteredData] = useState(clubsData);
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    setSearchText(text);

    // Searches based on title and description
    const filtered = DATA.filter(club => {
      const searchText = text.toLowerCase();
      const titleMatch = club.title.toLowerCase().includes(searchText);
      const descriptionMatch = club.description.toLowerCase().includes(searchText);
      
      return titleMatch || descriptionMatch;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    setDATA(clubsData);
  }, []);

  const Club = ({item}) => (
    <View style={styles.clubContainer}>
      <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
        <View style={styles.clubContentContainer}>
          <Image source={{uri: item.imgSrc}} style={styles.clubImage} />
          <View style={styles.clubTextContainer}>
            <Text style={styles.clubTitle}>{item.title}</Text>
            <Text style={styles.clubDescription}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const renderClub = ({item}) => <Club item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search clubs"
        containerStyle={{backgroundColor: '#73000a'}}
        inputContainerStyle={{borderRadius: 20, backgroundColor: '#FFF'}}
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList data={filteredData} renderItem={renderClub} keyExtractor={(item, index) => index.toString()} />
    </SafeAreaView>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#73000a',
  },
  clubContainer: {
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  clubTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clubDescription: {
    color: 'black',
    fontSize: 14,
  },
});
