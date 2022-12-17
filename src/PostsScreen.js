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
import {color, sub, ZoomIn} from 'react-native-reanimated';
import {pure} from 'recompose';
import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';
import {launchImageLibrary} from 'react-native-image-picker';
import { useHeaderHeight } from '@react-navigation/elements';


import {TouchableHighlight} from 'react-native-gesture-handler';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SelectDropdown from 'react-native-select-dropdown'
import { SearchBar, Button, ListItem, Avatar ,Input} from '@rneui/themed';
import ImagePicker from 'react-native-image-crop-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { AnimatedGalleryImage, LoadingIndicator } from 'stream-chat-react-native';




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
  const [editModalVisible,setEditModalVisile] = useState(false)
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [postText, setPostText] = useState('');
  const [postIsAnonymous,setPostIsAnonymous] = useState(false);
  const [sortMode, setSortMode] = useState('Best')
  const [postCount, setPostCount] = useState(6)
  const [search, setSearch] = useState("");
  const [image, setImage] = React.useState('');
  const [postUploading, setPostUploading] = useState(false);
  const [reply, setReply] = React.useState('');
  const [replyItem,setReplyItem] = React.useState(new Map())
  const [post,setPost] = useState();
  var transactionStarted = false;
  var url = '';


  const headerHeight = useHeaderHeight();

  const offsetHeight = Platform.OS === 'ios' ? 70 : -300 //keyboard view doesnt work on ios without this
  const offsetHeightPadding = Platform.OS ==='ios' ? 0 : -64

  const list = useRef(FlashList);
  const sortingOptions = ["Best", "Worst", "New", "Anonymous"]
  const postOptions = ["Reply", "Edit","Delete"]
  const postOptions2 = ["Reply"]



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
      .where('searchAuthor', '>=', search.toUpperCase())
      .where('searchAuthor', '<=', search.toUpperCase()+ '\uf8ff')
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

  const EditPost = async () => {
    if (
      postText &&
      postText.length < 1000 &&
      postText.split(/\r\n|\r|\n/).length <=
        25 /*this last one checks that there are not too many lines */
    ){
      setPostUploading(true)
      firestore()
        .collection('Posts')
        .doc(post)
        .update({
          body: postText,
          edited:true
          })
          .then(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          })
          .catch(error => {
            console.log(error.code);
          });
        }
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
            searchAuthor:userData.name.toUpperCase(),
            edited:false
          })
          .then(() => {
            closeModal();
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });

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
          searchAuthor:'ANONYMOUS',
          edited:false
        })
        .then(() => {
          closeModal();
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
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

    var postsRef = firestore().collection('Posts')
    var query; 
    if(search) {
      query = postsRef
      .where('searchAuthor', '>=', search.toUpperCase())
      .where('searchAuthor', '<=', search.toUpperCase()+ '\uf8ff')
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

  const uploadPic = async () => {
    const reference = storage().ref('/Posts/' +uuidv4());
    if (image) {
      await reference.putFile(image).catch(error => {
        FirebaseError(error.code);
      });
      url = await reference.getDownloadURL();
    }
  };
  const PostReply = ({item, index}) => {
    return (
      <View></View>
    );
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
        <View style={styles.post}>
          <View style={styles.editedAndOptionsBox}>
              <Text style={{color:'black'}}>{item.edited ? 'EDITED' : ''}</Text>
              <SelectDropdown
                data={item.postIsYours ? postOptions : postOptions2}
                buttonTextAfterSelection={() => {return '• • •'}}
                onSelect={(option) => {
                  if(option === 'Reply') {
                    setReplyItem(item)
                    setReplyModalVisible(true)
                  }
                  else if(option === 'Edit') {
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
            </View>
          <View style={styles.postUserImageAndInfoBox}>
            <Pressable onPress={() => {
              if(item.author !== 'Anonymous'){
                userData.setProfileView(item.user.replace('/Users/',''))
                navigation.navigate('ProfileView')
              }
              else if (item.author === 'Anonymous') {
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
              <TouchableOpacity onPress={() => {OpenImage({index})}}>
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
          
        </View>
      </View>
    );
  };


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
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.floatingAction
        }}>
        <KeyboardAvoidingView keyboardVerticalOffset={offsetHeightPadding} behavior="padding">
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

            </View>: null}
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal

        animationType="slide"
        transparent={true}
        visible={replyModalVisible}>
          <View style={{backgroundColor:'white',flex:1,justifyContent:'center',marginTop:headerHeight-3}}>
          <Button 
                  buttonStyle={{backgroundColor:'white',alignSelf:'flex-start',width:100}}
                  size='lg'
                  onPress={() =>{setReplyModalVisible(false);
                  setReplyItem(null)}}
                  titleStyle={{fontSize:15,fontWeight:'bold',color:'black'}}
                  title={'Cancel'}
                  />
            <PostReply item={replyItem}>
                  
            </PostReply>
            
            <KeyboardAvoidingView keyboardVerticalOffset={offsetHeight} behavior='position' style={{backgroundColor:'white',flexDirection:'column',flex:1,marginTop:"0%",justifyContent:'flex-end'}}>
              <Input 
                style={{alignSelf:'flex-end',alignItems:'flex-end'}}
                placeholder="Comment"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={setReply}>
              </Input>

            </KeyboardAvoidingView>
          
          
        </View>

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
    [{text: 'Okay.'}],
  );
};