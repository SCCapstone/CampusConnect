import * as React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from 'react-native';
import {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import {CometChat} from '@cometchat-pro/react-native-chat';
import { FloatingAction } from "react-native-floating-action";

export function Chat({navigation}) {

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [selectedType, setSelectedType] = useState(0);
  const [data, setData] = useState([]);

  exports.selectedConversation = selectedConversation;

  useEffect(() => {
    if (selectedType === 0) {
      searchUsers();
    } else {
      searchGroups();
    }
  }, [CometChat, selectedType, keyword]);

  const searchUsers = () => {
    if (CometChat) {
      const limit = 20;
      const usersRequestBuilder = new CometChat.UsersRequestBuilder().setLimit(
        limit,
      );
      const usersRequest = keyword
        ? usersRequestBuilder.setSearchKeyword(keyword).build()
        : usersRequestBuilder.build();
      usersRequest.fetchNext().then(
        userList => {
          setData(() => userList);
        },
        error => {
          console.log("Error, please try again later...")
        }
      );
    }
  };

  const searchGroups = () => {
    const limit = 30;
    const groupRequestBuilder = new CometChat.GroupsRequestBuilder().setLimit(
      limit,
    );
    const groupsRequest = keyword
      ? groupRequestBuilder.setSearchKeyword(keyword).build()
      : groupRequestBuilder.build();
    groupsRequest.fetchNext().then(
      groupList => {
        setData(() => groupList);
      },
      error => {
        console.log("Error, please try again later")
      }
    );
  };

  const onKeywordChanged = keyword => {
    setKeyword(() => keyword);
  };

  const updateSelectedType = selectedType => () => {
    setSelectedType(() => selectedType);
  };

  const joinGroup = item => {
    if (item && item.guid && !item.hasJoined) {
      const GUID = item.guid;
      const password = '';
      const groupType = CometChat.GROUP_TYPE.PUBLIC;
      CometChat.joinGroup(GUID, groupType, password).then(
        group => {},
        error => {
          console.log("Failed to join group")
        },
      );
    }
  };

  const selectItem = item => () => {
    if (item && item.guid && !item.hasJoined) {
      joinGroup(item);
    }
    setSelectedConversation({...item, contactType: selectedType});
    navigation.navigate('Message');
  };

  const getKey = item => {
    if (item && item.uid) {
      return item.uid;
    }
    if (item && item.guid) {
      return item.guid;
    }
    return uuidv4();
  };

  const renderItems = ({item}) => {
    return (
      <TouchableOpacity style={styles.chatListItem} onPress={selectItem(item)}>
        <Image
          style={styles.chatListItemImage}
          source={{
            uri: item.avatar ? item.avatar : item.icon,
          }}
        />
        <Text style={styles.chatListItemLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

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
            User
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
            Group
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onChangeText={onKeywordChanged}
          placeholder="Search for user by name..."
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
      <FloatingAction
        ref={(ref) => { this.floatingAction = ref; }}
        onPressMain= { () => {
          navigation.navigate('Create Group');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatContain: {
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'column',
  },
  chatInput: {
    borderColor: '#00000',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginHorizontal: 8,
    padding: 12,
  },
  searchActionContainer: {
    borderRadius: 8,
    flexDirection: 'row',
    margin: 8,
  },
  searchActionButton: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  searchLeftActionButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 0,
  },
  searchRightActionButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 0,
  },
  searchActionButtonActive: {
    backgroundColor: '#73000a',
  },
  searchActionLabel: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  searchActionLabelActive: {
    color: '#ffffff',
  },
  chatList: {
    flex: 1,
  },
  chatListItem: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  chatListItemImage: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  chatListItemLabel: {
    fontSize: 24,
    color: 'black',
  },
});
