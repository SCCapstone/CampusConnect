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
        <Text style={{fontSize:16, color: 'black'}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color: 'black'}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color: 'black'}}>Done</Text>
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
            backgroundColor: 'white',
            image: <Image source={require('./assets/onboarding-img1.png')} />,
            title: 'Campus Connect',
            subtitle: 'A New Way To Connect With The World',
          },
          {
            backgroundColor: 'white',
            image: <Image source={require('./assets/onboarding-img2.png')} />,
            title: 'Share Your Thoughts',
            subtitle: 'Share Your Thoughts With Fellow Students',
          },
          {
            backgroundColor: 'white',
            image: <Image source={require('./assets/onboarding-img3.png')} />,
            title: 'Become A Star',
            subtitle: "Be Who You Want To Be",
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