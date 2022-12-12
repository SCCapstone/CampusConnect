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
import { SearchBar } from '@rneui/themed';

export function ClubsScreen({navigation}) {

  const [search, setSearch] = useState("");

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Carolina Mountaineering and White Water Club',
      img: 'https://se-images.campuslabs.com/clink/images/851a1e25-5995-4b5a-80be-93ba9f37aa0f1d0ef086-745e-4ab0-9533-db175728451e.jpg?preset=med-sq',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Intramural Ultimate Frisbee',
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Frisbee_090719.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Gamecock Barbell Club',
      img: 'https://se-images.campuslabs.com/clink/images/1d10a454-1496-4d77-b37b-32543c08af56b610ef6e-e88e-4919-8c65-8bf325b20374.jpg?preset=med-sq/transform/cc484be3-24c2-4315--71f252d70349/',
    },
  ];

  const actions = [
    {
        text: "Create Group",
        name: "bt_Create",
        icon: source={uri: 'https://cdn-icons-png.flaticon.com/512/60/60732.png'},
        position: 2,
        color: '#73000a',
    },
    {
        text: "Search Group",
        name: "bt_search",
        icon: source={uri:'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png'},
        position: 1,
        color: '#73000a',
    }
];

  const CreateAlert = () => {
    Alert.alert('This will take you to this button\'s group page');
  }

  const Item = ({item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image style={styles.groupImg} source={{uri: item.img}} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => CreateAlert()} />;
  };

return (
        <SafeAreaView style={styles.container}>
          <SearchBar containerStyle={{backgroundColor:'#73000a'}} inputContainerStyle={{borderRadius:20,backgroundColor:'#FFF'}} onChangeText={setSearch} placeholder='Enter a name to search' value={search}>
          </SearchBar>
            <FlatList
            data={DATA}
            renderItem={renderItem}
            >
            </FlatList>
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
    borderRadius:20,
    padding: 20,
    marginVertical: 8,
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
      borderRadius:20,
      resizeMode:'cover'
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