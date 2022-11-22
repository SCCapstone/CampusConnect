import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { SafeAreaView, Alert, View, KeyboardAvoidingView,FlatList, StyleSheet, Text, StatusBar, TextInput, Pressable, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";
import { FloatingAction } from "react-native-floating-action";
import { DrawerItemList } from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image'

import moment from 'moment';

import AppContext from './AppContext';



export function PostsScreen({navigation}) {

  //Global userdata var
  const userData = useContext(AppContext);

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [posts, setPosts] = useState([]); // Initial empty array of posts
  const [refreshing, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');


  const PostAlert = () => {
    Alert.alert('Post?', "Are you sure you want to post?", [
      { text: "Yes",
      onPress: () => CreatePost()},
      { text: "No"}
    ] );
  }

  const CreatePost = () => {

    if (postText && postText.length < 1000) {
      firestore()
      .collection('Posts')
      .doc()
      .set({
        author: userData.name,
        authorGradYear: userData.gradYear,
        authorMajor: userData.major,
        body: postText,
        replyCount:0,
        upvoteCount:1,
        date: moment(firestore.Timestamp.now().toDate()).format('MMMM Do YYYY, h:mm:ss a'),
        pfp: userData.pfp,
        replies: [],
        user: '/Users/'+auth().currentUser.uid
      })
      .then(() => closeModal())
      .catch(error => {
        console.log(error.code)
      });
    }
    else {
      PostError();
    }
  }

  const getPosts = () => {
    firestore()
    .collection('Posts').orderBy('upvoteCount', 'desc').get().then(snapShot => {
      const posts = [];
      snapShot.forEach(documentSnapshot => {
        posts.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setPosts(posts);
      setLoading(false);
    });
  }

  useEffect(() => {
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
              <FastImage source= {pfp ? {uri: pfp} : require('./assets/blank2.jpeg')}
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
              <View style={{flexDirection:'row', marginLeft:'30%'}}>
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

    const closeModal = () => {
      this.floatingAction.animateButton();
    }


    const renderPost = ({ item }) => (
      <Post author={item.author} pfp={item.pfp} body={item.body} date={item.date} upvoteCount={item.upvoteCount} replyCount={item.replyCount} major={item.authorMajor} gradYear={item.authorGradYear}/>
    )

      return (
        <SafeAreaView style={styles.container}>
            <Modal style={{flex:1}}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  closeModal()
                }}
              >
              <KeyboardAvoidingView>
                <View style={styles.postView}>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={ () => closeModal()} style={styles.cancelButton}>
                      <Text style={{fontWeight:'bold', fontSize:14, textAlign:'left',color:"black"}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => PostAlert()} style={styles.postButton}>
                      <Text style={{fontWeight:'bold', fontSize:14,justifyContent:'flex-end',color:'black'}}>Post?</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.postTextView}>
                      <TextInput
                        style={styles.postInput}
                        multiline={true}
                        onChangeText={(postText) => setPostText(postText)}
                        placeholder="Enter ur post"
                        textAlignVertical='top'
                        placeholderTextColor="black"
                        blurOnSubmit={false}
                      />
                    </View>
                    
                </View>
                </KeyboardAvoidingView>
              </Modal>


              <FlatList
                style={{marginTop: '5%'}}
                data={posts}
                renderItem={renderPost}
                keyExtractor={item => item.key}
                onRefresh={() => onRefresh()}
                refreshing={refreshing}
              />
              <FloatingAction
                ref={(ref) => { this.floatingAction = ref; }}
                onPressMain= { () => {
                  setModalVisible(!modalVisible);
                }}
              />
          </SafeAreaView>
      );
}

const PostError = () => {
  Alert.alert('Post is too long', "Shorten your post to less than 1000 characters", [
    { text: "Okay.",}
  ] );
}

const styles = StyleSheet.create({
    postView: {
      height:'45%',
      width:'90%',
      backgroundColor: 'white',
      alignSelf:'center',
      marginTop:'60%',
      borderRadius:20,
      justifyContent:'center'

    },
    postTextView: {
      flex:.82,
      borderRadius:20,
      justifyContent:'center',
      marginTop:'5%',
      marginHorizontal:'10%',
      backgroundColor: '#f2f2f2',
    },
    postInput: {
      backgroundColor: '#f2f2f2',
      flex: 1,
      color: 'black',
      marginHorizontal:'2%',
      marginVertical:'2%',
      borderRadius: 20,
    },
    postButton: {
      marginLeft:'57%',
      marginBottom:'1%',
    },
    cancelButton: {
      alignSelf:'flex-start',
      marginLeft:'10%',
      marginBottom:'1%'
    },
    container: {
      flex: 1,
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
      marginRight: '5%',
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

