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
import { isMessageWithStylesReadByAndDateSeparator } from 'stream-chat-react-native';

export function SportsScreen({navigation}) {
const defaultItemCount = 10;

const [DATA, setDATA] = useState({items: [] });

useEffect(() => {
  const fetchData = async () => {
    const ret = await ScrapeSportData();
    setDATA(ret);
    }
  fetchData();
  console.log(DATA)
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

if (DATA == []) {
  return (
    <View>
      <ActivityIndicator size="large" color="#00ff00"></ActivityIndicator>
    </View>
  )
} else {
  return (
          <SafeAreaView style={styles.container}>
              <FlatList
                data={DATA}
                renderItem={({ item }) => {
                  return <View> 
                    <View style={styles.flexboxContainer}> 
                      <View style={styles.gcSide} /* Left side of sports card containing gc logo and sport name */> 
                        <Image style={styles.gcLogo} // Gamecocks Logo
                          source={require('./assets/gamecocks_logo.png')}/>
                          <Text style={styles.sportText}>{item[0]}</Text>
                      </View>

                      <View style={styles.innerStack} /* Middle portion containing date, time, location, home/away status */>
                          <Text style={styles.dateText}>{item[2]}</Text>
                          <Text style={styles.timeText}>{item[3]}</Text>
                          <Text style={styles.locationText}>{item[6]}</Text>
                          <Text style={styles.homeStatusText}>{item[7]}</Text>
                      </View>
                      
                      <View style={styles.opponentSide} /* Right side containing opp logo and name */ >
                        <Image style={styles.opponentLogo} // Opponent Logo
                            source={{uri: item[4]}}/>
                        <Text style={styles.opponentText}>{item[1]}</Text>
                      </View>
                    </View>
                  </View>
                }}
              />
          </SafeAreaView>
      );
 }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#73000a',
  },
  flexboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //alignItems: 'center',
    marginVertical: 5,
    borderRadius: 8,
    marginHorizontal: 16,
    height: 175,
    backgroundColor: '#a8a1a6',
    elevation: 30,
    shadowColor: '#171717',
  },
  gcSide: {
    flex: 1,
    flexDirection: 'column',
  },
  gcLogo: { // Gamecock Logo
    flex: 2,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 25,
    width: 60,
    height: 60,
  },
  sportText: { // Sport Text
    flex: 2,
    marginTop: 10,
    marginHorizontal: 'auto',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    flexWrap: 'wrap',
  },
  innerStack: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 35,
  },
  dateText: { // Date Text
    textAlign: 'center',
    color: 'black',
    fontWeight: "bold",
    fontSize: 20,
  },
  timeText: { // Time Text
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  locationText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
  },
  homeStatusText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
  },
  opponentSide: {
    flex: 1,
    flexDirection: 'column',
  },
  opponentLogo: { // Opponent Logo
    flex: 2,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 25,
    width: 60,
    height: 60,
  },
  opponentText: { // Opponent Text
    flex: 2,
    marginTop: 5,
    paddingBottom: 5,
    marginHorizontal: 'auto',
    textAlign: 'center', 
    fontSize: 20,
    color: 'black',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
});


