import React from 'react';
import {useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';

import {
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";
import { FloatingAction } from "react-native-floating-action";
import { DrawerItemList } from '@react-navigation/drawer';



export function PostsScreen({navigation}) {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [posts, setPosts] = useState([]); // Initial empty array of posts
  const [refreshing, setRefresh] = useState(false);

  const actions = [
    {
      text: "Add a Post",
      name: "bt_add_a_post",
      position: 1
    }
  ];


  const getPosts = () => {
    const subscriber = firestore()
    .collection('Posts').orderBy('upvoteCount', 'desc') //get the posts and order them by their upvote count
    .onSnapshot(querySnapshot => {
      const posts = [];

      querySnapshot.forEach(documentSnapshot => {
        posts.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setPosts(posts);
      setLoading(false);
    });     
    
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  

  const Post = ({ author, pfp, body, date, upvoteCount, replyCount,major, gradYear}) => (

      <View style={{flexDirection:'row', flex:1, marginHorizontal: 10}}>
        <View style={styles.upvoteBox}>
          <Text style={styles.upvote}>{upvoteCount}</Text>
        </View>
        <TouchableOpacity style={styles.post}>
            <View style={{flexDirection:'row'}}>
              <Image source={pfp ? {uri: pfp} : require('./assets/blank2.jpeg')}
                                  style={{height: 60, width: 60, borderRadius:40}}/>
                <View style={{flexDirection:'column'}}>
                  <Text style={styles.name}>{author}</Text>
                  <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    <Text style={{fontWeight:'bold',fontSize:12,textAlign:'auto',marginTop:'4%',marginLeft:'5%',color:'black'}}>{major}</Text>
                    <Text style={{fontWeight:'bold',fontSize:12,textAlign:'auto',marginTop:'4%',marginLeft:'1%',color:'black'}}>|</Text>
                    <Text style={{fontWeight:'bold',fontSize:12,textAlign:'auto',marginTop:'4%',marginLeft:'1%',color:'black'}}>Class of</Text>
                    <Text style={{fontWeight:'bold',fontSize:12,textAlign:'auto',marginTop:'4%',marginLeft:'1%',color:'black'}}>{gradYear}</Text>
                  </View>
                </View>
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

    const onRefresh = () => {
      setRefresh(true);
      getPosts();
      setRefresh(false);
    }


      const renderPost = ({ item }) => (
        <Post author={item.author} pfp={item.pfp} body={item.body} date={item.date} upvoteCount={item.upvoteCount} replyCount={item.replyCount} major={item.authorMajor} gradYear={item.authorGradYear}/>
      )

      return (
        <SafeAreaView style={styles.container}>
            <FlatList
              style={{marginTop: '5%'}}
              data={posts}
              renderItem={renderPost}
              keyExtractor={item => item.id}
              onRefresh={() => onRefresh()}
              refreshing={refreshing}
            />
            <FloatingAction
              onPressMain= { () => {
                console.log('create a post?');
              }}
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
      borderRadius:10,
      padding: 20,
      marginVertical: 8,
      marginRight: 30,
      alignSelf: 'flex-end',
      flex: 1
    },
    body: {
      fontSize: 18,
      color: 'black',
      marginTop: '5%',
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
      color: 'black',
    },
  });

