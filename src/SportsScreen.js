import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import uuid from 'react-native-uuid';
import { ScrapeSportData } from './SportScraper';
import { SearchBar } from '@rneui/themed';

const Item = ({item, onPress}) => (
  <Text style={styles.title}>{item.sport + "\n" + item.opponent + "\n" + item.date + "\n" + item.time}</Text>
);

export function SportsScreen({navigation}) {
const defaultItemCount = 10;

var DATA = [{sport: "", opponent: "", date: "", time: "", id: ""}];

for (let i = 0; i < defaultItemCount; i++) {
  var dataPusher = {sport: "", opponent: "", date: "", time: "", id: "", backgroundColor: "", textColor: ""}; 
  dataPusher.sport = sportArray[i];
  dataPusher.opponent = opponentArray[i];
  dataPusher.date = dateArray[i];
  dataPusher.time = timeArray[i];
  dataPusher.id = uuid.v4();
  DATA.push(dataPusher);
}

const [search, setSearch] = useState("");
  
  const actions = [
    {
        text: "Search for a team or game",
        name: "bt_search",
        icon: source={uri:'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png'},
        position: 1,
        color: '#73000a',
    }
];

const [selectedBackgroundColor, setSelectedBackgroundColor] = useState();
const [selectedTextColor, setSelectedTextColor] = useState();

const renderItem = ({item}) => {
  const backgroundColor = item.backgroundColor === selectedBackgroundColor ? '#ffffff' : '#white';
  const textColor = item.backgroundColor === selectedTextColor ? 'white' : 'black';

  return (
    <Item
      item={item}
      onPress={() => setSelectedId(item.id)}
      backgroundColor={backgroundColor}
      textColor={textColor}
    />
  );
};

  

if (!DATA) {
  return (
    <View>
      <ActivityIndicator size="large" color="#00ff00"></ActivityIndicator>
    </View>
  )
} else {
  console.log(DATA)
  return (
          <SafeAreaView style={styles.container}>
             <SearchBar inputContainerStyle={{borderRadius:20,backgroundColor:'white'}} onChangeText={setSearch} placeholder='Enter a name to search' value={search}></SearchBar>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              >
              </FlatList>
              <FloatingAction color='#73000a' actions={actions} onPress={ () => CreateAlert()} />
          </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#73000a',
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    borderRadius:20,
    marginHorizontal: 16,
    backgroundColor: '#a8a1a6',
  },
  title: {
    flex: 2,
    fontSize: 28,
    color: 'black',
  },
  groupImg: {
      marginTop: 10,
      marginRight: 20,
      width: 50,
      height: 50,
  },
  button: {
      width: 400,
      alignItems: 'center',
      color: '#73000',
    },
  buttonText: {
      textAlign: 'center',
      padding: 20,
      color: 'black',
  },
  buttonIcon: {
      width: 1,
      height: 1,
  },
  addButton: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      color: '#73000a',     
  }
});
