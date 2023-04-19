import * as React from 'react';
import {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Alert, Image, ImageBackground} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import validator from 'validator';
import {useNavigation} from '@react-navigation/native';
import {useChatContext} from './ChatContext';
import {StreamChat} from 'stream-chat';
import {chatApiKey} from '../chatConfig';

import androidstyles from './styles/android/ChatStyles';
import iosstyles from './styles/ios/ChatStyles';

var styles;

if (Platform.OS === 'ios') {
  styles = iosstyles; // do dark mode in here as well
} else if (Platform.OS === 'android') {
  styles = androidstyles;
}

export function CreateGroup(props) {
  const [groupName, setGroupName] = React.useState('');
  const [image, setImage] = React.useState('');
  const [selectedType, setSelectedType] = useState(0);
  var url = '';
  const {setChannel} = useChatContext();
  const navigation = useNavigation();
  const chatClient = StreamChat.getInstance(chatApiKey);

  const onGroupNameChanged = groupName => {
    setGroupName(() => groupName);
  };

  const choosePhotoFromLibrary = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      mediaType: 'photo',
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {});
  };

  const uploadPic = async () => {
    const reference = storage().ref('/Groups/' + uuidv4());
    if (image) {
      await reference.putFile(image).catch(error => {
        FirebaseError(error.code);
      });
      url = await reference.getDownloadURL();
    }
  };

  const isGroupValid = groupName => {
    if (validator.isEmpty(groupName)) {
      console.log('Error, invalid group name');
      return false;
    }
    return true;
  };

  const showMessage = (title, message) => {
    Alert.alert(title, message);
  };

  const createGroup = async () => {
    if (isGroupValid(groupName) && image) {
      await uploadPic();
      const groupIcon = url;
      const channel = chatClient.channel('team', uuidv4(), {
        name: groupName,
        image: url,
      });
      await channel.watch();
      setChannel(channel);
      await channel.addMembers([chatClient.user.id]);
      navigation.navigate('DMScreen', {channel: channel});
    } else if (isGroupValid(groupName) && !image) {
      const groupIcon =
        'https://st.depositphotos.com/2828735/4247/i/600/depositphotos_42470283-stock-photo-thailand-male-chicken-rooster-isolated.jpg';
      const channel = chatClient.channel(
        'team',
        uuidv4(),
        {
          name: groupName,
          image: groupIcon,
        },
        {},
      );
      await channel.watch();
      await channel.addMembers([chatClient.user.id]);
      setChannel(channel);
      navigation.navigate('DMScreen', {channel: channel});
    }
  };

  return (
    <View style={styles.groupContainer}>
      <Text style={styles.textGroupStyle}>What would you like your group to be called</Text>
      <TextInput
        onChangeText={onGroupNameChanged}
        placeholderTextColor="black"
        placeholder="Enter group name here..."
        style={styles.groupInput}
      />
      <View style={styles.btnParentSection}>
        <TouchableOpacity onPress={choosePhotoFromLibrary} style={styles.btnSection}>
          <Text style={styles.btnText}>{image ? 'Pic Loaded ✅' : 'Choose Photo From Library (optional)'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.createGroup} onPress={createGroup}>
        <Text style={styles.createGroupLabel}>CREATE GROUP</Text>
      </TouchableOpacity>
    </View>
  );
}
