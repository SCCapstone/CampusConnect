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
  FlatList,
  TouchableOpacity,
  ScrollView,
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
import LinearGradient from 'react-native-linear-gradient';
import {color, sub, ZoomIn} from 'react-native-reanimated';
import {pure} from 'recompose';
import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';
import {launchImageLibrary} from 'react-native-image-picker';
import { useHeaderHeight } from '@react-navigation/elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import {
Delete,
useTheme,
} from 'stream-chat-react-native';


import { TouchableHighlight,RectButton, gestureHandlerRootHOC} from 'react-native-gesture-handler';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SelectDropdown from 'react-native-select-dropdown'
import { SearchBar, Button, ListItem, Avatar ,Input,Icon} from '@rneui/themed';
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { AnimatedGalleryImage, LoadingIndicator } from 'stream-chat-react-native';


import { Freeze } from "react-freeze";

import iosstyles from './styles/ios/PostScreenStyles';
import iosCommentStyles from './styles/ios/CommentStyles'
import androidstyles from './styles/android/PostScreenStyles';
import androidCommentStyles from './styles/android/CommentStyles'

var styles;
var commentStylesl

if (Platform.OS === 'ios') {
  styles = iosstyles;
  commentStyles = iosCommentStyles
} else if (Platform.OS === 'android') {
  styles = androidstyles;
  commentStyles = androidCommentStyles
}

