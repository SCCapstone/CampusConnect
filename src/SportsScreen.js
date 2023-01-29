import React, {useState} from 'react';
import {
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
import { SearchBar } from '@rneui/themed';
import { ScrapeSportData } from './SportScraper';

export function SportsScreen({navigation}) {

var DATA = new Array();
const [search, setSearch] = useState("");
  
async function UseSportScraper() {
  var events = await ScrapeSportData();
  console.log(events);
}

UseSportScraper();

/*
 sport scraper now displays data in the data log, but i need to find a way to use data
 within the async function with the rest of the app, including making a nice interface
 everything. this will be the focus of the jan 30 - feb 5 week.
 */

  const actions = [
    {
        text: "Search for a team or game",
        name: "bt_search",
        icon: source={uri:'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png'},
        position: 1,
        color: '#73000a',
    }
];

  const CreateAlert = () => {
    Alert.alert('This will take you to this button\'s sport\'s page');
  }

  const Item = ({item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{item.sport + "\n" + item.opponent + "\n" + item.date + "\n" + item.time}</Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => CreateAlert()} />;
  };


  
return (
        <SafeAreaView style={styles.container}>
           <SearchBar containerStyle={{backgroundColor:'#73000a'}} inputContainerStyle={{borderRadius:20,backgroundColor:'#FFF'}} onChangeText={setSearch} placeholder='Enter a name to search' value={search}></SearchBar>
            <FlatList
            data={DATA}
            renderItem={renderItem}
            >
            </FlatList>
            <FloatingAction color='#73000a' actions={actions} onPress={ () => CreateAlert()} />
        </SafeAreaView>
    );
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
