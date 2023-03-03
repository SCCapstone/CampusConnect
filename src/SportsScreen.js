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
import { ScrapeSportData, ScrapeMoreSportData } from './SportScraper';
import { SearchBar } from '@rneui/themed';
import androidstyles from './styles/android/SportsScreenStyles';
import iosstyles from './styles/ios/SportsScreenStyles';

var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles;
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}

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
    <SafeAreaView style={styles.loadingContainer}>
      <View>
        <ActivityIndicator style={styles.loadingSymbol}
          size="large"></ActivityIndicator>
      </View>
    </SafeAreaView>
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
                onEndReachedThreshold={0.05}
                onEndReached={() => {
                  ScrapeMoreSportData();
                }}
              />
          </SafeAreaView>
      );
 }
}