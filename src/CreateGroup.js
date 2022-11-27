import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';

// import Context to get shared data from React context.
import Context from "../context";
// import validator to validate user's credentials.
import validator from "validator";
// import uuid to generate id for users.
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import AppContext from './AppContext';

const CreateGroup = () => {
  // get shared data from context.
  const { setUser, cometChat } = useContext(Context);
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onGroupNameChanged = (groupName) => {
    setGroupName(() => groupName);
  };

  const isGroupValid = (groupName) => {
    if (validator.isEmpty(groupName)) {
      showMessage('Error', 'Please input your group name');
      return false;
    }
    return true;
  };

  const showMessage = (title, message) => {
    Alert.alert(
      title,
      message
    );
  };

  const generateAvatar = () => {
    // hardcode list of user's avatars for the demo purpose.
    const avatars= [
      'https://data-us.cometchat.io/assets/images/avatars/captainamerica.png',
      'https://data-us.cometchat.io/assets/images/avatars/cyclops.png',
      'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
      'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
      'https://data-us.cometchat.io/assets/images/avatars/wolverine.png'
    ];
    const avatarPosition = Math.floor(Math.random() * avatars.length);
    return avatars[avatarPosition];
  }

  const createGroup = () => {
    if (isGroupValid(groupName)) {
      setIsLoading(true);
      const GUID = uuidv4();
      const groupType = cometChat.GROUP_TYPE.PUBLIC;
      const groupIcon = generateAvatar();
      const password = "";

      const group = new cometChat.Group(GUID, groupName, groupType, password);
      group.setIcon(groupIcon);

      cometChat.createGroup(group).then(
        group => {
          setIsLoading(false);
          showMessage('Info', `${groupName} was created successfully`);
        },
        error => {
          setIsLoading(false);
          showMessage('Error', 'Cannot create your group. Please try again later');
        }
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        onChangeText={onGroupNameChanged}
        placeholder="Group Name..."
        style={styles.input}
      />
      <TouchableOpacity style={styles.createGroup} onPress={createGroup}>
        <Text style={styles.createGroupLabel}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 12,
  },
  createGroup: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
  },
  createGroupLabel: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});