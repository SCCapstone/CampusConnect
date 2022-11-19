import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

import {
  Image,
} from 'react-native';

export function PostsScreen({navigation}) {

    const POSTS = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          poster: 'John Bougher',
          date: '11/19/2022 3:21:26 PM',
          body: 'dude wtf',
          upvoteCount: 2,
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/stHvR8AtYiUPHGk8YhQ13EuNfP52?alt=media&token=9b225c37-cc72-447b-9650-d86dc37732f5'
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb18ba',
          poster: 'Terrence McDowel',
          date: '11/17/2022 10:21:26 AM',
          body: 'why am i so bad at calculus bro',
          upvoteCount: 5,
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/stHvR8AtYiUPHGk8YhQ13EuNfP52?alt=media&token=9b225c37-cc72-447b-9650-d86dc37732f5'
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
          poster: 'Andrew Anderson',
          date: '11/15/2022 9:00:12 AM',
          body: 'does anyone know how to get intot the close hipp building',
          upvoteCount: -1,
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/stHvR8AtYiUPHGk8YhQ13EuNfP52?alt=media&token=9b225c37-cc72-447b-9650-d86dc37732f5'
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
          poster: 'Anonymous',
          date: '11/19/2022 7:00:16 AM',
          body: 'it\'s 7 am and that dude at mcbryde is still making noises in the morning',
          upvoteCount: 2,
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/stHvR8AtYiUPHGk8YhQ13EuNfP52?alt=media&token=9b225c37-cc72-447b-9650-d86dc37732f5'
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
          poster: 'Shelby Foster',
          date: '11/12/2022 4:21:26 PM',
          body: 'total weirdo on greene street last night staring at people',
          upvoteCount: 25,
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/stHvR8AtYiUPHGk8YhQ13EuNfP52?alt=media&token=9b225c37-cc72-447b-9650-d86dc37732f5'
        },
      ];

    const Post = ({ poster, imageUrl, body, date, upvoteCount}) => (
        <View style={styles.post}>
          <View style={{flexDirection:'row'}}>
            <Image source={{uri: imageUrl}}
                                style={{height: 40, width: 40, borderRadius:40}}/>
            <Text style={styles.name}>{poster}</Text>
          </View>
          <Text style={styles.body}>{body}</Text>
        </View>
      );

      const renderPost = ({ item }) => (
        <Post poster={item.poster} imageUrl={item.imageUrl} body={item.body}/>
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
    post: {
      backgroundColor: '#808080',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    body: {
      fontSize: 24,
      marginLeft:10
    },
    name: {
      fontSize: 24,
      marginLeft:20
    },
  });

