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

export function SportsScreen({navigation}) {

  const [search, setSearch] = useState("");
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'USC VS. Georgia Swim Meet at Blatt Natatorium',
      img: 'https://images.rivals.com/image/upload/f_auto,q_auto/f0wv2kjrvsdmn0e3f7sk',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'USC VS. Tennessee Football at Williams Brice Stadium',
      img: 'https://cdn.vox-cdn.com/thumbor/8uZZv_G7q-VIvd5dkGG0k2Ez4-8=/0x0:2661x2050/1200x800/filters:focal(792x536:1216x960)/cdn.vox-cdn.com/uploads/chorus_image/image/71651720/usa_today_19469372.0.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'USC Women\'s Basketball VS. UConn at Colonial Life Arena',
      img: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg4NTE1MzU3OTI3OTQxNzQ4/aliyah-boston-paige-bueckers-final-preview.jpg',
    },
  ];

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
