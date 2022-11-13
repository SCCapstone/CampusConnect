import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

export function PostsScreen({navigation}) {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: '58694a0f-3da1-471f-bd76-145571e29d72',
          title: 'Fourth Item',
        },
        {
          id: '58694a0f-3da1-471f-bd26-145571e29d72',
          title: 'Fifth Item',
        },
        {
            id: '58694a0f-3da1-471f-bd26-145571a29d72',
            title: 'Sixth Item',
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571f29d72',
            title: 'Seventh Item',
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571e29d52',
            title: 'Eighth Item',
          },
          {
            id: '58694a0f-3da1-471f-bd26-145571e29d62',
            title: 'Ninth Item',
          },

      ];

    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );

      const renderItem = ({ item }) => (
        <Item title={item.title} />
      );

      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#808080',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

