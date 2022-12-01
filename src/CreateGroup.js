import * as React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {CometChat} from '@cometchat-pro/react-native-chat';
import validator from 'validator';
import regstyles from './registrationStyles';

import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';

export function CreateGroup() {
  const [groupName, setGroupName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  /*const [image, setImage] = React.useState('');
  var url = "";*/

  const onGroupNameChanged = groupName => {
    setGroupName(() => groupName);
  };
  /*
  const choosePhotoFromLibrary = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      mediaType:'photo'
    }).then(image => {
      console.log(image);
      setImage(image.path)
    }).catch(error =>{});
  }
  
  const uploadPic = async () =>{
    const reference = storage().ref(auth().currentUser.uid);
    if (image) {
      await reference.putFile(image).catch(error => {
      FirebaseError(error.code);
    });
    url = await reference.getDownloadURL();
    }

  }
*/
  const isGroupValid = groupName => {
    if (validator.isEmpty(groupName)) {
      console.log("Error, invalid group name")
      return false;
    }
    return true;
  };

  const showMessage = (title, message) => {
    Alert.alert(title, message);
  };

  const createGroup = /*async*/ () => {
    if (isGroupValid(groupName)) {
      setIsLoading(true);
      //await uploadPic();
      const groupIcon =
        'https://upload.wikimedia.org/wikipedia/commons/9/94/South_Carolina_Gamecocks_logo.svg';
      const GUID = uuidv4();
      const groupType = CometChat.GROUP_TYPE.PUBLIC;
      const password = '';
      const group = new CometChat.Group(GUID, groupName, groupType, password);
      group.setIcon(groupIcon);
      CometChat.createGroup(group).then(
        group => {
          setIsLoading(false);
          showMessage('Info', `${groupName} was created successfully`);
        },
        error => {
          setIsLoading(false);
          console.log("Error, please try again later")
        },
      );
    }
  };

  return (
    <View style={regstyles.groupContainer}>
      <Text style={regstyles.textGroupStyle}>
        What would you like your group to be called... (pic loader not working yet)
      </Text>
      <TextInput
        onChangeText={onGroupNameChanged}
        placeholder="What would you like your group to be called..."
        style={regstyles.groupInput}
      />
      {/*<View style={regstyles.btnParentSection}>
        <TouchableOpacity style={regstyles.btnSection}  >
          <Text style={regstyles.btnText}>{image ? 'Pic Loaded ✅' : 'Choose Photo From Library (optional)'}</Text>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={regstyles.createGroup} onPress={createGroup}>
        <Text style={regstyles.createGroupLabel}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}