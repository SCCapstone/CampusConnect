import * as React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from 'react-native';
import {useState, useEffect} from 'react';

import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../chatConfig';

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
  const [selectedType, setSelectedType] = useState(0);
  const searchLimit = 30;
  const chatClient = StreamChat.getInstance(chatApiKey);

  useEffect(() => {
    if (selectedType === 0) {
      searchUsers();
    } else {
      searchGroups();
    }
  }, [selectedType, keyword]); //I guess this tells react to update when these variables change?

  //searches users when selected type is 0
  const searchUsers = async () => {

    //I can't get it to return a list of all users if there's no keyword set yet.
    if(keyword){
      const response = await chatClient.queryUsers({ name: { $autocomplete: keyword }},{last_active:-1},{limit:searchLimit})
      setData(response.users)
    }

  };
  //searches groups when selected type is 1
  const searchGroups = () => {
    /*const groupRequestBuilder = new CometChat.GroupsRequestBuilder().setLimit(
      searchLimit,
    );
    const groupsRequest = keyword
      ? groupRequestBuilder.setSearchKeyword(keyword).build()
      : groupRequestBuilder.build();
    groupsRequest.fetchNext().then(
      groupList => {
        setData(() => groupList);
      },
      error => {
        console.log('Error, please try again later...');
      },
    );*/
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
   /*if (item && item.guid && !item.hasJoined) {
      const GUID = item.guid;
      const password = '';
      const groupType = CometChat.GROUP_TYPE.PUBLIC;
      CometChat.joinGroup(GUID, groupType, password).then(
        group => {},
        error => {
          console.log('Failed to join group');
        },
      );
    }*/
  };
  //sends user to chat
  const selectItem = item => () => {
    /*if (item && item.guid && !item.hasJoined) {
      joinGroup(item);
    }
    setSelectedConversation({...item, contactType: selectedType});
    navigation.navigate('Message');*/
  };
  //returns uid of chat
  const getKey = item => {
    if (item && item.uid) {
      return item.uid;
    }
    if (item && item.guid) {
      return item.guid;
    }
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

      <View style={styles.chatList}>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item, index) => getKey(item)}
        />
      </View>
    </View>
  );
}