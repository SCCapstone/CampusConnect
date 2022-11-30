import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { SafeAreaView, Alert, View, KeyboardAvoidingView,FlatList, StyleSheet, Text, StatusBar, TextInput, Pressable, TouchableOpacity, ActivityIndicator, Modal,Image, Platform } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";
import { FloatingAction } from "react-native-floating-action";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ImageView from "react-native-image-viewing";

import moment from 'moment';

import AppContext from './AppContext';
import { color } from 'react-native-reanimated';
import { pure } from 'recompose';

import FastImage from 'react-native-fast-image'
import { FlashList } from "@shopify/flash-list";

import iosstyles from './styles/ios/PostScreenStyles';
import androidstyles from './styles/android/PostScreenStyles';
import { TouchableHighlight } from 'react-native-gesture-handler';

var styles;

if (Platform.OS === 'ios'){
  styles = iosstyles;
}
else if (Platform.OS === 'android') {
  styles = androidstyles
}


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
            isUpVoted: false,
            isDownVoted: false
          }
          post.isUpVoted = post.upvoters[auth().currentUser.uid];
          post.isDownVoted = post.downvoters[auth().currentUser.uid];
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

  const UpvotePost = async ({item}) => {
    const postRef = firestore().collection('Posts').doc(item.key);


    if(item.isUpVoted) {
      firestore().runTransaction(async (transaction) => {
        var newUpVoters = new Map()
        const post = await transaction.get(postRef);
        const newUpvoteCount = post.data().upvoteCount -1;
        newUpVoters.set(auth().currentUser.uid, firestore.FieldValue.delete)
        transaction.update(postRef,{upvoteCount:newUpvoteCount, upvoters: newUpVoters})
      });
    }

    else if (!item.isUpVoted){
      firestore().runTransaction(async (transaction) => {
        const post = await transaction.get(postRef);
        const newUpvoteCount = post.data().upvoteCount +1;
        const upvoters = post.data().upvoters

        transaction.update(postRef,{upvoteCount:newUpvoteCount, ['upvoters.'+auth().currentUser.uid]: true})
    
      });
    }
    else if (item.isDownVoted) {

    }
    else if (!item.isDownVoted) {
      
    }
  }

  
  const DownvotePost = async ({item}) => {
    const postRef = firestore().collection('Posts').doc(item.key);


    if(item.isDownVoted) {
      firestore().runTransaction(async (transaction) => {
        var newDownVoters = new Map()
        const post = await transaction.get(postRef);
        const newUpvoteCount = post.data().upvoteCount +1;
        newDownVoters.set(auth().currentUser.uid, firestore.FieldValue.delete)
        transaction.update(postRef,{upvoteCount:newUpvoteCount, downvoters: newDownVoters})
      });
    }

    else if (!item.isDownVoted){
      firestore().runTransaction(async (transaction) => {
        const post = await transaction.get(postRef);
        const newUpvoteCount = post.data().upvoteCount -1;
        const upvoters = post.data().upvoters

        transaction.update(postRef,{upvoteCount:newUpvoteCount, ['downvoters.'+auth().currentUser.uid]: true})
    
      });
    }
    else if (item.isUpVoted){

    }
    else if (!item.isUpVoted){
      
    }
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

          //Determine whether the user has upvoted or downvoted the post yet
          const post = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            isUpVoted: false,
            isDownVoted: false
          }
          post.isUpVoted = post.upvoters[auth().currentUser.uid];
          post.isDownVoted = post.downvoters[auth().currentUser.uid];


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


  const Post = pure(({item, index}) => {
    
    return (
      <View style={styles.postContainer}>
        <View style={styles.upvoteBox}>
          <TouchableOpacity onPress={() => UpvotePost({item})}>
            <Image  style={styles.voteButtons} source= {item.isUpVoted ? require('./assets/upvote_highlighted.png') : require('./assets/upvote.png') }></Image>
          </TouchableOpacity>
          <Text style={styles.upvote}>{item.upvoteCount}</Text>
          <TouchableOpacity onPress={() => DownvotePost({item})}>
            <Image style={styles.voteButtons} source={item.isDownVoted ? require('./assets/downvote_highlighted.png') : require('./assets/downvote.png')}></Image>
          </TouchableOpacity>
        </View>
        <Pressable elevation={20} android_ripple={styles.rippleConfig} style={ Platform.OS === 'ios' ? ({ pressed }) => [styles.post || {}, {opacity:pressed ? 0.9 : 1}] : styles.post} onLongPress={() => DeletePostAlert({item})}>
            <View style={styles.postUserImageAndInfoBox}>
              <FastImage defaultSource={require('./assets/blank2.jpeg')} source= {item.pfp ? {uri: item.pfp} : require('./assets/blank2.jpeg')}
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
                  <FastImage source={{uri: item.extraData}}
                                    style={styles.postImage}/></TouchableOpacity>: null}
            </View>
            <View style={styles.dateAndReplyBox}>
              <Text style={styles.date}>{moment(new Date(item.date.toDate())).format('MMMM Do YYYY, h:mm:ss a')}</Text>
              <View style={styles.replyCountBox}>
                <Text style={styles.replies}>Replies: </Text>
                <Text style={styles.date}>{item.replyCount}</Text>
              </View>
            </View>
        </Pressable>
      </View>
    )
  })


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
            <Modal style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  closeModal()
                }}
              >
              <KeyboardAvoidingView behavior='padding'>
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


              <FlashList
                data={posts}
                renderItem={renderPost}
                keyExtractor={item => item.key}
                onRefresh={() => onRefresh()}
                refreshing={refreshing}
                estimatedItemSize={150}
              />
              <FloatingAction
                color='#73000a'
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