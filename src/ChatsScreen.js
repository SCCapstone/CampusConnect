import { ChatProvider } from "./ChatContext";
import {useContext, useRef, useState, useEffect} from 'react'
import {SafeAreaView ,View, Text, Pressable, Alert, Image,Animated,StyleSheet, ActivityIndicator,Modal,KeyboardAvoidingView, ImageBackground, Platform, TouchableWithoutFeedback} from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton,FlatList, gestureHandlerRootHOC,TouchableOpacity} from 'react-native-gesture-handler';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import {
    ChannelList,
    ChannelsContext,
    ChannelAvatarWithContext,
    ChannelPreviewMessenger,
    ChannelPreview,
    AnimatedGalleryImage,
    MenuPointHorizontal,
    useTheme,
    Delete,
    ThumbsDownReaction
  } from 'stream-chat-react-native';


import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../chatConfig';
import auth from '@react-native-firebase/auth';
import {FloatingAction} from 'react-native-floating-action';
import AppContext from './AppContext';
import storage from '@react-native-firebase/storage';
import SelectDropdown from 'react-native-select-dropdown'
import { useHeaderHeight } from '@react-navigation/elements';


import { useChatContext } from './ChatContext';

import { GestureHandlerRootView } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';

import androidstyles from './styles/android/ChatStyles';
import iosstyles from './styles/ios/ChatStyles';
import { channel } from "diagnostics_channel";
import FastImage from "react-native-fast-image";
import { BackgroundImage , Button, Icon, Input} from "@rneui/base";
import moment from "moment";
import { FAB } from '@rneui/themed';


var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles; // do dark mode in here as well
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}

