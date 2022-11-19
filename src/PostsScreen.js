import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

export function PostsScreen({navigation}) {

    const POSTS = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          poster: 'John Bougher',
          date: '11/19/2022 3:21:26 PM',
          body: 'dude wtf',
          upvoteCount: 100
        },

      ];

    const Post = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );

      const renderPost = ({ item }) => (
        <Post title={item.title} />
      );

      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={POSTS}
            renderItem={renderPost}
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

