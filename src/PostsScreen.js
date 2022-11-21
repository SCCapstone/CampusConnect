import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import {
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';



export function PostsScreen({navigation}) {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [posts, setPosts] = useState([]); // Initial empty array of users

  useEffect(() => {
    console.log('hello')
    const subscriber = firestore()
      .collection('Posts') //get the posts and order them by their upvote count
      .onSnapshot(querySnapshot => {
        const posts = [];
  
        querySnapshot.forEach(documentSnapshot => {
          posts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log('hello')
        setPosts(posts);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  

    const Post = ({ author, pfp, body, date, upvoteCount, replyCount}) => (

        <View style={{flexDirection:'row', flex:1, marginHorizontal: 10}}>
          <View style={styles.upvoteBox}>
            <Text style={styles.upvote}>{upvoteCount}</Text>
          </View>
          <TouchableOpacity style={styles.post}>
              <View style={{flexDirection:'row'}}>
                <Image source={pfp ? {uri: pfp} : require('./assets/blank2.jpeg')}
                                    style={{height: 50, width: 50, borderRadius:40}}/>
                <Text style={styles.name}>{author}</Text>
              </View>
              <Text style={styles.body}>{body}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.date}>{date}</Text>
                <View style={{flexDirection:'row', marginLeft:100}}>
                  <Text style={styles.date}>Replies: </Text>
                  <Text style={styles.date}>{replyCount}</Text>
                </View>
              </View>
          </TouchableOpacity>
        </View>

      );

      const renderPost = ({ item }) => (
        <Post author={item.author} imageUrl={item.pfp} body={item.body} date={item.date} upvoteCount={item.upvoteCount} replyCount={item.replyCount}/>
      );

      return (
        <SafeAreaView style={styles.container}>
            <FlatList
              data={posts}
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
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
    post: {
      backgroundColor: '#c8c4c7',
      padding: 20,
      marginVertical: 8,
      marginRight: 20,
      alignSelf: 'flex-end',
      flex: 1
    },
    body: {
      fontSize: 18,
      color: 'black',
      marginTop: 10,
      justifyContent: 'center'
    },
    upvoteBox: {
      height: 40,
      width:35,
      marginRight:5,
      backgroundColor: '#f2f2f2',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf:'center'
    },
    upvote: {
      fontSize: 15,
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

