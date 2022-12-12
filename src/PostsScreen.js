import React from 'react';
import {useState, useEffect, useContext, useRef} from 'react';
import {
  SafeAreaView,
  Alert,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {FloatingAction} from 'react-native-floating-action';
import ImageView from 'react-native-image-viewing';
import moment from 'moment';
import AppContext from './AppContext';
import {color, sub} from 'react-native-reanimated';
import {pure} from 'recompose';
import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';
import iosstyles from './styles/ios/PostScreenStyles';
import androidstyles from './styles/android/PostScreenStyles';
import {TouchableHighlight} from 'react-native-gesture-handler';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SelectDropdown from 'react-native-select-dropdown'
import { SearchBar, Button } from '@rneui/themed';
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { LoadingIndicator } from 'stream-chat-react-native';

var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles;
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}

export function PostsScreen({navigation}) {
 /* if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }*/

  //Global userdata var
  const userData = useContext(AppContext);

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [posts, setPosts] = useState([]); // Initial empty array of posts
  const [images, setImages] = useState([]); // Initial empty array of posts
  const [imageIndex, setImageIndex] = useState(0); // Initial empty array of posts
  const [imageMap, setImageMap] = useState(new Map()); //a creative way to supres image error
  const [isVisible, setIsVisible] = useState(false);
  const [refreshing, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');
  const [postIsAnonymous,setPostIsAnonymous] = useState(false);
  const [sortMode, setSortMode] = useState('Best')
  const [postCount, setPostCount] = useState(6)
  const [search, setSearch] = useState("");
  const [image, setImage] = React.useState('');
  const [postUploading, setPostUploading] = useState(false);
  var transactionStarted = false;
  var url = '';


  const offsetHeight = Platform.OS === 'ios' ? 64 : -32 //keyboard view doesnt work on ios without this

  const list = useRef(FlashList);
  const sortingOptions = ["Best", "Worst", "New", "Anonymous"]

  const PostAlert = () => {
    Alert.alert('Post?', 'Are you sure you want to post?', [
      {text: 'Yes', onPress: () => CreatePost()},
      {text: 'No'},
    ]);
  };
  const DeletePostAlert = ({item}) => {
    if ('/Users/' + auth().currentUser.uid === item.user) {
      Alert.alert('Delete Post?', 'Are you sure you want to delete?', [
        {text: 'Yes', onPress: () => DeletePost({item})},
        {text: 'No'},
      ]);
    }
  };

  const getPosts = () => {
    setRefresh(true)
    console.log(search)
    var postsRef = firestore().collection('Posts')
    var query; 
    if(search) {
      query = postsRef
      .where('author', '>=', search)
      .where('author', '<=', search+ '\uf8ff')
      .limit(15)
    }
    else if(sortMode === 'Best') {
      query = postsRef
      .orderBy('upvoteCount', 'desc')
      .orderBy('date', 'desc')
      .limit(5)
    } else if (sortMode === 'Worst') {
      query = postsRef
      .orderBy('upvoteCount', 'asc')
      .orderBy('date', 'desc')
      .limit(5) 

    } else if (sortMode === 'New') {
      query = postsRef
      .orderBy('date', 'desc')
      .limit(5) 

    } else if (sortMode === 'Anonymous') {
      query = postsRef
      .where('author','==', 'Anonymous')
      .orderBy('upvoteCount', 'desc')
      .orderBy('date', 'desc')
      .limit(5) 
    }
    query.get().then(snapShot => {
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
      setRefresh(false)
    });
  }

  const CreatePost = async () => {
    if (
      postText &&
      postText.length < 1000 &&
      postText.split(/\r\n|\r|\n/).length <=
        25 /*this last one checks that there are not too many lines */
    ) {
      setPostUploading(true)
      if (image) {await uploadPic()}
      if(!postIsAnonymous){
        firestore()
          .collection('Posts')
          .doc()
          .set({
            author: userData.name,
            authorGradYear: userData.gradYear,
            authorMajor: userData.major,
            body: postText,
            replyCount: 0,
            upvoteCount: 1,
            date: firestore.FieldValue.serverTimestamp(),
            pfp: userData.pfp,
            replies: [],
            user: '/Users/' + auth().currentUser.uid,
            extraData: {url} ? url : '',
            upvoters: {[auth().currentUser.uid]: true},
            downvoters: new Map(),
          })
          .then(() => {
            closeModal()

          })
          .catch(error => {
            console.log(error.code);
          });
        }
      else if (postIsAnonymous) {
        firestore()
        .collection('Posts')
        .doc()
        .set({
          author: 'Anonymous',
          authorGradYear: '',
          authorMajor: '',
          body: postText,
          replyCount: 0,
          upvoteCount: 1,
          date: firestore.FieldValue.serverTimestamp(),
          pfp: '',
          replies: [],
          user: '/Users/' + auth().currentUser.uid,
          extraData: {url} ? url : '',
          upvoters: {[auth().currentUser.uid]: true},
          downvoters: new Map(),
        })
        .then(() => {
          closeModal()

        })
        .catch(error => {
          console.log(error.code);
        });
      }
    } else {
      PostError();
    }
  };


  useEffect(() => {
    //Make sure to only set this once next time


    navigation.setOptions({
      headerRight: () => (
        <SelectDropdown
        defaultButtonText='Sort'
        data={sortingOptions}
        buttonStyle={{width:110,height:20,backgroundColor:'#73000a'}}
        rowTextStyle={{fontSize:11}}
        buttonTextAfterSelection={(selectedItem,index) => {
          return selectedItem
        }}
        buttonTextStyle={{fontSize:12,color:'white',fontWeight:'bold'}}
        onSelect={(selectedItem, index) => {
          setPostCount(5)
          setSortMode(selectedItem)
          setPostCount(5)
        }}
      />
      ),
    });

    var postsRef = firestore().collection('Posts')
    var query; 
    if(search) {
      query = postsRef
      .where('author', '>=', search)
      .where('author', '<=', search+ '\uf8ff')
      .limit(15)
    }
    else if(sortMode === 'Best') {
      query = postsRef
      .orderBy('upvoteCount', 'desc')
      .orderBy('date', 'desc')
      .limit(postCount)
    } else if (sortMode === 'Worst') {
      query = postsRef
      .orderBy('upvoteCount', 'asc')
      .orderBy('date', 'desc')
      .limit(postCount) 

    } else if (sortMode === 'New') {
      query = postsRef
      .orderBy('date', 'desc')
      .limit(postCount) 

    } else if (sortMode === 'Anonymous') {
      query = postsRef
      .where('author','==', 'Anonymous')
      .orderBy('upvoteCount', 'desc')
      .orderBy('date', 'desc')
      .limit(postCount) 
    }
    if(!search){
    //gets posts asynchronously in the background
      const subscriber = query.onSnapshot(querySnapshot => {
          if (!querySnapshot.metadata.hasPendingWrites) {
            //This will prevent unecessary reads, because the firebase server may be doing something
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
                isDownVoted: false,
                postIsYours:false
              };
              post.isUpVoted = post.upvoters[auth().currentUser.uid];
              post.isDownVoted = post.downvoters[auth().currentUser.uid];
              post.postIsYours = post.user === '/Users/' + auth().currentUser.uid

              posts.push(post);
              if (post.extraData) {
                images.push({
                  uri: post.extraData,
                  key: documentSnapshot.id,
                });
                setImageMap(imageMap.set(postIndex, imageIndex));
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
    } else {
      query.get().then(snapShot => {
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
              isDownVoted: false,
              postIsYours:false
            }
            post.isUpVoted = post.upvoters[auth().currentUser.uid];
            post.isDownVoted = post.downvoters[auth().currentUser.uid];
            post.postIsYours = post.user === '/Users/' + auth().currentUser.uid
            
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
        }
      });
    }
  }, [navigation,sortMode,postCount,search]);

  const DeletePost = ({item}) => {
    firestore().collection('Posts').doc(item.key).delete();
  };
  const OpenImage = ({index}) => {
    setImageIndex(imageMap.get(index));
    setIsVisible(true);
  };

  //This code is very delicate and needs to be done right.
  const UpvotePost = async ({item}) => {
    if (!transactionStarted) {
      transactionStarted = true;
      const postRef = firestore().collection('Posts').doc(item.key);

      await firestore()
        .runTransaction(async transaction => {
          const post = await transaction.get(postRef);
          const postData = post.data();

          const isUpVoted = postData.upvoters[auth().currentUser.uid];
          const isDownVoted = postData.downvoters[auth().currentUser.uid];
          const upvoteCount = postData.upvoteCount;
          const userId = postData.user;
          
          if (isUpVoted) {
            transaction.update(postRef, {
              ['upvoters.' + auth().currentUser.uid]:
                firestore.FieldValue.delete(),
              upvoteCount: upvoteCount - 1,
            });
          } else if (!isUpVoted && !isDownVoted) {
            transaction.update(postRef, {
              ['upvoters.' + auth().currentUser.uid]: true,
              upvoteCount: upvoteCount + 1,
            });
          } else if (!isUpVoted && isDownVoted) {
            transaction.update(postRef, {
              ['upvoters.' + auth().currentUser.uid]: true,
              upvoteCount: upvoteCount + 2,
              ['downvoters.' + auth().currentUser.uid]:
                firestore.FieldValue.delete(),
            });
          }
        })
        .then(() => {
          transactionStarted = false;
        }).catch(() => {transactionStarted = false});
    }
  };

  const DownvotePost = async ({item}) => {
    if (!transactionStarted) {
      transactionStarted = true;
      const postRef = firestore().collection('Posts').doc(item.key);

      await firestore()
        .runTransaction(async transaction => {
          const post = await transaction.get(postRef);
          const postData = post.data();

          const isUpVoted = postData.upvoters[auth().currentUser.uid];
          const isDownVoted = postData.downvoters[auth().currentUser.uid];
          const upvoteCount = postData.upvoteCount;
          const userId = postData.user;

          if (isDownVoted) {
            transaction.update(postRef, {
              ['downvoters.' + auth().currentUser.uid]:
                firestore.FieldValue.delete(),
              upvoteCount: upvoteCount + 1,
            });
          }  else if (!isDownVoted && !isUpVoted) {
            transaction.update(postRef, {
              ['downvoters.' + auth().currentUser.uid]: true,
              upvoteCount: upvoteCount - 1,
            });
          } else if (!isDownVoted && isUpVoted) {
              transaction.update(postRef, {
                ['downvoters.' + auth().currentUser.uid]: true,
                upvoteCount: upvoteCount - 2,
                ['upvoters.' + auth().currentUser.uid]:
                  firestore.FieldValue.delete(),
              });

          }
        })
        .then(() => {
          transactionStarted = false;
        }).catch(() => {transactionStarted = false});
    }
  };
  const choosePhotoFromLibrary = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      mediaType: 'photo',
      cropping: true
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(error => {});
  };

  const uploadPic = async () => {
    const reference = storage().ref('/Posts/' +uuidv4());
    if (image) {
      await reference.putFile(image).catch(error => {
        FirebaseError(error.code);
      });
      url = await reference.getDownloadURL();
    }
  };

  const Post = ({item, index}) => {
    return (
      <View style={styles.postContainer}>
        <View style={styles.upvoteBox}>
          <TouchableOpacity onPress={() => UpvotePost({item})}>
            <Image
              style={styles.voteButtons}
              source={
                item.isUpVoted
                  ? require('./assets/upvote_highlighted.png')
                  : require('./assets/upvote.png')
              }></Image>
          </TouchableOpacity>
          <Text style={styles.upvote}>{item.upvoteCount}</Text>
          <TouchableOpacity onPress={() => DownvotePost({item})}>
            <Image
              style={styles.voteButtons}
              source={
                item.isDownVoted
                  ? require('./assets/downvote_highlighted.png')
                  : require('./assets/downvote.png')
              }></Image>
          </TouchableOpacity>
        </View>
        <Pressable
          elevation={20}
          delayLongPress={150}
          cancelable={false}
          android_ripple={styles.rippleConfig}
          style={
            Platform.OS === 'ios'
              ? ({pressed}) => [styles.post || {}, {opacity: pressed ? 0.9 : 1}]
              : styles.post
          }
          onLongPress={() => DeletePostAlert({item})}>
          <View style={styles.postUserImageAndInfoBox}>
            <Pressable onPress={() => Alert.alert('Navigate to user profile here')}>
              <FastImage
                defaultSource={require('./assets/blank2.jpeg')}
                source={
                  item.pfp ? {uri: item.pfp} : require('./assets/blank2.jpeg')
                }
                style={styles.postPfp}
              />
            </Pressable>
            {item.author !== 'Anonymous' ? (
              <View style={styles.postUserInfo}>
                <Text style={styles.name}>{item.postIsYours ? item.author + ' (You)' : item.author}</Text>
                <Text style={styles.majorText}>
                  {item.authorMajor} | {item.authorGradYear}
                </Text>
              </View>
            ) : (
              <Text style={styles.anonymousAuthorText}>{item.postIsYours ? item.author + ' (You)' : item.author}</Text>
            )}
          </View>
          <View style={styles.postImageView}>
            <Text style={styles.body}>{item.body}</Text>
            {item.extraData ? (
              <TouchableOpacity onPress={() => OpenImage({index})}>
                <FastImage
                  source={{uri: item.extraData}}
                  style={styles.postImage}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.dateAndReplyBox}>
            <Text style={styles.date}>
              {moment(new Date(item.date.toDate())).format(
                'MMMM Do YYYY, h:mm:ss a',
              )}
            </Text>
            <View style={styles.replyCountBox}>
              <Text style={styles.replies}>Replies: </Text>
              <Text style={styles.date}>{item.replyCount}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const closeModal = () => {
    this.floatingAction.animateButton();
    setPostUploading(false)
    setImage('')
    url = ''
    setPostIsAnonymous(false)
    setModalVisible(false)
    setPostText('');
  };

  const renderPost = ({item, index}) => <Post item={item} index={index} />;

  if (loading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (

    <SafeAreaView style={styles.container}>
      <SearchBar 
        containerStyle={{backgroundColor:'#73000a'}} 
        inputContainerStyle={{borderRadius:20,backgroundColor:'#FFF'}} 
        onChangeText={setSearch} 
        placeholder='Search a post by name' 
        value={search}>
      </SearchBar>
      {(posts.length == 0) &&
      <Text
      style={{
        color: 'white',
        fontSize: 32,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: '75%',
      }}>
      Kind of empty in here....
      </Text>}
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.floatingAction
        }}>
        <KeyboardAvoidingView keyboardVerticalOffset={offsetHeight} behavior="padding">
          <View style={styles.postView}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => closeModal()}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => PostAlert()}
                style={styles.postButton}>
                <Text style={styles.postButtonText}>Post?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.postTextView}>
              {postUploading ? 
              <ActivityIndicator></ActivityIndicator>
              :
              <TextInput
                style={styles.postInput}
                multiline={true}
                onChangeText={postText => setPostText(postText)}
                placeholder="Enter your post"
                textAlignVertical="top"
                placeholderTextColor="black"
                blurOnSubmit={false}
              />}
            </View>
            <View style={styles.bottomPostButtonsContainer}>
              <View style={styles.checkBoxBox}>
                <BouncyCheckbox
                  size={20}
                  
                  fillColor="#73000a"
                  disableBuiltInState={true}
                  style={{alignSelf:'flex-start',marginLeft:20,marginTop:20}}
                  isChecked={postIsAnonymous}
                  unfillColor="#FFFFFF"
                  text="Post Anonymously?"
                  iconStyle={{ borderColor: "#73000a"}}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={{ color:'black' }}
                  onPress={() => {setPostIsAnonymous(!postIsAnonymous)}}
                />
              </View>
                <Button 
                  containerStyle={styles.postImageAddButtonContainer}
                  buttonStyle={styles.postImageButton}
                  size='lg'
                  onPress={choosePhotoFromLibrary}
                  titleStyle={{fontSize:10,fontWeight:'bold'}}
                  title={image ? 'Image Loaded ✅' : 'Upload a picture'}
                  />

            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>


      <FlashList
       onRefresh={() => {getPosts}}
        onEndReached={() => {
          setPostCount(postCount+6)
        }}
        onEndReachedThreshold={.77}
        data={posts}
        ref={list}
        renderItem={renderPost}
        keyExtractor={item => item.key}
        refreshing={refreshing}
        estimatedItemSize={100}
      />
      <FloatingAction
        color="#73000a"
        ref={ref => {
          this.floatingAction = ref;
        }}
        onPressMain={() => {
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
  Alert.alert(
    'Post is too long',
    'Shorten your post to less than 1000 characters and 25 or less lines',
    [{text: 'Okay.'}],
  );
};