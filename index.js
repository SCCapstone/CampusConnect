/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_CONSTANTS} from './env.js';

// Setup App Settings and call CometChat init() method.
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .build();
CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
  () => {
    console.warn('Initialization completed successfully');
    // You can now call warnin function.
  },
  error => {
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  },
);