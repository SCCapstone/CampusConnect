import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

import {
  Image,
} from 'react-native';

export function PostsScreen({navigation}) {
  
    const POSTS = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-4ad53abb28bc',
        poster: 'Jay Neumann',
        date: '11/19/2022 11:21:46 PM',
        body: 'ayoooooo TENNESSEE SUCKS LETS GOOOO!!!! 🐔🐔🐔🐔',
        upvoteCount: 1523,
        replyCount: 100,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/1dd5c-1fk-jljctxmq9lfbzs8g8bq-1.jpeg?alt=media&token=400b36b1-8430-49ce-aca0-077c0f50bef5'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
        poster: 'Shelby Foster',
        date: '11/12/2022 4:19:25 PM',
        body: 'total weirdo on greene street last night was staring at me 🤢',
        upvoteCount: 25,
        replyCount: 2,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/dM4DrsLJ8GbyJMG4g3p18LFmolj1?alt=media&token=2e847802-258d-4ed6-8135-813ecacf8c2e'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb18ba',
        poster: 'Terrence McDowell',
        date: '11/17/2022 10:01:26 AM',
        body: 'why am i so bad at calculus bro',
        upvoteCount: 5,
        replyCount: 1,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/N2OeS2HfAVgLyI40I8yjRoMoGRk1?alt=media&token=22708d94-dec1-40be-9553-a61325e2b9ed'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        poster: 'John Boughner',
        date: '11/19/2022 3:22:10 PM',
        body: 'dude wtf',
        upvoteCount: 2,
        replyCount: 0,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/ZDgQC6VvlhfyRyo9FNagHlEqXim1?alt=media&token=b0c3b860-cd5f-4b55-9d1f-ef55eca0dde1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
        poster: 'Anonymous',
        date: '11/19/2022 7:00:16 AM',
        body: 'it\'s 7 am and that dude at mcbryde is still making noises in the morning',
        upvoteCount: 2,
        replyCount: 1,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/blank2.jpeg?alt=media&token=c0f57795-39fb-4306-a851-271a678c4bf2'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
        poster: 'Andrew Anderson',
        date: '11/15/2022 9:01:12 AM',
        body: 'does anyone know how to get intot the close hipp building',
        upvoteCount: -1,
        replyCount: 1,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/stHvR8AtYiUPHGk8YhQ13EuNfP52?alt=media&token=9b225c37-cc72-447b-9650-d86dc37732f5'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53fbb28bd',
        poster: 'Anonymous',
        date: '11/20/2022 10:04:52 PM',
        body: 'i am a potato',
        upvoteCount: -25,
        replyCount: 1,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/campusconnect-45088.appspot.com/o/blank2.jpeg?alt=media&token=c0f57795-39fb-4306-a851-271a678c4bf2'
      },
      ];

    const Post = ({ poster, imageUrl, body, date, upvoteCount, replyCount}) => (
        <View style={{flexDirection:'row', flex:1}}>
          <View style={styles.upvoteBox}>
            <Text style={styles.upvote}>{upvoteCount}</Text>
          </View>
          <View style={styles.post}>
              <View style={{flexDirection:'row'}}>
                <Image source={{uri: imageUrl}}
                                    style={{height: 50, width: 50, borderRadius:40}}/>
                <Text style={styles.name}>{poster}</Text>
              </View>
              <Text style={styles.body}>{body}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.date}>{date}</Text>
                <View style={{flexDirection:'row', marginLeft:150}}>
                  <Text style={styles.date}>Replies: </Text>
                  <Text style={styles.date}>{replyCount}</Text>
                </View>
              </View>
          </View>
        </View>
      );

      const renderPost = ({ item }) => (
        <Post poster={item.poster} imageUrl={item.imageUrl} body={item.body} date={item.date} upvoteCount={item.upvoteCount} replyCount={item.replyCount}/>
      );

      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={POSTS.sort()}
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
      backgroundColor: '#cecece',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 5,
      alignSelf: 'flex-end',
      flex:1
    },
    body: {
      fontSize: 18,
      color: 'black',
      marginTop: 10,
      justifyContent: 'center'
    },
    upvoteBox: {
      height: 40,
      width:40,
      marginHorizontal:2,
      backgroundColor: '#f2f2f2',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf:'center'
    },
    upvote: {
      fontSize: 10,
      alignSelf:'center',
      textAlignVertical:'center',
      color: 'black',
    },
    date: {
      fontSize: 10,
      marginTop:20,
      color: 'black',
      fontStyle: 'italic'
    },
    name: {
      fontSize: 24,
      marginLeft:20,
      color: 'black'
    },
  });

