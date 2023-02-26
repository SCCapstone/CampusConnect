import {View,Text, ActivityIndicator} from 'react-native'
import {
    Channel,
    MessageList,
    MessageInput,
    MessageContext,
  } from 'stream-chat-react-native'; // Or stream-chat-expo
import { useHeaderHeight } from '@react-navigation/elements';
import notifee, { EventType } from '@notifee/react-native';


import { useChatContext} from './ChatContext';
import {useNavigation} from '@react-navigation/native';
import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../chatConfig';
import { useEffect, useState } from 'react';
  
  
  export function DMScreen(props) {
    const {thread,setThread} = useChatContext();
    const navigation = useNavigation();   
    const headerHeight = useHeaderHeight();
    const chatClient = StreamChat.getInstance(chatApiKey);
    const [loading,setLoading] = useState(true)
    const {channelID} = props.route.params
    const [channel,setChannel] = useState(props.route.params.channel)


    useEffect (() => {
      if(!channel) {
        chatClient.queryChannels({id: { $eq: channelID }}).then((response) => {
        response.map(async (channelResponse) => {
          await channelResponse.watch();
          setChannel(channelResponse)
        
        })
      })}


    const clearBadge = async () => {

      await notifee.setBadgeCount(0);
    };
    clearBadge();

    },[channelID])

    useEffect(() => {
      /* Query the channel members*/
      if(channel) {
        if(channel.type === 'messaging'){

          channel.queryMembers({user_id: {$ne:chatClient.user.id}}).then((members) => {
            if (members.members.length > 0) {
              navigation.setOptions({
                headerTitle: 'Chatting with: ' + members.members[0].user.name,
              });
              setLoading(false)
            }
          });
        }
        else if (channel.type === 'team') {
          navigation.setOptions({
            headerTitle: channel.data.name,
          });
          setLoading(false)
        }
      }
    },[channel])
          

    if (!channel) {
      return null
    }
    if (loading) {
      return <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator size={'large'}></ActivityIndicator></View>
    }
  
    //These props allow us to display the user's name with their
    return (
        <Channel 
          channel={channel}
          keyboardVerticalOffset={headerHeight}
          deletedMessagesVisibilityType='never'
          thread={thread}
        >
          <MessageList
                onThreadSelect={(message) => {
                if (channel?.id) {
                  setThread(message);
                  navigation.navigate('ThreadScreen');
                }
              }} />
          <MessageInput></MessageInput>
        </Channel>
    );
  };