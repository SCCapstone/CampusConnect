import * as React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {useState, useEffect} from 'react';

import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../chatConfig';
import { useChatContext } from './ChatContext';
import {useNavigation} from '@react-navigation/native';

import {FloatingAction} from 'react-native-floating-action';
import androidstyles from './styles/android/ChatStyles';
import iosstyles from './styles/ios/ChatStyles';

var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles; // do dark mode in here as well
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}

export function ChatSearch(props) {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const { setChannel } = useChatContext();
  const [selectedType, setSelectedType] = useState(0);
  const searchLimit = 30;
  const chatClient = StreamChat.getInstance(chatApiKey);
  const navigation = useNavigation();  


  useEffect(() => {
    if (selectedType === 0) {
      searchUsers();
    } else {
      searchGroups();
    }
  }, [selectedType, keyword]); //I guess this tells react to update when these variables change?

  //searches users when selected type is 0
  const searchUsers = async () => {
    var response;
    keyword 
    ? response = await chatClient.queryUsers({ name: { $autocomplete: keyword },id: {$ne:chatClient.user.id}},{last_active:-1},{limit:searchLimit})
    : response = await chatClient.queryUsers({role:'user' ,id: {$ne:chatClient.user.id}},{last_active:-1},{limit:searchLimit}) //Displays all users that are not yourself. Displaying users that are online is not working yet
      setData(response.users)
    }

  //searches groups when selected type is 1
  const searchGroups = async () => {
    var response;
    var groups = []
    //I can't get it to return a list of all users if there's no keyword set yet.
    keyword 
    ? response = await chatClient.queryChannels({type:'team' ,name: { $autocomplete: keyword },},{last_active:-1},{limit:searchLimit})
    : response = await chatClient.queryChannels({type:'team'},{member_count:-1},{limit:searchLimit}) //Displays all users that are online
    response.map((channel) => {
      groups.push(channel.data)
    })
    setData(groups)
      
  };
  //sets keyword for search
  const onKeywordChanged = keyword => {
    setKeyword(() => keyword);
  };
  //sets selectedtype
  const updateSelectedType = selectedType => () => {
    setSelectedType(() => selectedType);
  };
  //joins group with groupuid if users hasn't join
  const joinGroup = item => {

  };
  //sends user to chat
  const selectItem = item => async () => {
    if(item.role === 'user'){
      const channel = chatClient.channel('messaging', {
          members: [chatClient.user.id, item.id],
      });
      await channel.watch()
      setChannel(channel)
      navigation.navigate('DMScreen');
      
    }
    else if (item.type === 'team'){
      console.log(item.id)
      const channel = chatClient.channel('team', item.id, {});
      if(chatClient.user.id)
        await channel.addMembers([chatClient.user.id]);
      setChannel(channel)
      navigation.navigate('DMScreen');
    }
  };
  //returns uid of chat
  const getKey = item => {
    return item.id
  };
  //Make this users instead
  //shows list of chats
  const renderItems = ({item}) => {
    return (
      <TouchableOpacity style={styles.chatListItem} onPress={selectItem(item)}>
        <Image
          style={styles.chatListItemImage}
          source={{
            uri: item.image ? item.image : 'https://st.depositphotos.com/2828735/4247/i/600/depositphotos_42470283-stock-photo-thailand-male-chicken-rooster-isolated.jpg',
          }}
        />
        <Text style={styles.chatListItemLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const createAGroup = () => {
    navigation.navigate('Create Group')
  }


  return (
    <View style={styles.chatContain}>
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

      <View>
        <TextInput
          onChangeText= {onKeywordChanged}
          placeholderTextColor= 'black'
          placeholder="Search for user or group by name..."
          style={styles.chatInput}
        />
      </View>
      {(!keyword && data.length < 1) ?
      <View style={styles.placeholderView}>
        <Text style={styles.placeholderText}>Guess no one's online...</Text>
      </View> :
      <View style={styles.chatList}>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item, index) => getKey(item)}
        />
      </View>}
    </View>
  );
}