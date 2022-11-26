import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { SafeAreaView, Alert, View, KeyboardAvoidingView,FlatList, StyleSheet, Text, StatusBar, TextInput, Pressable, TouchableOpacity, ActivityIndicator, Modal,Image } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";
import { FloatingAction } from "react-native-floating-action";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ImageView from "react-native-image-viewing";

import moment from 'moment';

import AppContext from './AppContext';



export function PostsScreen({navigation}) {

  //Global userdata var
  const userData = useContext(AppContext);

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [posts, setPosts] = useState([]); // Initial empty array of posts
  const [images, setImages] = useState([]); // Initial empty array of posts
  const [imageIndex, setImageIndex] = useState(0); // Initial empty array of posts
  const [imageMap,setImageMap] = useState(new Map()); //a creative way to supres image error
  const [isVisible, setIsVisible] = useState(false);
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
  const DeletePostAlert = ({item}) => {
    if ('/Users/'+auth().currentUser.uid === item.user) {
      Alert.alert('Delete Post?', "Are you sure you want to delete?", [
        { text: "Yes",
        onPress: () => DeletePost({item})},
        { text: "No"}
      ] );
    }

  }

  const CreatePost = () => {

    if (postText && postText.length < 1000 && postText.split(/\r\n|\r|\n/).length <= 25 /*this last one checks that there are not too many lines */) {
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
        date: firestore.FieldValue.serverTimestamp(),
        pfp: userData.pfp,
        replies: [],
        user: '/Users/'+auth().currentUser.uid,
        extraData: '',
        upvoters: {[auth().currentUser.uid]:true},
        downvoters: new Map(),
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
    .collection('Posts').orderBy('upvoteCount', 'desc').orderBy('date','desc').get().then(snapShot => {
      if(!snapShot.metadata.hasPendingWrites) {
        postIndex = 0;
        var imageIndex = 0;
        const posts = [];
        const images = [];
        snapShot.forEach(documentSnapshot => {
          const post = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          }
          posts.push(post);
          if (post.extraData){
            images.push({
              uri: post.extraData,
              key: documentSnapshot.id
            })
            setImageMap(imageMap.set(postIndex,imageIndex))
            imageIndex++;
          }
          postIndex++;
        });
        setPosts(posts);
        setImages(images);
        setLoading(false);
      }
      
    });
  }

  const DeletePost = ({item}) => {
    firestore().collection('Posts').doc(item.key).delete();
  }
  const OpenImage = ({index}) => {
    setImageIndex(imageMap.get(index))
    setIsVisible(true);
  }

  const UpvotePost = ({item}) => {

  }
  const DownvotePost = ({item}) => {

  }

  useEffect(() => { //gets posts asynchronously in the background
    const subscriber = firestore()
    .collection('Posts').orderBy('upvoteCount', 'desc').orderBy('date','desc') //get the posts and order them by their upvote count
    .onSnapshot(querySnapshot => {
      if (!querySnapshot.metadata.hasPendingWrites) {  //This will prevent unecessary reads, because the firebase server may be doing something
        postIndex = 0;
        var imageIndex = 0;
        const posts = [];
        const images = [];
        querySnapshot.forEach(documentSnapshot => {
          const post = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          }
          posts.push(post);
          if (post.extraData){
            images.push({
              uri: post.extraData,
              key: documentSnapshot.id
            })
            setImageMap(imageMap.set(postIndex,imageIndex))
            imageIndex++;
          }
          postIndex++;
          
        });

        setPosts(posts);
        setImages(images);
        setLoading(false);
      }
    });     
    
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);


  const Post = React.memo(({item, index}) => (

    <View style={styles.postContainer}>
      <View style={styles.upvoteBox}>
        <Text style={styles.upvote}>{item.upvoteCount}</Text>
      </View>
      <Pressable style={styles.post} onLongPress={() => DeletePostAlert({item})}>
          <View style={styles.postUserImageAndInfoBox}>
            <Image source= {item.pfp ? {uri: item.pfp} : require('./assets/blank2.jpeg')}
                                style={styles.postPfp}/>
              {item.author !== 'Anonymous' ?
              <View style={styles.postUserInfo}>

                <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.majorText}>{item.authorMajor} | Class of {item.authorGradYear}</Text>
              </View>: <Text style={styles.anonymousAuthorText}>{item.author}</Text>}
          </View>
          <View style={styles.postImageView}>
            <Text style={styles.body}>{item.body}</Text>
            {item.extraData ?
              <TouchableOpacity onPress={() => OpenImage({index})}>
                <Image source={{uri: item.extraData}}
                                  style={styles.postImage}/></TouchableOpacity>: null}
          </View>
          <View style={styles.dateAndReplyBox}>
            <Text style={styles.date}>{moment(new Date(item.date.toDate())).format('MMMM Do YYYY, h:mm:ss a')}</Text>
            <View style={styles.replyCountBox}>
              <Text style={styles.date}>Replies: </Text>
              <Text style={styles.date}>{item.replyCount}</Text>
            </View>
          </View>
      </Pressable>
    </View>

  ))


    const onRefresh = () => {
      setRefresh(true);
      getPosts();
      setRefresh(false);
    }

    const closeModal = () => {
      this.floatingAction.animateButton();
      setPostText("");
    }

    if (loading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    const renderPost = ({ item, index }) => (
      <Post item={item} index={index}/>
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
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => PostAlert()} style={styles.postButton}>
                      <Text style={styles.postButtonText}>Post?</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.postTextView}>
                      <TextInput
                        style={styles.postInput}
                        multiline={true}
                        onChangeText={(postText) => setPostText(postText)}
                        placeholder="Enter your post"
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
              <ImageView
                images={images}
                
                imageIndex={imageIndex}
                visible={isVisible}
                keyExtractor={item => item.key}
                onRequestClose={() => setIsVisible(false)}
              />
          </SafeAreaView>
      );
}

const PostError = () => {
  Alert.alert('Post is too long', "Shorten your post to less than 1000 characters and 25 or less lines", [
    { text: "Okay.",}
  ] );
}

const styles = StyleSheet.create({
  postUserImageAndInfoBox: {flexDirection:'row',flex:1},
  dateAndReplyBox: {flexDirection:'row'},
    replyCountBox: {flexDirection:'row', marginLeft:'30%'},
    postUserInfo:{flexDirection:'column',flex:1},
    postImageView: {flexDirection:'column',flex:1},
    anonymousAuthorText: {textAlignVertical:'center',fontSize: 24, marginLeft:20,color: 'black',},
    postImage: {marginTop:20,alignSelf:'center',borderRadius:10,height:200,width:290},
    cancelButtonText: {fontWeight:'bold', fontSize:14, textAlign:'left',color:"black"},
    postButtonText:{fontWeight:'bold', fontSize:14,justifyContent:'flex-end',color:'black'},
    majorText : {fontWeight:'bold',fontSize:12,textAlign:'auto',marginTop:'4%',marginLeft:'5%',color:'black'},
    postPfp: {height: 60, width: 60, borderRadius:40},

    postContainer: {
      flexDirection:'row', flex:1
    },
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
      backgroundColor: '#a8a1a6',
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
      justifyContent:'center',
      fontSize: 24,
      marginLeft:20,
      color: 'black',
    },
  });


