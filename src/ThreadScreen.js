import {Thread, Channel} from 'stream-chat-react-native'; // Or stream-chat-expo

import {useChatContext} from './ChatContext';

//This screen is for rendering a reply to a message inside of the chat
export function ThreadScreen(props) {
  const {channel, thread} = useChatContext();

  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
    </Channel>
  );
}