export function ChatsScreen(props) {
  const userData = useContext(AppContext);
  const headerHeight = useHeaderHeight();

  const offsetHeight = Platform.OS === 'ios' ? 70 : -300 //keyboard view doesnt work on ios without this
  const offsetHeightPadding = Platform.OS ==='ios' ? 0 : -64




///This page shouls have all the functionality for adding a creating a DM. And searching for users.

    const { setChannel} = useChatContext();
    const navigation = useNavigation();
    const list = useRef(FlatList)
    const [selectedType, setSelectedType] = useState(0);
    const chatClient = StreamChat.getInstance(chatApiKey);
    const [filter, setFilter] = useState('') //We will swap between groups and DMs here
    const [key,setKey] = useState(0)
    const [userSearch,setUserSearch] = useState('')
    const [searchModalVisible,setSearchModalVisible] = useState(false)
    const [data, setData] = useState([]);
    const searchLimit = 30;
    const [addGroupVisible,setAddGroupVisible] = useState(false)
      //Right here, create a query that will only return the private DMs a User is in

      const {
        theme: {
          colors: { accent_red, white_smoke,white },
        },
      } = useTheme();

    const ReloadList = () => {
      setKey((key) => key+1)
    }

    const DMFilter = {
      $and: [
        {type:'messaging'},
        {members: {
          '$in': [auth().currentUser.uid]
        }},
        ]
      };
    const GroupFilter = {
      $and: [
        {type:'team'},
        {members: {
          '$in': [auth().currentUser.uid]
        }},
        ]
      };
    const sort = {
      last_message_at: -1,
    };
    const options = {
      presence: true,
      state: true,
      watch: true,
    };

    //sets selectedtype
    const updateSelectedType = selectedType => () => {
      setSelectedType(() => selectedType);
    };



    useEffect(() => {
      const myListener = chatClient.on('message.new',ReloadList)
    },[])
    useEffect(() => {
      if (selectedType === 0) {
        searchUsers();
      } else {
        searchGroups();
      }
    }, [userSearch,selectedType]); //I guess this tells react to update when these variables change?
    useEffect(() => {
      if (selectedType === 0) {
        setFilter(DMFilter);
        setAddGroupVisible(false)
      } else {
        setFilter(GroupFilter)
        setAddGroupVisible(true)
      }
    },[selectedType])

  //searches users when selected type is 0
  const searchUsers = async () => {
    var response;
    userSearch 
    ? response = await chatClient.queryUsers({ name: { $autocomplete: userSearch },id: {$ne:chatClient.user.id}},[{last_active:-1}],{limit:searchLimit})
    : response = await chatClient.queryUsers({role:'user' ,id: {$ne:chatClient.user.id}},[{last_active:-1}],{limit:searchLimit}) //Displays all users that are not yourself. Displaying users that are online is not working yet
      setData(response.users)
    }

  //searches groups when selected type is 1
  const searchGroups = async () => {
    var response;
    var groups = []
    //I can't get it to return a list of all users if there's no keyword set yet.}
    userSearch 
    ? response = await chatClient.queryChannels({type:'team' ,name: { $autocomplete: userSearch }},{last_active:-1},{limit:searchLimit})
    : response = await chatClient.queryChannels({type:'team'},{member_count:-1},{limit:searchLimit}) //Displays all users that are online
    response.map((channel) => {
      groups.push(channel.data)
    })
    setData(groups)
      
  };
    //sends user to chat
    const selectItem = item => async () => {
      if(item.role === 'user'){
        const channel = chatClient.channel('messaging', {
            members: [chatClient.user.id, item.id],
        });
        await channel.watch()
        setChannel(channel)
        this.floatingAction.animateButton();

        navigation.navigate('DMScreen',{channel:channel});
        
      }
      else if (item.type === 'team'){
        const channel = chatClient.channel('team', item.id, {});
        if(chatClient.user.id)
          await channel.addMembers([chatClient.user.id]);
        setChannel(channel)
        this.floatingAction.animateButton();
        navigation.navigate('DMScreen', {channel:channel});
      }
    };
      //returns uid of chat
  const getKey = item => {
    return item.id
  };

    //Need to make the little preview chat slidable so we can delete and stuff, but very hard


    //You can customize the persons display name and extra data like major if wanted
    const CustomPreviewTitle = ( {channel} ) => (
      <Text>
        potato
      </Text>
    );
    const CustomListItem = props => {
      const { unread } = props;
      const { channel } = props;
      const [muteStatus, setMuteStatus] = useState(channel.muteStatus().muted)
      const { channels, reloadList } = useContext(ChannelsContext);
      const backgroundColor = unread ? '#c6edff' : '#fff';

      const channelOptions = ["View Profile","Mute", "Block"]
      const channelOptions2 = ["View Profile","Unmute", "Block"]
      
      return (
        <Swipeable
        overshootLeft={true}
        overshootRight={true}
        friction={3.5}
        renderLeftActions={() => (
          <View style={[styles.swipeableContainer, { backgroundColor: white_smoke }]}>
           <TouchableOpacity onPress={() => {
      
                setChannel(channel)
                channel.watch().then(() => {
                  navigation.navigate('DMScreen',{channel:channel})
                })
            
           }}>
              <Icon containerStyle={{height:60,width:60,alignItems:'center',justifyContent:'center'}} size={50} solid={true} type="entypo" name="reply" color='gray'/>
            </TouchableOpacity>
          </View>
        )}
        renderRightActions={() => (
          <View style={[styles.swipeableContainer, { backgroundColor: white_smoke }]}>
            <SelectDropdown 
            defaultButtonText="• • •" 
            rowTextStyle={{fontSize:10}}
            buttonTextStyle={{backgroundColor:'transparent'}}
            buttonTextAfterSelection={() =>{return "• • •"}}
            data={muteStatus? channelOptions2 : channelOptions}
            onSelect={async (selection) => {
              if (selection === 'Mute'){
                await channel.mute()
                setKey((key) => key+1)
              } else if(selection === 'View Profile') {
                const is2PersonChat = (channel.data.member_count == 2 && channel.type === 'messaging')
                var member;
                if(is2PersonChat) {
                  const member = await channel.queryMembers({id: {$ne:chatClient.user.id}},'','')
                  userData.setProfileView(member.members[0].user_id)
                  navigation.navigate('ProfileView')
                }
                else if (channel.type === 'team') {
                  Alert.alert('Create a group page and navigate to that here')
                }
                

              }
              else if (selection ==='Unmute'){
                await channel.unmute()
                setKey((key) => key+1)
              }
              else if (selection === 'Block'){
                Alert.alert('Message','Sorry, this feature hasn\'t been implemented yet. Try muting and then deleting the chat.')
              }
            }}
            buttonStyle={{width:70,height:70,backgroundColor:'transparent'}}>
            </SelectDropdown>
            <RectButton
              onPress={() => {
                if(channel.type === 'messaging') {
                  channel.hide(null,true)
                }
                else if (channel.type === 'team') {
                  channel.hide()
                }
              }}
              style={[styles.rightSwipeableButton]}
            >
              <Delete pathFill={accent_red} />
            </RectButton>
          </View>
        )}
      >
          <View style={{backgroundColor}}>
            <ChannelPreviewMessenger {...props} />
          </View>
        </Swipeable>
      )
    }

    const CustomAvatar = ({channel}) => {
        const is2PersonChat = (channel.data.member_count == 2 && channel.type === 'messaging')
        var member;
        const [isOnline, setIsOnline] = useState(false)
        const [image,setImage] = useState('')
        useEffect(() =>{
          getPhotos = async () =>{
            if (is2PersonChat) {
              member = await channel.queryMembers({id: {$ne:chatClient.user.id}},'','')
              setIsOnline(member.members[0].user.online)
              /*if(!member.members[0].user.image) {
                setImage(await storage().ref('Profile Pictures/'+member.members[0].user_id).getDownloadURL().catch(() =>{}))
              }*/
              //else{
                setImage(member.members[0].user.image)
              //}
            }
            else {
              setImage(channel.data.image)
            }
            
          }

          getPhotos();
          
        },[]);

       return (
          <View style={{}}>
            {Platform.OS === 'ios' ? 
              <ImageBackground defaultSource={require('./assets/blank2.jpeg')} style={{width:60,height:60}} imageStyle={{borderRadius:60}} source={image ?{uri:image}:require('./assets/blank2.jpeg')}>
                {isOnline ? <Icon containerStyle={{position:'absolute',right:2}} size={15} solid={true} type="fontawesome" name="circle" color='green'/> : null}
              </ImageBackground> : <ImageBackground style={{width:60,height:60}} imageStyle={{borderRadius:60}} source={image ?{uri:image}:require('./assets/blank2.jpeg')}>
                {isOnline ? <Icon containerStyle={{position:'absolute',right:2}} size={15} solid={true} type="fontawesome" name="circle" color='green'/> : null}
              </ImageBackground>}
          </View>
        )
      }

        //Make this users instead
  //shows list of chats
  const renderUsers = gestureHandlerRootHOC(({item}) => {
    var isOnline = item.online
    const channelOptions = ["View Profile", "Block"]

    //If for some reason the user does not have a name on stream chat, don't display them
    if (!item.name)
      return null
    
    return (
      <Swipeable
      overshootLeft={false}
      overshootRight={true}
      friction={2.5}
      renderRightActions={() => (
        <View style={[styles.swipeableContainer, { backgroundColor: white_smoke }]}>
          <SelectDropdown 
          defaultButtonText="• • •" 
          rowTextStyle={{fontSize:10}}
          buttonTextStyle={{backgroundColor:'transparent'}}
          buttonTextAfterSelection={() =>{return "• • •"}}
          data={channelOptions}
          onSelect={(selection) => {
              if(selection === 'View Profile') {
                if (item.role ==='user') {
                  userData.setProfileView(item.id)
                  setSearchModalVisible(false)
                  this.floatingAction.animateButton()
                  navigation.navigate('ProfileView')
                }
                else{
                  Alert.alert('Create a group page and navigate to that here')
                }

              

            }
            else if (selection === 'Block'){
              /*Alert.alert('Message','Sorry, this feature hasn\'t been implemented yet. Try muting and then deleting the chat.')*/
            }
          }}
          buttonStyle={{width:90,height:90,backgroundColor:'transparent'}}>
          </SelectDropdown>
        </View>
      )}
    >
        <TouchableOpacity onPress={() => {
          setSearchModalVisible(false)
          this.floatingAction.animateButton();
          if(item.role === 'user'){
            const channel = chatClient.channel('messaging', {
              members: [chatClient.user.id, item.id],
            });
          
            setChannel(channel)
            channel.watch().then(() => {
              navigation.navigate('DMScreen',{channel:channel})
            })
          }
          else if (item.type === 'team'){
            this.floatingAction.animateButton();
            setSearchModalVisible(false)
            const channel = chatClient.channel('team', item.id, {});
            channel.addMembers([chatClient.user.id]).then(() => {
              setChannel(channel)
              navigation.navigate('DMScreen', {channel:channel});
            })

          }
        }}>
            <View style={{flexDirection:'row',padding:15,backgroundColor:'white'}}>
                <Pressable /*onPress={() => {
                  userData.setProfileView(item.id)
                  this.floatingAction.animateButton();
                  navigation.navigate('ProfileView')
                }*/>
                  <ImageBackground
                    style={{width:60,height:60}}
                    imageStyle={{borderRadius:60}}
                    source={item.image ? {uri: item.image} : require('./assets/blank2.jpeg')}>
                      {isOnline ? 
                      <Icon containerStyle={{position:'absolute',right:2}} size={15} solid={true} type="fontawesome" name="circle" color='green'/> : null}
                  </ImageBackground>
                </Pressable>
            <View>
              <Text style={styles.chatListItemLabel}>{item.name}</Text>
              {item.role === 'user' && item.last_active ? <Text style={{fontSize:12,fontWeight:'400',color:'black',marginLeft:'12%',marginTop:'5%'}}>{isOnline? 'Last Online: Now': 'Last Online: '+moment(new Date(item.last_active)).fromNow()}</Text> :
              <Text style={{fontSize:12,color:'black',marginLeft:'12%',marginTop:'5%',fontWeight:'400'}}>{'Created: ' +moment(item.created_at).format('MMMM Do YYYY')}</Text>}
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  });


    return(
          <View style={{ flex: 1}}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={searchModalVisible}>
            <View style={{backgroundColor:'white',flex:1,justifyContent:'center',marginTop:headerHeight-3}}>
            <Button 
              buttonStyle={{backgroundColor:'white',alignSelf:'flex-start',width:100}}
              size='lg'
              onPress={() =>{setSearchModalVisible(false); this.floatingAction.animateButton();setUserSearch('')}}
              titleStyle={{fontSize:15,fontWeight:'bold',color:'black'}}
              title={'Cancel'}
              />
            {(!userSearch && data.length < 1) ?
              <View style={styles.placeholderView}>
                <Text style={styles.placeholderText}>Guess no one's online...</Text>
              </View> :
              <View style={{flex:1,height:'100%'}}>
                <FlatList
                  data={data}
                  ItemSeparatorComponent={<View
                    style={{
                      backgroundColor: 'black',
                      height: 1,
                    }}
                  />}
                  renderItem={renderUsers}
                  keyExtractor={(item, index) => getKey(item)}
                />
              </View>}

            
            <KeyboardAvoidingView keyboardVerticalOffset={offsetHeight} behavior='position' style={{backgroundColor:'white',flexDirection:'column',flex:.1,marginTop:"2%",justifyContent:'flex-end'}}>
              <Input 
                style={{alignSelf:'flex-end',alignItems:'flex-end'}}
                containerStyle={{backgroundColor:'white'}}
                placeholder="Search"
                leftIcon={{ type: 'font-awesome', name: 'search' }}
                onChangeText={setUserSearch}>
              </Input>

            </KeyboardAvoidingView>
          
          
            </View>

          </Modal>        
            <View style={styles.searchActionContainer}>
              <TouchableOpacity
                style={[
                  styles.searchActionButton,
                  styles.searchLeftActionButton,
                  selectedType === 0 && styles.searchActionButtonActive,
                ]}
                onPress={updateSelectedType(0)}>
                <Text
                  style={[
                    styles.searchActionLabel,
                    selectedType === 0 && styles.searchActionLabelActive,
                  ]}>
                  Users
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.searchActionButton,
                  styles.searchRightActionButton,
                  selectedType === 1 && styles.searchActionButtonActive,
                ]}
                onPress={updateSelectedType(1)}>
                <Text
                  style={[
                    styles.searchActionLabel,
                    selectedType === 1 && styles.searchActionLabelActive,
                  ]}>
                  Groups
                </Text>
              </TouchableOpacity>
            </View>
              <ChannelList
                key={key}
                Preview={CustomListItem}
                PreviewAvatar={CustomAvatar}
                  filters={filter} 
                  options={options}
                  sort={sort}
                  onSelect={(channel) => {
                      setChannel(channel);
                      navigation.navigate('DMScreen', {channel:channel});
                      
                  }}
                  />
              <View style={{alignItems:'flex-start',backgroundColor:'white'}}>
                <FAB
                  title="Create A Group"
                  color="#73000a"
                  onPress={() => {
                    navigation.navigate('CreateGroup')
                  }}
                  style={{marginBottom:35,marginLeft:20}}
                  visible={addGroupVisible}
                  icon={{ name: 'add', color: 'white' }}
                  size="small"
                />
              </View>
              <FloatingAction
                floatingIcon={(<Icon type="font-awesome" name="search" color='white'/>)}
                iconHeight={40}
                iconWidth={40}
                
                color="#73000a"
                onPressMain={() => {setSearchModalVisible(!searchModalVisible)}}
                onPressItem={name => {
                  

                }}
                ref={ref => {
                  this.floatingAction = ref;
                }}
              />
          </View>


    )
}
