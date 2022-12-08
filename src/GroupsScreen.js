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

export function GroupsScreen({navigation}) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'CSCE 490: Capstone Project',
      img: 'https://capstone.cse.sc.edu/big-c-white-128x128.png',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Intramural Ultimate Frisbee',
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Frisbee_090719.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'World Cup Watch Party',
      img: 'https://digitalhub.fifa.com/transform/cc484be3-24c2-4315-a331-71f252d70349/Brand_Protection_fwc2022_oe_4ct_3D_ps_l',
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