export function PostsScreen({navigation}) {

  POST_COLLECTION_NAME = 'Posts'
  POST_STORAGE_NAME = '/Posts/'
  ANONYMOUS_USER_NAME = 'USC Student'
  RESET_PATH = 'Home'


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
  const [editModalVisible,setEditModalVisile] = useState(false)
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [postText, setPostText] = useState('');
  const [postIsAnonymous,setPostIsAnonymous] = useState(false);
  const [sortMode, setSortMode] = useState('Best')
  const [postCount, setPostCount] = useState(6)
  const [search, setSearch] = useState("");
  const [image, setImage] = React.useState('');
  const [postUploading, setPostUploading] = useState(false);
  const [reply, setReply] = React.useState('');
  const [replyItem,setReplyItem] = React.useState()
  const [post,setPost] = useState();
  const [postReplySubscriber,setPostReplySubscriber] = useState();
  const [postReplies, setPostReplies] = useState([])
  const [repliesLoading,setRepliesLoading] = useState(false)
  const [refresh, setRefreshList] = useState(false)
  var transactionStarted = false;
  var url = '';


  const headerHeight = useHeaderHeight();

  const offsetHeight = Platform.OS === 'ios' ? -25 : -1000 //keyboard view doesnt work on ios without this
  const offsetHeightPadding = Platform.OS ==='ios' ? 0 : -64

  const list = useRef(FlashList);
  const sortingOptions = ["Best", "Worst", "New", "Anonymous", "Most Commented"]
  const postOptions = ["Reply", "Edit","Delete"]
  const postOptions2 = ["Reply"]



  const PostAlert = () => {
    Alert.alert('Post?', 'Are you sure you want to post?', [
      {text: 'Yes', onPress: () => CreatePost()},
      {text: 'No'},
    ]);
  };
  const DeletePostAlert = ({item}) => {
    if (auth().currentUser.uid === item.user) {
      Alert.alert(item.isReply?'Delete Reply':'Delete Post?', 'Are you sure you want to delete?', [
        {text: 'Yes', onPress: () => DeletePost({item})},
        {text: 'No'},
      ]);
    }
  };

  //Apply the same bug fix with the order of the replies here
  const getReplies = async (item) => {
    setRepliesLoading(true)
    const postReplies= [];
    var postsRef = firestore().collection(POST_COLLECTION_NAME).doc(item.key)
    promises = []
    //gets posts asynchronously in the background
    postsRef.get().then( doc => {
      const replies = doc.get('replies');
      for(firebaseReply of replies){
        var replyRef = firestore().collection('Replies').doc(firebaseReply)
        promises2 = []

        //Create a promise for each request and put it into a promise array. This allows us to load asynchronously
        promise = replyRef.get().then(async reply => {
          return firestore().collection('Users').doc(reply.get('user')).get().then( data => {
            user = ({...data.data()})
            const tempReply = {
              ...reply.data(),
              key:reply.id,
              isUpVoted: false,
              isDownVoted: false,
              postIsYours:false
            }
            tempReply.pfp = user.pfp
            tempReply.author = user.name
            if (reply.data().author === ANONYMOUS_USER_NAME) {
              tempReply.author = ANONYMOUS_USER_NAME
              tempReply.pfp = ''
            }
            tempReply.isUpVoted = tempReply.upvoters[auth().currentUser.uid];
            tempReply.isDownVoted = tempReply.downvoters[auth().currentUser.uid];
            tempReply.postIsYours = tempReply.user === auth().currentUser.uid
            postReplies.push(tempReply);

          })

        });
        promises.push(promise)

      }
      Promise.all(promises).then(() => {
        setPostReplies(postReplies.sort(function(a,b) {return a.date - b.date;}))
        setRepliesLoading(false)
        setRefreshList(!refresh)
      })

    })
  
  }

  const getPosts = () => {
    setRefresh(true);
    var postsRef = firestore().collection(POST_COLLECTION_NAME)
    var query; 
    if(search) {
      query = postsRef
      .where('searchAuthor', '>=', search.toUpperCase())
      .where('searchAuthor', '<=', search.toUpperCase()+ '\uf8ff')
      //.limit(15)
    }
    else if(sortMode === 'Best') {
      query = postsRef
      .orderBy('upvoteCount', 'desc')
      .orderBy('date', 'desc')
      //.limit(5)
    } else if (sortMode === 'Worst') {
      query = postsRef
      .orderBy('upvoteCount', 'asc')
      .orderBy('date', 'asc')
      //.limit(5) 

    } else if (sortMode === 'New') {
      query = postsRef
      .orderBy('date', 'desc')
     // .limit(5) 

    } else if (sortMode === 'Anonymous') {
      query = postsRef
      .where('author','==', ANONYMOUS_USER_NAME)
      .orderBy('upvoteCount', 'desc')
      .orderBy('date', 'desc')
     // .limit(5) 
    }
    else if (sortMode === 'Most Commented') {
      query = postsRef
      .orderBy('replyCount', 'desc')
   //   .limit(5) 
    }
    query.get().then(snapShot => {
        postIndex = 0;
        var imageIndex = 0;
        const posts = new Array(snapShot.size); // Create an array of the same length as the snapShot
        const images = [];
        const promises = [];
        const postImageMapping = {}; // Initialize postImageMapping object
        snapShot.docs.forEach((documentSnapshot, index) => { // Add the index parameter
          if (sortMode !== 'Anonymous' && documentSnapshot.get('author') === ANONYMOUS_USER_NAME) {return}
          promise = firestore().collection('Users').doc(documentSnapshot.get('user')).get().then(data => {
            const post = ({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              author: data.get('name'),
              authorGradYear: data.get('gradYear'),
              authorMajor: data.get('major'),
              pfp: data.get('pfp'),
              isUpVoted: false,
              isDownVoted: false,
              postIsYours:false
            });
    
            //Determine whether the user has upvoted or downvoted the post yet
            post.isUpVoted = post.upvoters[auth().currentUser.uid];
            post.isDownVoted = post.downvoters[auth().currentUser.uid];
            post.postIsYours = post.user === auth().currentUser.uid
    
             
            posts[index] = post; // Use the index to insert the post at the correct position
            if (post.extraData) {
              images.push({
                uri: post.extraData,
                key: documentSnapshot.id,
              });
              setImageMap(imageMap.set(post.key, imageIndex));
              imageIndex++;
            }
            postIndex++;
            
          });
          promises.push(promise);
        });
        Promise.all(promises).then(() => {
          //setRefreshList(!refresh) 
          setPosts(posts.filter(Boolean)); // Remove any empty slots from the array
          setImages(images);
          setLoading(false);
        });
      setRefresh(false)
    });
  }

  const EditPost = async () => {
    if (
      postText &&
      postText.length < 1000 &&
      postText.split(/\r\n|\r|\n/).length <=
        25 /*this last one checks that there are not too many lines */
    ){
      setPostUploading(true)
      firestore()
        .collection(POST_COLLECTION_NAME)
        .doc(post)
        .update({
          body: postText,
          edited:true
          })
          .then(() => {
            navigation.reset({
              index: 0,
              routes: [{name: RESET_PATH}],
            });
          })
          .catch(error => {
            console.log(error.code);
          });
        }
    }


  const CreatePost = async () => {
    if (
      (postText &&
      postText.length < 1000 &&
      postText.split(/\r\n|\r|\n/).length <= 25) || (image && !postText)) {
      setPostUploading(true)
      if (image) {await uploadPic()}
      if(!postIsAnonymous){
        firestore()
          .collection(POST_COLLECTION_NAME)
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
            user: auth().currentUser.uid,
            extraData: {url} ? url : '',
            upvoters: {[auth().currentUser.uid]: true},
            downvoters: new Map(),
            searchAuthor:userData.name.toUpperCase(),
            edited:false
          })
          .then(() => {
            closeModal();
            navigation.reset({
              index: 0,
              routes: [{name: RESET_PATH}],
            });

          })
          .catch(error => {
            console.log(error.code);
          });
        }
      else if (postIsAnonymous) {
        firestore()
        .collection(POST_COLLECTION_NAME)
        .doc()
        .set({
          author: ANONYMOUS_USER_NAME,
          authorGradYear: '',
          authorMajor: '',
          body: postText,
          replyCount: 0,
          upvoteCount: 1,
          date: firestore.FieldValue.serverTimestamp(),
          pfp: '',
          replies: [],
          user: auth().currentUser.uid,
          extraData: {url} ? url : '',
          upvoters: {[auth().currentUser.uid]: true},
          downvoters: new Map(),
          searchAuthor: ANONYMOUS_USER_NAME.toUpperCase(),
          edited:false
        })
        .then(() => {
          closeModal();
          navigation.reset({
            index: 0,
            routes: [{name: RESET_PATH}],
          });


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

    var postsRef = firestore().collection(POST_COLLECTION_NAME)
    var query; 
    if(search) {
      query = postsRef
      .where('searchAuthor', '>=', search.toUpperCase())
      .where('searchAuthor', '<=', search.toUpperCase()+ '\uf8ff')
      //.limit(15)
    }
    else if(sortMode === 'Best') {
      query = postsRef
      .orderBy('upvoteCount', 'desc')
      .orderBy('date', 'desc')
     // .limit(postCount)
    } else if (sortMode === 'Worst') {
      query = postsRef
      .orderBy('upvoteCount', 'asc')
      .orderBy('date', 'asc')
    //  .limit(postCount) 

    } else if (sortMode === 'New') {
      query = postsRef
      .orderBy('date', 'desc')
     // .limit(postCount) 

    } else if (sortMode === 'Anonymous') {
      query = postsRef
      .where('author','==', ANONYMOUS_USER_NAME)
      .orderBy('upvoteCount', 'desc')
      .orderBy('date', 'desc')
   //   .limit(postCount) 
    } else if (sortMode === 'Most Commented') {
      query = postsRef
      .orderBy('replyCount', 'desc')
 //     .limit(postCount) 
    }
    //gets posts asynchronously in the background
    const subscriber = query.onSnapshot(querySnapshot => {
        postIndex = 0;
        var imageIndex = 0;
        const posts = new Array(querySnapshot.size); // Create an array of the same length as the querySnapshot
        const images = [];
        const promises = [];
        querySnapshot.forEach((documentSnapshot, index) => { // Add the index parameter
          promise = firestore().collection('Users').doc(documentSnapshot.get('user')).get().then( data => {
            const post = ({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              author: data.get('name'),
              authorGradYear: data.get('gradYear'),
              authorMajor: data.get('major'),
              pfp: data.get('pfp'),
              isUpVoted: false,
              isDownVoted: false,
              postIsYours:false
            });
            //Determine whether the user has upvoted or downvoted the post yet
            post.isUpVoted = post.upvoters[auth().currentUser.uid];
            post.isDownVoted = post.downvoters[auth().currentUser.uid];
            post.postIsYours = post.user === auth().currentUser.uid
            if (documentSnapshot.data().author === ANONYMOUS_USER_NAME) {
              post.author = ANONYMOUS_USER_NAME
              post.pfp = ''
            }
    
            if (sortMode !== 'Anonymous' && post.author === ANONYMOUS_USER_NAME) {} //This makes sure that anonymous posts are only 
            //shown if the user has selected the anonymous filter
            else {
              posts[index] = post; // Use the index to insert the post at the correct position
              if (post.extraData) {
                images.push({
                  uri: post.extraData,
                  key: documentSnapshot.id,
                });
                setImageMap(imageMap.set(post.key, imageIndex));
                imageIndex++;
              }
              postIndex++;
            }
          })
          promises.push(promise);
        });
    
        Promise.all(promises).then(() => {
          setPosts(posts.filter(Boolean)); // Remove any empty slots from the array
          setImages(images);
          //setRefreshList(!refresh);
          setLoading(false);
        });
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [navigation,sortMode,postCount,search]);

  const DeletePost = ({item}) => {
    if(item.isReply){
      firestore().collection('Replies').doc(item.key).delete();
      firestore().collection(POST_COLLECTION_NAME).doc(item.post).update({
        replies:firebase.firestore.FieldValue.arrayRemove(item.key),
        replyCount:firebase.firestore.FieldValue.increment(-1)
      }).then(() => {getReplies(replyItem);}).catch(()=>{})
    }
    else
      firestore().collection(POST_COLLECTION_NAME).doc(item.key).delete();
  };
  const OpenImage = (index) => {
    setImageIndex(imageMap.get(index));
    setIsVisible(true);
  };

  //This code is very delicate and needs to be done right.
  const UpvotePost = async ({item}) => {
    if (!transactionStarted) {
      transactionStarted = true;
      var postRef;
      if (item.isReply)
        postRef = firestore().collection('Replies').doc(item.key);
      else
        postRef = firestore().collection(POST_COLLECTION_NAME).doc(item.key);

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
      var postRef;
      if (item.isReply)
        postRef = firestore().collection('Replies').doc(item.key);
      else
        postRef = firestore().collection(POST_COLLECTION_NAME).doc(item.key);

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
    await launchImageLibrary({selectionLimit:1},(result) => {
      if(!result.didCancel){
        if(result.assets.length >0 && result.assets[0].fileSize < 8000000){
          setImage(result.assets[0].uri)
        }
        else{
          Alert.alert('Filesize is too big or there is another error. Keep uploads below 5MB.')
        }
      }
    })

  };

  const MakeReply = (item) => {
    if (
      reply &&
      reply.length < 500 &&
      reply.split(/\r\n|\r|\n/).length <=
        10 /*this last one checks that there are not too many lines */
    ) {
      if(!postIsAnonymous){
          const replyRef = firestore().collection('Replies').doc();
          replyRef
            .set({
              author: userData.name,
              body: reply,
              upvoteCount: 1,
              date: firestore.FieldValue.serverTimestamp(),
              pfp: userData.pfp,
              user: auth().currentUser.uid,
              extraData: '',
              upvoters: {[auth().currentUser.uid]: true},
              downvoters: new Map(),
              isReply:true,
              post: item.key
            }).catch(()=> {})
            firestore().collection(POST_COLLECTION_NAME).doc(item.key).update({
              replies:firebase.firestore.FieldValue.arrayUnion(replyRef.id),
              replyCount:firebase.firestore.FieldValue.increment(1)
            }).then(() => {getReplies(item);setReply('')}).catch(()=>{})
        }
      else if (postIsAnonymous) {
        if(item.author === ANONYMOUS_USER_NAME){

          const replyRef = firestore().collection('Replies').doc();
          replyRef
            .set({
              author: ANONYMOUS_USER_NAME,
              body: reply,
              upvoteCount: 1,
              date: firestore.FieldValue.serverTimestamp(),
              pfp: '',
              user: auth().currentUser.uid,
              extraData: '',
              upvoters: {[auth().currentUser.uid]: true},
              downvoters: new Map(),
              isReply:true,
              post: item.key
            }).catch(()=> {})
            firestore().collection(POST_COLLECTION_NAME).doc(item.key).update({
              replies:firebase.firestore.FieldValue.arrayUnion(replyRef.id),
              replyCount:firebase.firestore.FieldValue.increment(1)
            }).then(() => {getReplies(item);setReply('');setPostIsAnonymous(false)}).catch(()=>{})
        }
        else {
          Alert.alert('Note','You cannot make anonymous comments on a user\'s post unless the post is anonymous too.')
        }
      }
    } else {
      PostError();
    }

  }

  const uploadPic = async () => {
    const reference = storage().ref(POST_STORAGE_NAME +uuidv4());
    if (image) {
      await reference.putFile(image).catch(error => {
        FirebaseError(error.code);
      });
      url = await reference.getDownloadURL();
    }
  };



  const Post = React.memo(({item, index}) => {
    return (
      <Swipeable
      overshootLeft={true}
      ref={ref => {
        this.swipeable2 = ref;
      }}
      onSwipeableOpen={(direction) => {
        if(direction ==='right'){
          setFreeze(true)
          setReplyItem(item)
          setReplyModalVisible(true)
          getReplies(item);
          this.swipeable2.close()
        }
      }}
      overshootRight={true}
      leftThreshold={75}
      rightThreshold={95}
      friction={3}
      renderLeftActions={() => (
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
      )}
      renderRightActions={() => (
        <View style={{justifyContent:'center'}}>
         <TouchableOpacity>
            <Icon containerStyle={{height:60,width:60,alignItems:'center',justifyContent:'center'}} size={50} solid={true} type="entypo" name="reply" color='black'/>
          </TouchableOpacity>
        </View>
      )}
    >
        <View style={styles.postContainer}>
          <Pressable delayLongPress={150} onLongPress={() => {
            setFreeze(true)
            setReplyItem(item)
            setReplyModalVisible(true)
            setPostReplies([])
            getReplies(item);
            
          }} style={styles.post}>
            {item.edited?<View style={styles.editedAndOptionsBox}>
                <Text style={{color:'black'}}>{item.edited ? 'EDITED' : ''}</Text>
                <SelectDropdown
                  data={item.postIsYours ? postOptions : postOptions2}
                  buttonTextAfterSelection={() => {return '• • •'}}
                  onSelect={(option) => {
                    if(option === 'Reply') {
                      setFreeze(true)
                      setReplyItem(item)
                      setReplyModalVisible(true)
                      getReplies(item);
                    }
                    else if(option === 'Edit') {
                      setFreeze(true)
                      setPost(item.key);
                      setPostText(item.body)
                      //this.floatingAction.animateButton()
                      setModalVisible(true);
                    }
                    else if (option === 'Delete') {
                      DeletePostAlert({item});
                    }
                  }}
                  
                  defaultButtonText='• • •'
                  buttonTextStyle={{color:'white',fontSize:20}}
                  buttonStyle={styles.postDropdownButton}
                  
                
                />
              </View>:null}
            <View style={styles.postUserImageAndInfoBox}>
              <Pressable onPress={() => {
                if(item.author !== ANONYMOUS_USER_NAME){
                  userData.setProfileView(item.user.replace('/Users/',''))
                  navigation.navigate('ProfileView')
                }
                else if (item.author === ANONYMOUS_USER_NAME) {
                  Alert.alert('This user wishes to remain anonymous.')
                }
              }}>
                <FastImage
                  defaultSource={require('./assets/blank2.jpeg')}
                  source={
                    item.pfp ? {uri: item.pfp} : require('./assets/blank2.jpeg')
                  }
                  style={styles.postPfp}
                />
              </Pressable>
              {item.author !== ANONYMOUS_USER_NAME ? (
                  <View style={styles.postUserInfo}>
                    <Text style={item.postIsYours ? [styles.name,{fontWeight: 'bold'}] : styles.name}>{item.author}</Text>
                    <Text style={styles.majorText}>
                      {item.authorMajor} ({item.authorGradYear})
                    </Text>
                  </View>
              ) : (
                  <Text style={item.postIsYours? [styles.anonymousAuthorText,{fontWeight:'bold'}]:styles.anonymousAuthorText}>{item.author}</Text>
    
              )}
                  {(!item.edited)?<SelectDropdown
                  data={item.postIsYours ? postOptions : postOptions2}
                  buttonTextAfterSelection={() => {return '• • •'}}
                  onSelect={(option) => {
                    if(option === 'Reply') {
                      setFreeze(true)
                      setReplyItem(item)
                      setReplyModalVisible(true)
                      getReplies(item);
                    }
                    else if(option === 'Edit') {
                      setFreeze(true)
                      setPost(item.key);
                      setPostText(item.body)
                      //this.floatingAction.animateButton()
                      setModalVisible(true);
                    }
                    else if (option === 'Delete') {
                      DeletePostAlert({item});
                    }
                  }}
                  defaultButtonText='• • •'
                  buttonTextStyle={{color:'white',fontSize:20}}
                  buttonStyle={styles.postDropdownButton}
                  
                
                />:null}
            </View>
            <View style={styles.postImageView}>
              <Text style={styles.body}>{item.body.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')}</Text>
              {item.body.search(/(?:https?|ftp):\/\/[\n\S]+/g, '') >= 0 ? <LinkPreview containerStyle={{marginTop:20,backgroundColor:'#E7E2E1',borderRadius:20}} renderDescription={((string) => {return (<Text style={{color:'black',fontSize:10}}>{string}</Text>)})} renderTitle={((string) => {return (<Text style={{color:'black',fontWeight:'bold'}}>{string}</Text>)})} renderText={(() => {return ''})} header='' text={item.body} />: null}
              {(item.extraData && item.body.search(/(?:https?|ftp):\/\/[\n\S]+/g, '') < 1) ? (
                <TouchableOpacity onPress={() => {OpenImage(item.key)}}>
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
                <Text style={styles.replies}>{item.replyCount}</Text>
              </View>
            </View>
            
          </Pressable>
        </View>
      </Swipeable>
    );
  });


  const closeModal = () => {
    if(!post)
      this.floatingAction.animateButton();
    setPostUploading(false)
    setPost('')
    setImage('')
    url = ''
    setPostIsAnonymous(false)
    setModalVisible(false)
    setPostText('');
    setFreeze(false)
  };

  const renderPost = ({item, index}) => <Post item={item} index={index} />;
  const renderReplies = gestureHandlerRootHOC(({item, index}) => {

    return(
      <Swipeable
      overshootLeft={true}
      containerStyle={{overflow:'hidden',marginBottom:25}}
      overshootFriction={8}
      ref={ref => {
        this.swipeable = ref;
      }}
      overshootRight={true}
      leftThreshold={50}
      rightThreshold={75}
      onSwipeableOpen={(direction) => {
      }}
      friction={2}
      renderLeftActions={() => (
        <View style={{justifyContent:'center',alignItems:'center',marginLeft:15}}>
          <TouchableOpacity onPress={async () => {await UpvotePost({item}).then(() =>{getReplies(replyItem)})}}
          >
            <Icon containerStyle={{alignItems:'center',justifyContent:'center'}} size={20} solid={true} type="antdesign" name="caretup" color= {item.isUpVoted ? 'red': 'black'}/>
          </TouchableOpacity>
          <Text style={{color:'black'}}>{item.upvoteCount}</Text>
          <TouchableOpacity onPress={async () => {DownvotePost({item}).then(() =>{getReplies(replyItem)})}}
          >
            <Icon containerStyle={{alignItems:'center',justifyContent:'center'}}  size={20} solid={true} type="antdesign" name="caretdown" color= {item.isDownVoted ? 'blue': 'black'}/>
          </TouchableOpacity>
        </View>
      )}
      renderRightActions={() => (
        item.postIsYours ?
        <RectButton
        onPress={() => DeletePostAlert({item})}
        style={{justifyContent:'center',marginRight:20}}>
          <Icon type='MaterialIcons' name='delete' color={'red'} size={45}></Icon>
        </RectButton>: null
      )}
    >
        <View style={{width:'100%',marginLeft:0,flexDirection:'row',backgroundColor:'white'}}>
          <View style={{width:70,flex:.4,justifyContent:'center'}}>
            <Pressable onPress={() => {
              if(item.author !== ANONYMOUS_USER_NAME){
                userData.setProfileView(item.user.replace('/Users/',''))
                navigation.navigate('ProfileView')
                setReplyModalVisible(false)
                setFreeze(false)
                setPostReplies([])
              }
              else if (item.author === ANONYMOUS_USER_NAME) {
                Alert.alert('This user wishes to remain anonymous.')
              }
            }}>
              <FastImage defaultSource={require('./assets/blank2.jpeg')} style={{alignSelf:'center',height:50,width:50,borderRadius:40,marginLeft:15}} source={item.pfp ? {uri:item.pfp}: require('./assets/blank2.jpeg')}></FastImage>
            </Pressable>
            <Text style={item.postIsYours? {marginLeft:15,textAlign:'center',fontSize:12,fontWeight:'bold',color:'black'} : {marginLeft:15,textAlign:'center',fontSize:12,color:'black'}}>{item.author}</Text>
          </View>
            <View style={{backgroundColor:'#a8a1a6', flex:1,padding:10,marginLeft:5,marginRight:'5%',borderRadius:10}}>
              <View style={{marginBottom:5}}>
                <Text style={styles.replyBody}>{item.body}</Text>
              </View>
              <View style={{flex:1,height:'10%' ,marginTop:0,justifyContent:'flex-end'}}>
                <Text style={{fontStyle:'italic',fontWeight:'bold',fontSize:12,color:'black'}}>{moment(item.date.toDate()).fromNow()}</Text>
              </View>
            </View>
        </View>
      </Swipeable>

    )
  });

  if (loading) {
    return (
      <View style={{flex:1,justifyContent:'center'}}>
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
        placeholder="Search a post by the author's name"
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.floatingAction
        }}>
        <SafeAreaView style={{flex:1,justifyContent:'center',alignContent:'center'}}>
          <KeyboardAvoidingView style={{justifyContent:'center'}} keyboardVerticalOffset={offsetHeight} behavior="padding">
          <View style={styles.postView}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => closeModal()}
                  style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if(post){
                      EditPost();
                    }
                    else{
                      PostAlert()
                    }
                  }}
                  style={styles.postButton}>
                  <Text style={styles.postButtonText}>{post ? 'Save' :'Post?'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.postTextView}>
                {postUploading ? 
                <ActivityIndicator></ActivityIndicator>
                :
                <TextInput
                  style={styles.postInput}
                  multiline={true}
                  defaultValue={postText}
                  onChangeText={postText => setPostText(postText)}
                  placeholder={post ? '':"Enter your post"}
                  textAlignVertical="top"
                  placeholderTextColor="black"
                  blurOnSubmit={false}
                />}
              </View>
              {!post ? <View style={styles.bottomPostButtonsContainer}>
                <View style={styles.checkBoxBox}>
                  <BouncyCheckbox
                    size={20}
                    
                    fillColor="#73000a"
                    disableBuiltInState={true}
                    style={{alignSelf:'flex-start',marginLeft:20,marginTop:17}}
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

              </View>: null}
          </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={replyModalVisible}>
        
          <SafeAreaView style={{backgroundColor:'white',flex:1,justifyContent:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Button 
                buttonStyle={{backgroundColor:'white',alignSelf:'flex-start',marginBottom:20,marginLeft:10}}
                size='lg'
                onPress={() =>{setReplyModalVisible(false);setPostReplies([])
                setReplyItem(null);setFreeze(false);}}
                titleStyle={{fontSize:15,fontWeight:'bold',color:'black'}}
                title={'Close'}
              />
              <BouncyCheckbox
                size={20}
                
                fillColor="#73000a"
                disableBuiltInState={true}
                style={{alignSelf:'flex-start',marginRight:10,marginTop:12}}
                isChecked={postIsAnonymous}
                unfillColor="#FFFFFF"
                text="Anonymous?"
      
                iconStyle={{ borderColor: "#73000a"}}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ color:'black' }}
                onPress={() => {setPostIsAnonymous(!postIsAnonymous)}}
              />
            </View>
          {!repliesLoading ? 
            <View style={{flex:1}}>
                <FlatList
                  data={postReplies}
                  contentContainerStyle={{flexGrow:1}}
                  renderItem={renderReplies}
                  keyExtractor={item => item.key}
                  refreshing={repliesLoading}
                  onRefresh={() => {getReplies(replyItem)}}
                >
                </FlatList>
            </View>
            : <ActivityIndicator style={{flex:1}} color='#73000a' size={'large'}></ActivityIndicator>}
          
        </SafeAreaView>
        <KeyboardAvoidingView keyboardVerticalOffset={offsetHeight} behavior='position' style={{backgroundColor:'white',flexDirection:'column',justifyContent:'flex-end'}}>
          <View style={{flexDirection:'row',backgroundColor:'white'}}>
              <Input 
                  style={{alignSelf:'flex-end',alignItems:'flex-end'}}
                  placeholder="Comment"
                  defaultValue={reply}
                  leftIcon={{ type: 'font-awesome', name: 'comment' }}
                  rightIcon={() => { return(<TouchableOpacity onPress={() => {MakeReply(replyItem)}}>
                    <Icon type='ionicons' name='send'></Icon>
                  </TouchableOpacity>)}}
                  onChangeText={setReply}>
                </Input>

            </View>
        </KeyboardAvoidingView>
          

      </Modal>

        <FlashList
        onRefresh={() => getPosts()}
          //onEndReached={() => {
        //   setPostCount(postCount+6)
        // }}
        //  onEndReachedThreshold={.9}
          data={posts}
          ref={list}
          renderItem={renderPost}
          keyExtractor={item => item.key}
          refreshing={refreshing}
          drawDistance={2000}
          estimatedItemSize={100}
          
        />
        <FloatingAction
        color="#73000a"
        ref={ref => {
          this.floatingAction = ref;
        }}
        onPressMain={() => {
          setFreeze(true)
          setModalVisible(true);
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
    'Post is invalid',
    'Make sure post is not empty or shorten your post to less than 1000 characters and 25 or less lines',
    [{text: 'Okay'}],
  );
};
