// useChatClient.js

import { useEffect, useState, useContext } from 'react';
import { StreamChat } from 'stream-chat';
import { chatApiKey} from '../chatConfig';
import AppContext from './AppContext';



import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import { compiledEmojis } from 'stream-chat-react-native';
import { set } from 'react-native-reanimated';


const chatClient = StreamChat.getInstance(chatApiKey);


export const useChatClient = () => {
  
  const [clientIsReady, setClientIsReady] = useState(false);
  const userData = useContext(AppContext);
  const {key,setKey} = useChatContext()
  

  const user = {
    id: auth().currentUser.uid,
    name: userData.name,
    image: userData.pfp
  }

  const getToken = async () => {
    var chatUserToken = ''
    await functions().httpsCallable('ext-auth-chat-getStreamUserToken')().then(token => {
      chatUserToken =  token.data
    }).catch(error => {
      console.log(error)
    })
    return chatUserToken;
  }




  useEffect(() => {

    //Generate token here
    const setupClient = async () => {
      try {
        const chatUserToken = await getToken();
        await chatClient.connectUser(user, chatUserToken).catch(error => {console.log(error)});
        setClientIsReady(true);

        // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
        // But in case you need the chat to load from offline storage first then you should render chat components
        // immediately after calling `connectUser()`.
        // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error occurred while connecting the user: ${error.message}`);
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    }
    else{
      setClientIsReady(true)
    }
  }, []);

  return {
    clientIsReady,
  };
};
