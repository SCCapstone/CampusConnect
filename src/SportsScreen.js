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
import { ScrapeSportData } from './SportScraper';
import { SearchBar } from '@rneui/themed';

export function SportsScreen({navigation}) {
const defaultItemCount = 10;

const [DATA, setDATA] = useState();

useEffect(() => {
  const fetchData = async () => {
    const ret = await ScrapeSportData();
    setDATA(ret);
    }
  fetchData();
}, []);



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

if (!DATA) {
  return (
    <View>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  )
} else {
  return (
          <SafeAreaView style={styles.container}>
             <SearchBar containerStyle={{backgroundColor:'#73000a'}} inputContainerStyle={{borderRadius:20,backgroundColor:'#FFF'}} onChangeText={setSearch} placeholder='Enter a name to search' value={search}></SearchBar>
              <FlatList
                data={DATA}
                renderItem={({ item }) => {
                  return <View style={styles.item}>
                    <Image
                      source={{uri: item[4]}}
                      style={styles.image}>
                    </Image>
                    <View style={{flex:1}}>
                      <Text style={styles.opponentText}>vs. {item[1]}</Text>
                      <Text style={styles.sportText}>{item[0]}</Text>
                      <Text style={styles.dateText}>{item[2]}</Text> 
                      <Text style={styles.timeText}>{item[3]}</Text>
                    </View>
                  </View>
                  
                  
                }}
              />
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
    padding: 40,
    marginVertical: 8,
    borderRadius:20,
    marginHorizontal: 16,
    backgroundColor: '#a8a1a6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: .3,
    shadowRadius: 20
  },
  title: {
    flex: 2,
    fontSize: 28,
    color: 'black',
  },
  image: {
      marginTop: 30,
      marginRight: 30,
      width: 70,
      height: 70,
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
  },
  dateText: {
      fontSize: 20,
      color: 'black',
  },
  timeText: {
      fontSize: 20,
      color: 'black',
  },
  sportText: {
      fontSize: 20,
      color: 'black',
  },
  opponentText: {
      fontSize: 30,
      fontWeight:'bold',
      color: 'black',
  },
});
