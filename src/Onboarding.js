import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

//Cited from https://github.com/itzpradip/react-native-firebase-social-app

import Onboarding from 'react-native-onboarding-swiper';
import { color } from 'react-native-reanimated';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color: 'white'}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color: 'white'}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color: 'white'}}>Done</Text>
    </TouchableOpacity>
);

export function OnboardingScreen({navigation}) {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("RegistrationScreen")}
        onDone={() => navigation.navigate("RegistrationScreen")}
        pages={[
          {
            backgroundColor: '#73000a',
            title: 'Campus Connect',
            subtitle: 'A New Way To Connect With USC Students',
          },
          {
            backgroundColor: '#73000a',
            title: 'Share Your Thoughts',
            subtitle: 'Share Your Thoughts With Fellow Students',
          },
          {
            backgroundColor: '#73000a',
            title: 'Follow the Rules',
            subtitle: "1.\n2.\n3.\n",
          },
        ]}
      />
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});